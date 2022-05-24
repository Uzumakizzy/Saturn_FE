import React from 'react';
import { Modal } from "antd";
import UploadItem from './UploadItem';

class PostPage extends React.Component {

    state = {
        modalVisible: false,
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    handleUploadItem = () => {
        this.setState({
            modalVisible: true,
        });
    };

    render = () => {
        return (
            <>
                <a onClick={this.handleUploadItem}>
                    Post
                </a>
                <Modal 
                    title="Item Details"
                    destroyOnClose={true}
                    visible={this.state.modalVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <UploadItem />
                </Modal>
            </>
        );
    };
}

export default PostPage;