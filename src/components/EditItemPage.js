import React from "react";
import { Form, Input, Button, message } from "antd";
import { editItem } from "../utils";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class EditItemPage extends React.Component {
    state = {
        loading: false,
    };

    formRef = React.createRef();

    onFinish = () => {
        console.log("finish");
    }

    handleSubmit = async () => {
        const { oldItem, onEditSuccess } = this.props;

        const formInstance = this.formRef.current;
        
        try {
            await formInstance.validateFields();
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        let data = formInstance.getFieldsValue(true);
        data.name = data.name === undefined ? oldItem.name : data.name;
        data.price = data.price === undefined ? oldItem.price : data.price;
        data.description = data.description === undefined ? oldItem.description : data.description;
        console.log(data);
        try {
            await editItem(oldItem.id, data);
            message.success("Edit successfully");
            onEditSuccess();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const { oldItem } = this.props;
        return (
            <Form
                {...layout}
                name="nest-messages"
                onFinish={this.onFinish}
                style={{ maxWidth: 1000, margin: "auto" }}
                ref={this.formRef}
            >
                <Form.Item name="name" label="Name" >
                    <Input placeholder={oldItem.name} />
                </Form.Item>
                <Form.Item name="price" label="Price" >
                    <Input prefix="$" placeholder={oldItem.price} />
                </Form.Item>
                <Form.Item name="description" label="Description" >
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder={oldItem.description} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" loading={this.state.loading} onClick={this.handleSubmit} shape='round' >
                        Update
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

export default EditItemPage;
