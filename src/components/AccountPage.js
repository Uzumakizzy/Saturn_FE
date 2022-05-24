import React from 'react';
import { Layout, Menu, Breadcrumb, Button, List, Card, Carousel, Image, message, Form, Input, Popover } from 'antd';
import { UserOutlined, HeartOutlined, ShoppingOutlined, LeftCircleFilled, RightCircleFilled, LaptopOutlined, StarFilled } from '@ant-design/icons';
import Text from "antd/lib/typography/Text";
import { getMyItems, deleteItem, markSold, updateUser, getFavorite, removeFav } from '../utils';

const { Content, Sider } = Layout;

const tags = ['Profile', 'Favorites', 'My Listed Products', 'Products being asked'];

const tagItems = [UserOutlined, HeartOutlined, LaptopOutlined, ShoppingOutlined].map((icon, index) => {
    return {
        key: index,
        icon: React.createElement(icon),
        label: `${tags[index]}`,
    };
});

class AccountPage extends React.Component {

    state = {
        tagName: "Profile",
    };

    onTagSelect = ({ key }) => {
        this.setState({
            tagName: tags[key],
        })
    };

    renderContent = (profile, handleProfileChange) => {
        if (this.state.tagName === 'My Listed Products') {
            return (<MyProducts />);
        } else if (this.state.tagName === 'Profile') {
            return (<ProfilePage profile={profile} handleProfileChange={handleProfileChange} />);
        } else if (this.state.tagName === 'Products being asked') {
            return (<ProductsAsked />);
        } else {
            return (<FavProducts />);
        }
    }

    render = () => {

        const { profile, handleProfileChange } = this.props;

        return (
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
                                Welcome, {profile.username}.
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
                            {this.renderContent(profile, handleProfileChange)}
                        </Content>
                    </Layout>
                </Layout>
            </>
        );
    }
}

export default AccountPage;

class MyProducts extends React.Component {
    state = {
        loading: false,
        data: [],
    };

    componentDidMount = () => {
        this.loadData();
    };

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getMyItems();
            this.setState({
                data: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        return (
            <>
                <List
                    loading={this.state.loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 3,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={this.state.data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id}
                                title={
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                            {item.name}
                                        </Text>
                                    </div>
                                }
                                actions={[<ProductDetails item={item} />]}
                                extra={<RemoveProductButton item={item} onRemoveSuccess={this.loadData} />}
                            >
                                {
                                    <Carousel
                                        dots={false}
                                        arrows={true}
                                        prevArrow={<LeftCircleFilled />}
                                        nextArrow={<RightCircleFilled />}
                                    >
                                        {item.images.map((image, index) => (
                                            <div key={index}>
                                                <Image src={image.url} width="100%" height="200px" />
                                            </div>
                                        ))}
                                    </Carousel>
                                }
                            </Card>
                        </List.Item>
                    )}
                />
            </>
        );
    };

}

class ProductsAsked extends React.Component {
    state = {
        loading: false,
        data: [],
    };

    componentDidMount = () => {
        this.loadData();
    };

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getMyItems('ask');
            this.setState({
                data: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        return (
            <>
                <List
                    loading={this.state.loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 3,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={this.state.data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id}
                                title={
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                            {item.name}
                                        </Text>
                                    </div>
                                }
                                actions={[<ProductAskedDetails item={item} />]}
                                extra={<MarkSoldButton item={item} onSoldSuccess={this.loadData} />}
                            >
                                {
                                    <Carousel
                                        dots={false}
                                        arrows={true}
                                        prevArrow={<LeftCircleFilled />}
                                        nextArrow={<RightCircleFilled />}
                                    >
                                        {item.images.map((image, index) => (
                                            <div key={index}>
                                                <Image src={image.url} width="100%" height="200px" />
                                            </div>
                                        ))}
                                    </Carousel>
                                }
                            </Card>
                        </List.Item>
                    )}
                />
            </>
        );
    };

}

class ProductDetails extends React.Component {

    render = () => {
        const { item } = this.props;
        const data = [
            {
                title: 'Price: (Dollar)',
                value: item.price,
            },
            {
                title: 'Description:',
                value: item.description,
            },
            {
                title: 'Status:',
                value: item.status,
            },
        ]
        return (
            <>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={item.value}
                            />
                        </List.Item>
                    )}
                />
            </>
        );
    }

}

