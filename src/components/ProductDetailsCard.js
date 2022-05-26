import React from 'react';
import { List } from 'antd';

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

export default ProductDetails;