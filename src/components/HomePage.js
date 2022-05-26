import React from "react";
import {
    message, Form, Input,
    InputNumber, Button, List,
    Card, Carousel, Image
} from "antd";
import Text from "antd/lib/typography/Text";
import { LeftCircleFilled, RightCircleFilled, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { addFavorite, askItem, removeFav, cancelAsk } from "../utils";
import ProductDetails from "./ProductDetailsCard";

class HomePage extends React.Component {

    state = {
        loading: false,
    }

    onFinish = (query = {}) => {
        this.setState({
            loading: true,
        });
        try {
            this.props.search(query)
        } catch (err) {
            message.error(err.message);
        } finally {
            this.setState({
                loading: false,
            })
        }
    }

    isFav = (favs, id) => {
        return favs.find(fav => fav.id === id);
    }

    getAskId = (item, username) => {
        console.log('username: ', typeof(username), username);
        for (let i = 0; i < item.asks.length; i++) {
            if (item.asks[i].ask_by === username) {
                return parseInt(item.asks[i].id);
            }
        }
        return -1;
    }

    render = () => {
        const { items, favs, favOnChange, authed, askedOnChange, username } = this.props;
        return (
            <>
                <Form
                    onFinish={this.onFinish}
                    autoComplete="off"
                    layout={"inline"}
                    name="Filter"
                >
                    <Form.Item
                        name="itemName"
                        label="Name"
                        rules={[
                            {
                                required: false,
                                message: "Please input your item name.",
                            },
                        ]}
                    >
                        <Input disabled={this.state.loading} />
                    </Form.Item>
                    <Form.Item
                        name="itemDesc"
                        label="Description"
                        rules={[
                            {
                                required: false,
                                message: "Please input your item description.",
                            },
                        ]}
                    >
                        <Input disabled={this.state.loading} />
                    </Form.Item>
                    <Form.Item
                        name="priceMin"
                        label="Minimum Price"
                        rules={[
                            {
                                required: false,
                                message: "Please input your Minimum Price.",
                            },
                        ]}
                    >
                        <InputNumber prefix="$" style={{ width: '100%' }} disabled={this.state.loading} />
                    </Form.Item>
                    <Form.Item
                        name="priceMax"
                        label="Maximum Price"
                        rules={[
                            {
                                required: false,
                                message: "Please input your Maximum Price!",
                            },
                        ]}
                    >
                        <InputNumber prefix="$" style={{ width: '100%' }} disabled={this.state.loading} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.loading}
                            shape="round"
                        >
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
                <List
                    style={{ marginTop: 20 }}
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
                    dataSource={items}
                    renderItem={item =>
                    (
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
                                actions={[
                                    <ProductDetails item={item} />,
                                    <AskItemButton
                                        itemId={item.id}
                                        authed={authed}
                                        askId={this.getAskId(item, username)}
                                        askedOnChange={askedOnChange}
                                    />
                                ]}
                                extra={
                                    <FavButton
                                        id={item.id}
                                        favOnChange={favOnChange}
                                        isFav={this.isFav(favs, item.id)}
                                        authed={authed}
                                    />
                                }
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
    }
}

export default HomePage;

class FavButton extends React.Component {
    state = {
        loading: false,
    };

    handleFav = async () => {
        const { id, favOnChange, isFav } = this.props;
        this.setState({
            loading: true,
        });

        try {
            if (isFav) {
                await removeFav(id);
            } else {
                await addFavorite(id);
            }
            favOnChange();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        const { isFav, authed } = this.props;
        return (
            <Button
                icon={isFav ? <HeartFilled /> : <HeartOutlined />}
                loading={this.state.loading}
                onClick={this.handleFav}
                shape='circle'
                style={{ color: "red" }}
                disabled={!authed}
            />
        )
    };
}

class AskItemButton extends React.Component {
    state = {
        loading: false,
    };

    handleAsk = async () => {
        const { itemId, askedOnChange, askId } = this.props;
        this.setState({
            loading: true,
        });

        try {
            if (askId > 0) {
                await cancelAsk(askId);
            } else {
                await askItem(itemId);
            }
            askedOnChange();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        const { authed, askId } = this.props;
        if (askId > 0) {
            return (
                <Button
                    loading={this.state.loading}
                    onClick={this.handleAsk}
                    shape='round'
                    type='primary'
                    danger={true}
                >
                    Cancel ask
                </Button>
            );
        } else {
            return (
                <Button
                    loading={this.state.loading}
                    onClick={this.handleAsk}
                    shape='round'
                    type='primary'
                    disabled={!authed}
                >
                    Ask this product
                </Button>
            );
        }
    };
}