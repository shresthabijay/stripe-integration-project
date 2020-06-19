import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from 'react-router-dom'

// stylesheets
import './home.scss'

// svg imports
import { ReactComponent as WorkerSvg } from '../../assets/worker.svg' 
import { ReactComponent as WaveSvg } from '../../assets/wave1.svg' 

const sectionStyle = { height: '100%', width: '100%' }

const Home = () => {
    return (
        <>
        <div style={{ position: 'absolute', bottom: '0' }}>
            <WaveSvg width="100vw"/>
        </div>
        <div className="home">
            
            <Row className="nav flex jcsb">
                <Col>
                    <h2 className="sub-title">Skip The Tool Box</h2>
                </Col>
                <Col>
                <Link to="/login"><Button size="large" type="primary" shape="round" >Login</Button></Link>
                </Col>
            </Row>
            <Row className="bottom-section">
                <Col span={10} className="flex ci">
                    <section >
                        <h1 className="main-title">GET HIRED IN OUR PLATFORM</h1>
                        <div className="gap"></div>
                        <div className="sub-text">Find best handy jobs in your area and bid for the work.</div>
                        <div className="gap"></div>
                        <div>
                            <Link to="/signup"><Button size="large" type="primary" shape="round" >Sign up</Button></Link>
                            <div className="hgap"></div>
                            <Link to="/login"><Button size="large" type="primary" ghost shape="round" >Login</Button></Link>
                        </div>
                    </section>
                </Col>
                <Col span={14} className="flex ci jcc">
                    <section style={sectionStyle}>
                        <WorkerSvg style={sectionStyle}/>
                    </section>
                </Col>
            </Row>
        </div>
        </>
    );
};

export default Home;
