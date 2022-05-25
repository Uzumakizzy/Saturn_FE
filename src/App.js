import React from 'react';
import { Layout, Dropdown, Menu, Button, Row, Col, Popover, message } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/ResgisterPage';
import PostPage from './components/PostPage';
import { getUserProfile, getFavorite, searchItems } from './utils';

const { Header, Content } = Layout;
const TITLE = "Saturn";

class App extends React.Component {

    state = {
        authed: false,
        items: [],
        favItems: [],
        userProfile: {},
        currentPage: "Home",
    };

    componentDidMount = () => {
        document.title = TITLE;
        searchItems()
            .then(data => {
                this.setState({
                    items: data
                });
            }).catch(err => {
                message.error(err.message);
            });
    }

    searchItems = async (query = {}) => {
        const resp = await searchItems(query);
        this.setState({
            items: resp,
        });
    }

    handleLoginSuccess = async (token) => {
        localStorage.setItem("authToken", token);
        const profile = await getUserProfile();
        const favs = await getFavorite();
        this.setState({
            userProfile: profile,
            favItems: favs,
            authed: true,
        });
    };

    handleLogOut = () => {
        localStorage.removeItem("authToken");
        this.setState({
            authed: false,
            currentPage: "Home",
            favItems: [],
            userProfile: {},
        });
    };

    renderContent = () => {
        if (this.state.currentPage === "Account") {
            return <AccountPage profile={this.state.userProfile} handleProfileChange={this.fetchProfile} />;
        }
        return <HomePage items={this.state.items} favs={this.state.favItems} favOnChange={this.favOnChange} search={this.searchItems} authed={this.state.authed} />;
    };

    showAccountPage = () => {
        this.setState({
            currentPage: "Account",
        });
    };

    returnToHome = () => {
        getFavorite().
        then(data => {
            this.setState({
                favItems: data,
                currentPage: "Home",
            });
        }).catch(err => {
            message.error(err.message);
        });
    }

    fetchProfile = async () => {
        const resp = await getUserProfile();
        this.setState({
            userProfile: resp,
        });
    }

    favOnChange = () => {
        getFavorite().
            then(data => {
                this.setState({
                    favItems: data,
                });
            }).catch(err => {
                message.error(err.message);
            });
    }

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
                            <Popover content={"Home"} trigger="hover">
                                <Button
                                    icon={<HomeOutlined />}
                                    shape="circle"
                                    onClick={this.returnToHome}
                                >
                                </Button>
                            </Popover>
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