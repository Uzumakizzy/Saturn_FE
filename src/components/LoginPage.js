import React from "react";
import { Form, Button, Input, Space, Checkbox, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { login, register } from "../utils";

class LoginPage extends React.Component {
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

  handleLogin = async () => {
    console.log("login");
    // const formInstance = this.formRef.current;
    // try {
    //   await formInstance.validateFields();
    // } catch (error) {
    //   return;
    // }
    // this.setState({
    //   loading: true,
    // });
    // try {
    //   const { asHost } = this.state;
    //   const resp = await login(formInstance.getFieldsValue(true), asHost);
    //   this.props.handleLoginSuccess(resp.token, asHost);
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
        <Button type="primary" onClick={this.showModal}>
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
