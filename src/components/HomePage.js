import React from "react";
import {
    message, Form, Input,
    InputNumber, Button, List,
    Card, Carousel, Image, Popover
} from "antd";
import Text from "antd/lib/typography/Text";
import { LeftCircleFilled, RightCircleFilled, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { addFavorite, askItem, removeFav } from "../utils";
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

    render = () => {
        const { items, favs, favOnChange, authed } = this.props;
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
                                actions={[<ProductDetails item={item} />, <AskItemButton id={item.id} authed={authed} />]}
                                extra={<FavButton id={item.id} favOnChange={favOnChange} isFav={this.isFav(favs, item.id)} authed={authed} />}
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
        const { id } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await askItem(id);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render = () => {
        const { authed } = this.props;
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
        )
    };
}