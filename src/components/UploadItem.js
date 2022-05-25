import React from "react";
import { Form, Input, InputNumber, Button, message, Divider, Select, } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { uploadItem } from "../utils";
const { Option } = Select;

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option value="86">+86</Option>
            <Option value="1">+1</Option>
        </Select>
    </Form.Item>
);

class UploadItem extends React.Component {
    state = {
        loading: false,
    };

    fileInputRef = React.createRef();

    handleSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.fileInputRef.current;

        if (files.length > 5) {
            message.error("You can at most upload 5 pictures.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("itemImages", files[i]);
        }

        formData.append("itemName", values.itemName);
        //formData.append("category", values.category);
        formData.append("itemPrice", values.itemPrice);
        //formData.append("condition", values.condition);
        //formData.append("brand", values.brand);
        //formData.append("state", values.state);
        //formData.append("city", values.city);
        formData.append("itemDesc", values.itemDesc);
        //formData.append("name", values.name);
        //formData.append("phone", values.phone);
        //formData.append("email", values.email);

        this.setState({
            loading: true,
        });
        try {
            await uploadItem(formData);
            message.success("upload successfully");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        return (
            <Form
                {...layout}
                name="nest-messages"
                onFinish={this.handleSubmit}
                style={{ maxWidth: 1000, margin: "auto" }}
            >
                {/* <p style={{ fontSize: 25 }}>
                    <center>
                        Details
                    </center>
                    <Divider />
                </p> */}
                <Form.Item name="itemName" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                {/* <Form.Item name="category" label="Category"
                //rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select a option to choose a category"

                        allowClear
                    >
                        <Option value="food">food</Option>
                        <Option value="electronics">electronics</Option>
                        <Option value="books">books</Option>
                    </Select>
                </Form.Item> */}
                <Form.Item name="itemPrice" label="Price" rules={[{ required: true }]}>
                    <Input prefix="$" />
                </Form.Item>
                {/* <Form.Item name="condition" label="Condition" >
                    <Input />
                </Form.Item>
                <Form.Item name="brand" label="Brand" >
                    <Input />
                </Form.Item>
                <Form.Item name="state" label="State"
                //rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="city" label="City"
                //rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item
                    name="itemDesc"
                    label="Description"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>

                <Form.Item name="picture" label="Picture"
                //rules={[{ required: true }]}
                >
                    <input
                        icon={<UploadOutlined />}
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={this.fileInputRef}
                        multiple={true}
                    />
                </Form.Item>

                {/* <p style={{ fontSize: 25 }}>
                    <center>
                        Contact Information
                    </center>
                    <Divider />
                </p>


                <Form.Item name="name" label="Name"
                //rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                //rules={[{ required: true, message: 'Please input your phone number' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail',
                        },
                        {
                            //required: true,
                            message: 'Please input your E-mail',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Post
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

export default UploadItem;
