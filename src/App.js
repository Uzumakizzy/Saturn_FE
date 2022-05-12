import React from 'react';
import { Layout, Dropdown, Menu, Button, Input, Row, Col } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { searchItems } from './utils';
import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/ResgisterPage';

const { Header, Content } = Layout;
const TITLE = "Saturn";

class App extends React.Component {

    state = {
        authed: false,
        items: [],
        currentPage: "Home"
    };

    componentDidMount = () => {
        document.title = TITLE;
        // const authToken = localStorage.getItem("authToken");
        // searchItems()
        // .then((data) => {
        //     this.setState({
        //         authed: authToken !== null,
        //         items: data
        //     })
        // }).catch((err) => {
        //     message.error(err.message);
        // });
    }

    handleLoginSuccess = (token) => {
        localStorage.setItem("authToken", token);
        this.setState({
            authed: true,
        });
    };

    handleLogOut = () => {
        localStorage.removeItem("authToken");
        this.setState({
            authed: false,
            currentPage: "Home"
        });
    };

    renderContent = () => {
        if (this.state.currentPage === "Account") {
            return <AccountPage />;
        }
        return <HomePage items={this.state.items} />;
    };

    showAccountPage = () => {
        this.setState({
            currentPage: "Account"
        });
    };

    getUserMenu = () => {
        if (!this.state.authed) {
            return (
                <Menu
                    items={[
                        {
                            label: (
                                // <Button type='text'>
                                //     Login
                                // </Button>
                                <LoginPage handleLoginSuccess={this.handleLoginSuccess}/>
                            ),
                            key: '0',
                        },
                        {
                            label: (
                                // <Button type='text'>
                                //     Register
                                // </Button>
                                <RegisterPage/>
                            ),
                            key: '1',
                        },
                    ]}
                />);
        }
        return (
            <Menu
                items={[
                    {
                        label: (
                            <Button type='text' onClick={this.showAccountPage}>
                                Account
                            </Button>
                        ),
                        key: '0',
                    },
                    {
                        label: (
                            // add post page here
                            <Button type='text'>
                                Post Products
                            </Button>
                        ),
                        key: '1',
                    },
                    {
                        type: 'divider',
                    },
                    {
                        label: (
                            <Button type='text' danger onClick={this.handleLogOut}>
                                Log Out
                            </Button>
                        ),
                        key: '2',
                    },
                ]}
            />);
    };

    render = () => (
        <>
            <Layout style={{ height: "100vh" }}>
                <Header>
                    <Row justify='space-between'>
                        <Col>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
                                Saturn
                            </div>
                        </Col>
                        <Col className='searchArea'>
                            <div style={{ display: "inline-block", width: "100%" }}>
                                <Input placeholder="keywords..." allowClear />
                            </div>
                            <div style={{ display: "inline-block", padding: "0 0 0 10px" }}>
                                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                            </div>
                        </Col>
                        <Col>
                            <Dropdown overlay={this.getUserMenu} >
                                <Button icon={<UserOutlined />} shape="circle" >
                                </Button>
                            </Dropdown> :
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Content
                        style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
                    >
                        {/* {this.renderContent()} */}
                    </Content>
                </Layout>
            </Layout>
        </>
    )

}

export default App;
