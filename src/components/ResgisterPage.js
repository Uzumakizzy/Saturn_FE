import React from "react";
import { Form, Button, Input, Space, message, Modal, InputNumber } from "antd";
import { register } from "../utils";

class RegisterPage extends React.Component {
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

    handleRegister = async () => {
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
            await register(formInstance.getFieldsValue(true));
            message.success("Register Successfully");
            this.setState({
                isModalVisible: false,
            });
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
                    Register
                </a>
                <Modal
                    title="Register"
                    visible={this.state.isModalVisible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                        autoComplete="off"
                        ref={this.formRef}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username.",
                                },
                            ]}
                        >
                            <Input
                                disabled={this.state.loading}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password.",
                                },
                            ]}
                        >
                            <Input.Password
                                disabled={this.state.loading}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    pattern: '^([-]?[1-9][0-9]*|0)$',
                                    Length: 11,
                                    message: "Please input only number for phone!",
                                },
                                {
                                    required: false,
                                    message: "Please input your Phone number!",
                                },
                            ]}
                        >
                            <Input
                                disabled={this.state.loading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
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
                            <Input
                                disabled={this.state.loading}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button
                                type="primary"
                                onClick={this.handleRegister}
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

export default RegisterPage;