class ProductAskedDetails extends React.Component {
    render = () => {
        const { item } = this.props;
        let ask_person = ''
        for (let i = 0; i < item.asks.length; i++) {
            if (i > 0) {
                ask_person = ask_person.concat(', ')
            }
            ask_person = ask_person.concat(item.asks[i].ask_by);
        }
        const data = [
            {
                title: 'Price: (Dollar)',
                value: item.price,
            },
            {
                title: 'Description:',
                value: item.description,
            },
            {
                title: 'Status:',
                value: item.status,
            },
            {
                title: "Asked by:",
                value: ask_person,
            }
        ]
        return (
            <>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={item.value}
                            />
                        </List.Item>
                    )}
                />
            </>
        );
    }
}

class RemoveProductButton extends React.Component {
    state = {
        loading: false,
    };

    handleRemoveProduct = async () => {
        const { item, onRemoveSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await deleteItem(item.id);
            onRemoveSuccess();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        return (
            <Button
                loading={this.state.loading}
                onClick={this.handleRemoveProduct}
                danger={true}
                shape='round'
                type='primary'
            >
                DELETE
            </Button>
        )
    };
}

class FavProducts extends React.Component {
    state = {
        loading: false,
        data: [],
    };

    componentDidMount = () => {
        this.loadData();
    };

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getFavorite();
            this.setState({
                data: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        return (
            <>
                <List
                    loading={this.state.loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 3,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={this.state.data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id}
                                title={
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                            {item.name}
                                        </Text>
                                    </div>
                                }
                                actions={[<ProductDetails item={item} />]}
                                extra={<DislikeButton item={item} onDislikeSuccess={this.loadData} />}
                            >
                                {
                                    <Carousel
                                        dots={false}
                                        arrows={true}
                                        prevArrow={<LeftCircleFilled />}
                                        nextArrow={<RightCircleFilled />}
                                    >
                                        {item.images.map((image, index) => (
                                            <div key={index}>
                                                <Image src={image.url} width="100%" height="200px" />
                                            </div>
                                        ))}
                                    </Carousel>
                                }
                            </Card>
                        </List.Item>
                    )}
                />
            </>
        );
    };

}

class DislikeButton extends React.Component {
    state = {
        loading: false,
    };

    handleDislike = async () => {
        const { item, onDislikeSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await removeFav(item.id);
            onDislikeSuccess();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        return (
            <Popover content={"Dislike"} trigger="hover">
                <Button
                    icon={<StarFilled />}
                    loading={this.state.loading}
                    onClick={this.handleDislike}
                    shape='circle'
                    danger={true}
                    type='primary'
                />
            </Popover>
        )
    };
}

class MarkSoldButton extends React.Component {
    state = {
        loading: false,
    };

    handleSoldProduct = async () => {
        const { item, onSoldSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await markSold(item.id);
            onSoldSuccess();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        return (
            <Button
                loading={this.state.loading}
                onClick={this.handleSoldProduct}
                shape='round'
                type='primary'
            >
                Sell
            </Button>
        )
    };
}

class ProfilePage extends React.Component {

    state = {
        loading: false,
    };

    onFinish = async (values) => {
        const formData = new FormData();

        formData.append('email', values.email);
        formData.append('phone_number', values.phone);

        this.setState({
            loading: true,
        });

        try {
            await updateUser(formData);
            message.success('Update user profile successfully.');
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
        this.props.handleProfileChange();
    }

    render = () => {
        const { profile } = this.props;
        return (
            <>
                <Form
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                    style={{ marginTop: '40px' }}
                    onFinish={this.onFinish}
                >
                    <Form.Item label='Username:'>
                        {profile.username}
                    </Form.Item>
                    <Form.Item label='Email:' name='email'>
                        <Input placeholder={profile.email} />
                    </Form.Item>
                    <Form.Item label='Phone:' name='phone'>
                        <Input placeholder={profile.phoneNumber} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2, span: 5 }} style={{ marginTop: '50px' }}>
                        <Button type='primary' htmlType='submit' loading={this.state.loading}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}