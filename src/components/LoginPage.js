import React from "react";
import { Form, Button, Input, Space, message, Modal } from "antd";
import { login } from "../utils";

class LoginPage extends React.Component {
    formRef = React.createRef();
    state = {
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
                <a onClick={this.showModal}>
                    Login
                </a>
                <Modal
                    title="Login"
                    visible={this.state.isModalVisible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        autoComplete="off"
                    >
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
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button
                                type="primary"
                                onClick={this.handleLogin}
                                disabled={this.state.loading}
                                shape="round"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default LoginPage;
