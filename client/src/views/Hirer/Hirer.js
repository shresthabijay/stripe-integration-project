import React, { useState } from "react";
import { Row, Col, Button, Modal, Form, Input, InputNumber } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { JobCardHirer } from "../../components/JobCard/JobCard";

// svgs
import { ReactComponent as ProjectIcon } from "../../assets/projectIcon.svg";
import { ReactComponent as EscrowIcon } from "../../assets/escrow.svg";
import { ReactComponent as WithdrawIcon } from "../../assets/withdraw.svg";

// stylesheets
import "./hirer.scss";

const loremIpsum =
    "Exercitation quis nulla aute aliqua adipisicing id commodo ea commodo ipsum ut fugiat. Duis ad sunt dolore culpa. Voluptate ut occaecat amet ad. Non et non elit irure. Quis id ullamco non officia cillum. Mollit esse consequat adipisicing est aute nostrud culpa aute sit sunt duis. Mollit veniam adipisicing amet do cupidatat dolor ea et nisi sit aliqua.";

const StatBox = ({ title, description, icon }) => {
    return (
        <div className="stat-box">
            <div className="stat-icon">{icon}</div>
            <div className="details">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
        </div>
    );
};

const AddJobModal = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try{
            await form.validateFields();
            onCancel();
        }
        catch(err){}
    }

    return (
        <Modal visible={visible} title="Add job" onOk={handleSubmit} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is a required field" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description is a required field" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: "Price is a required field" }, {
                    type: 'number',
                    message: 'Price should be a number'
                }]}>
                    <InputNumber style={{ width: '100%' }} type="number"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const HirerDashboard = () => {
    const [showModal, setShowModal ] = useState(false)

    return (
        <div className="hirer">
            <AddJobModal visible={showModal} onCancel={() => setShowModal(false)}/>
            <Row>
                <Col span={18} className="main-dashboard">
                    <Row className="flex jcsb">
                        <Col className="flex ci">
                            <div className="avatar">
                                <img src="https://semantic-ui.com/images/avatar/large/elliot.jpg" alt="avatar"></img>
                            </div>
                            <div className="hgap"></div>
                            <div className="sub-title color-secondary dark">Hi! Bijay Shrestha.</div>
                        </Col>
                        <Col className="flex ci">
                            <div className="custom-input">
                                <input placeholder="Search" />
                                <SearchOutlined />
                            </div>
                        </Col>
                    </Row>
                    <div className="gap"></div>
                    <div className="gap"></div>
                    <div className="gap"></div>
                    <div>
                        <Row className="flex jcsb ci">
                            <div className="main-title color-secondary"> Jobs that you posted </div>
                            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setShowModal(true)}>
                                Add job
                            </Button>
                        </Row>
                        <div className="gap"></div>
                        <div className="gap"></div>
                        <div className="gap"></div>
                        <Row gutter={[40, 40]}>
                            <Col md={24} lg={12}>
                                <JobCardHirer title="Eradicate Suicidal Thoughts" description={loremIpsum} status="hold" price="$500" />
                            </Col>
                            <Col md={24} lg={12}>
                                <JobCardHirer title="Eradicate Suicidal Thoughts" description={loremIpsum} status="done" price="$1700" />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="sidebar">
                        <h2 className="sub-title x2 color-primary dark"> Your Statistics</h2>
                        <div className="gap x2"></div>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <StatBox title="Jobs on hold" description="5" icon={<ProjectIcon />} />
                            </Col>
                            <Col span={24}>
                                <StatBox title="Successful jobs" description="17" icon={<EscrowIcon />} />
                            </Col>
                            <Col span={24}>
                                <StatBox title="Money Spent" description="$3700" icon={<WithdrawIcon />} />
                            </Col>
                        </Row>
                        <div className="gap x2"></div>
                        {/* <Row className="flex jcc">
                            <Button size="large" type="primary" style={{ borderColor: 'green', color: 'green'}}ghost shape="round" className="elevation-1">Withdraw</Button>
                        </Row> */}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HirerDashboard;
