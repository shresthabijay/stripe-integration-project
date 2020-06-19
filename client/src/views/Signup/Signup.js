import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { signup } from "../../api/worker";

// stylesheets
import "./signup.scss";

// svg
import { ReactComponent as SignupSvg } from "../../assets/signup.svg";

const Signup = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const history = useHistory();

    const submit = async ({ name, email, password }) => {
        setError(null);
        setLoading(true);
        try {
            await signup({ name, email, password });
            history.push("/");
        } catch (err) {
            setError(err.message);
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="signup">
            <Row className="background-section">
                <Col span={12} className="left"></Col>
                <Col span={12} className="right"></Col>
            </Row>
            <div className="login-form-wrapper">
                <section className="login-form card">
                    <Row>
                        <Col span={10}>
                            <h2 className="main-title"> Create Account </h2>
                            <span className="sub-text"> Get ready for beautiful experience </span>
                            <div className="gap"></div>
                            <div className="gap"></div>
                            <Form form={form} layout="vertical" onFinish={submit}>
                                <Form.Item label="Full name" name="name" rules={[{ required: true, message: "Fullname is a required field" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: "Email is a required field" },
                                        { type: "email", message: "Please enter a valid email" },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is a required field" }]}>
                                    <Input type="password" />
                                </Form.Item>
                                {error && (
                                    <>
                                        <Alert message={error} type="error" closable />
                                        <div className="gap"></div>
                                    </>
                                )}
                                <Form.Item>
                                    <Button size="large" type="primary" loading={loading} htmlType="submit">
                                        {" "}
                                        Signup{" "}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={14} className="flex jcr ci">
                            <div style={{ position: "absolute", top: "1rem", right: "2rem" }}>
                                <Link to="/login">
                                    <Button size="large" type="primary" ghost>
                                        {" "}
                                        Login{" "}
                                    </Button>
                                </Link>
                            </div>
                            <SignupSvg style={{ width: "17rem", height: "12rem" }} />
                        </Col>
                    </Row>
                </section>
            </div>
        </div>
    );
};

export default Signup;
