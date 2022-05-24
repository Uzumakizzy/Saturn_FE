import React from 'react';
import { Layout, Dropdown, Menu, Button, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/ResgisterPage';
import PostPage from './components/PostPage';

const { Header, Content } = Layout;
const TITLE = "Saturn";

class App extends React.Component {

    state = {
        authed: false,
        items: [],
        userProfile: {},
        currentPage: "Home",
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
    };

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
            return <AccountPage profile={this.state.userProfile} handleProfileChange={this.showAccountPage}/>;
        }
        return <HomePage items={this.state.items} />;
    };

    showAccountPage = async () => {
        const resp = await getUserProfile();
        this.setState({
            currentPage: "Account",
            userProfile: resp,
        });
    };

    getUserMenu = () => {
        if (!this.state.authed) {
            return (
                <Menu
                    items={[
                        {
                            label: (
                                <LoginPage handleLoginSuccess={this.handleLoginSuccess} />
                            ),
                            key: '0',
                        },
                        {
                            label: (
                                <RegisterPage />
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
                            <a onClick={this.showAccountPage}>
                                Account
                            </a>
                        ),
                        key: '0',
                    },
                    {
                        label: (
                            <PostPage />
                        ),
                        key: '1',
                    },
                    {
                        type: 'divider',
                    },
                    {
                        label: (
                            <a onClick={this.handleLogOut}>
                                Log Out
                            </a>
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
                        {/* <Col className='searchArea'>
                            <div style={{ display: "inline-block", width: "100%" }}>
                                <Input placeholder="keywords..." allowClear />
                            </div>
                            <div style={{ display: "inline-block", padding: "0 0 0 10px" }}>
                                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                            </div>
                        </Col> */}
                        <Col>
                            <Dropdown overlay={this.getUserMenu} placement="bottomRight">
                                <Button icon={<UserOutlined />} shape="circle" >
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Content
                        style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
                    >
                        {this.renderContent()}
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default App;