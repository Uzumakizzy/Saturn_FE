import React from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { UserOutlined, HeartOutlined, UnlockOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

const tags = ['Profile', 'Favorites', 'Security'];

const tagItems = [UserOutlined, HeartOutlined, UnlockOutlined].map((icon, index) => {
    return {
        key: index,
        icon: React.createElement(icon),
        label: `${tags[index]}`,
    };
});

class AccountPage extends React.Component {

    state = {
        tagName: "Profile",
        userName: "Uzumaki",
    };

    onTagSelect = ({ key }) => {
        this.setState({
            tagName: tags[key],
        })
    };

    render = () => (
        <>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={['0']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={tagItems}
                        onSelect={this.onTagSelect}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>
                            Welcome, {this.state.userName}!
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 700,
                            minWidth: 700,
                        }}
                    >
                        {this.state.tagName}
                    </Content>
                </Layout>
            </Layout>
        </>
    );

}

export default AccountPage;