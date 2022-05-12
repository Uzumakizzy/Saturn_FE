import React from "react";
import { Form, Button, Input, Space, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

class LoginPage extends React.Component {
  formRef = React.createRef();
  state = {
    // asHost: false,
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

  handleLogin = async () => {
    console.log("login");
    const formInstance = this.formRef.current;
    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }
    this.setState({
      loading: true,
    });
    try {
    //   const { asHost } = this.state;
      const resp = await login(formInstance.getFieldsValue(true));
      message.success(`Welcome back, ${formInstance.getFieldValue("username")}`);
      this.props.handleLoginSuccess(resp.token);
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
      <>
        <Button type="text" onClick={this.showModal}>
          Login
        </Button>
        <Modal
          title="Login"
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item
              name="username"
              label="Username"
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
                // placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                disabled={this.state.loading}
                // placeholder="Password"
              />
            </Form.Item>
          </Form>
          <Space>
            <Button
              onClick={this.handleLogin}
              disabled={this.state.loading}
              shape="round"
              type="primary"
            >
              Log in
            </Button>
          </Space>
        </Modal>
      </>
    );
  }
}

export default LoginPage;
