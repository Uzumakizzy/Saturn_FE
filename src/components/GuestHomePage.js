import React from "react";
import { Tabs,Row,Col } from "antd";
import Filter from "./Filter";
import UploadItem from "./UploadItem";
 
const { TabPane } = Tabs;
 
class GuestHomePage extends React.Component {
  render() {
    // return (
    //   <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
    //     <TabPane tab="My Stays" key="1">
    //       <div>My Stays Content</div>
    //     </TabPane>
    //     <TabPane tab="Upload Stay" key="2">
    //       <div>Upload Stays</div>
    //     </TabPane>
    //   </Tabs>
    // );

    return (
        <Row className='main'>
            <Col span={8} className="left-side">
                {/* This place is for filter and catagory */}
              <Filter/>
            </Col>
            <Col span={16} className="right-side">
            <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="All Goods" key="1">
          <div>There are All Goods</div>
        </TabPane>
        {/* <TabPane tab="Upload My Goods" key="2">
          <UploadItem/>
        </TabPane> */}
      </Tabs>
            </Col>
        </Row>
    );

  }
}
 
export default GuestHomePage;
