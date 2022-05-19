import React from "react";
import { Form, Button, Input, Space, message, Modal, InputNumber } from "antd";
import { searchItems } from "../utils";

class Filter extends React.Component {
  formRef = React.createRef();
  state = {
    loading: false,
    isModalVisible: false,
  };

  onFinish = () => {
    console.log("finish form");
  };


  handleFilter = async () => {
    console.log("filter");
    const formInstance = this.formRef.current;
    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }
    let priceMax = formInstance.getFieldValue("priceMax");
    let priceMin = formInstance.getFieldValue("priceMin");
    if (priceMin > priceMax) {
        message.error("Min price cannot greater than Max price");
        return;
    }

    // this.setState({
    //   loading: true,
    // });
    console.log(formInstance.getFieldsValue(true));
    // try {
    //   const resp = await searchItems(formInstance.getFieldsValue(true));
    // //   this.props.handleLoginSuccess(resp.token);
    // } catch (error) {
    //   message.error(error.message);
    // } finally {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  };

  render() {
    return (
      <>
        <h1>Filter</h1>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          layout={"vertical"}
          style={{ height: "100vh", width: "80%" }}
          name="Filter"
        >
          <Form.Item
            name="itemName"
            label="Name"
            rules={[
              {
                required: false,
                message: "Please input your Item Name!",
              },
            ]}
          >
            <Input disabled={this.state.loading} />
          </Form.Item>
          <Form.Item
            name="itemDesc"
            label="Description"
            rules={[
              {
                required: false,
                message: "Please input your Item Description!",
              },
            ]}
          >
            <Input disabled={this.state.loading} />
          </Form.Item>
          <Form.Item
            name="priceMin"
            label="Minimum Price"
            rules={[
              {
                required: false,
                message: "Please input your Minimum Price!",
              },
            ]}
          >
            <InputNumber prefix="$" style={{ width: '100%' }} disabled={this.state.loading} />
          </Form.Item>
          <Form.Item
            name="priceMax"
            label="Maximum Price"
            rules={[
              {
                required: false,
                message: "Please input your Maximum Price!",
              },
            ]}
          >
            <InputNumber prefix="$" style={{ width: '100%' }} disabled={this.state.loading} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button
              type="primary"
              onClick={this.handleFilter}
              disabled={this.state.loading}
              shape="round"
            >
              Apply
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Filter;
