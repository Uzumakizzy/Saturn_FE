import React from "react";
import { Form, Button, Input, Space, Checkbox, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { login, register } from "../utils";

class RegisterPage extends React.Component {
  formRef = React.createRef();
  state = {
    asHost: false,
    loading: false,
    isModalVisible: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  handleRegister = async () => {
    console.log("register");
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Register
        </Button>
        <Modal
          title="Register"
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                disabled={this.state.loading}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                disabled={this.state.loading}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: false,
                  message: "Please input your Phone number!",
                },
              ]}
            >
              <Input disabled={this.state.loading} placeholder="Phone" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: false,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input disabled={this.state.loading} placeholder="Email" />
            </Form.Item>
            
          </Form>
          <Space>
            <Button
              onClick={this.handleRegister}
              disabled={this.state.loading}
              shape="round"
              type="primary"
            >
              Register
            </Button>
          </Space>
        </Modal>
      </>
    );
  }
}

export default RegisterPage;
