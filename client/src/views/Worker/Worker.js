import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { SearchOutlined, LogoutOutlined, DollarCircleFilled } from "@ant-design/icons";
import { JobCardWorker } from "../../components/JobCard/JobCard";

// svgs
import { ReactComponent as ProjectIcon } from "../../assets/projectIcon.svg";
import { ReactComponent as EscrowIcon } from "../../assets/escrow.svg";
import { ReactComponent as WithdrawIcon } from "../../assets/withdraw.svg";

// stylesheets
import "./worker.scss";
import getUserDetails from "../../action-creators/getUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../utils/token";
import { setupPayout} from "../../api/stripe";

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

const StatisticsSection = () => {
    return (
        <>
            <Row gutter={[0, 10]}>
                <Col span={24}>
                    <StatBox title="Project done" description="17" icon={<ProjectIcon />} />
                </Col>
                <Col span={24}>
                    <StatBox title="Escrow" description="$700" icon={<EscrowIcon />} />
                </Col>
                <Col span={24}>
                    <StatBox title="Available" description="$1700" icon={<WithdrawIcon />} />
                </Col>
            </Row>
            <div className="gap x2"></div>
            <Row className="flex jcc">
                <Button size="large" type="primary" style={{ borderColor: "green", color: "green" }} ghost shape="round" className="elevation-1">
                    Withdraw
                </Button>
            </Row>
        </>
    );
};

const SetupPayout = () => {

    const handleSetupPayout = async () => {
        try {
            const expressOnboardURL = await setupPayout();
            window.location.href = expressOnboardURL
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <div style={{ textAlign: "center" }}>You have not set up payouts</div>
            <div className="gap"></div>
            <div className="flex jcc">
                <Button type="primary" icon={<DollarCircleFilled size="" />} onClick={handleSetupPayout}>
                    Set up Payouts
                </Button>
            </div>
        </div>
    );
};

const WorkerDasboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails());
        // eslint-disable-next-line
    }, []);

    const logout = () => {
        removeToken();
        history.push("/login");
    };

    return (
        <div className="worker">
            <Row>
                <Col span={18} className="main-dashboard">
                    <Row className="flex jcsb">
                        <Col className="flex ci">
                            <div className="avatar">
                                <img src="https://semantic-ui.com/images/avatar/large/elliot.jpg" alt="avatar"></img>
                            </div>
                            <div className="hgap"></div>
                            <div className="sub-title color-secondary dark">Hey {user.name}.</div>
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
                        <div className="main-title color-secondary"> Jobs waiting for you </div>
                        <div className="gap"></div>
                        <div className="gap"></div>
                        <div className="gap"></div>
                        <Row gutter={[40, 40]}>
                            <Col md={24} lg={12}>
                                <JobCardWorker title="Eradicate Suicidal Thoughts" description={loremIpsum} onOkay={() => {}} price="$800" />
                            </Col>
                            <Col md={24} lg={12}>
                                <JobCardWorker title="Eradicate Suicidal Thoughts" description={loremIpsum} onOkay={() => {}} price="$2700" />
                            </Col>
                            <Col md={24} lg={12}>
                                <JobCardWorker title="Eradicate Suicidal Thoughts" description={loremIpsum} onOkay={() => {}} price="$2700" />
                            </Col>
                            <Col md={24} lg={12}>
                                <JobCardWorker title="Eradicate Suicidal Thoughts" description={loremIpsum} onOkay={() => {}} price="$2700" />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="sidebar">
                        <h2 className="sub-title x2 color-primary dark"> Your Statistics</h2>
                        <div className="gap x2"></div>
                        {user.stripeAccountId ? (
                            <StatisticsSection />
                        ) : (
                            <>
                                <div className="gap"></div>
                                <SetupPayout/>
                            </>
                        )}
                        <div style={{ position: "absolute", bottom: "2rem", right: "2rem" }}>
                            <Button onClick={logout} shape="circle" icon={<LogoutOutlined />} type="primary" ghost />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default WorkerDasboard;
