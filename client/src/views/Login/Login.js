import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux"

// redux actions
import { userActions } from "../../reducers/userReducer"

// stylesheets
import "./login.scss";

// svg
import { ReactComponent as SignupSvg } from "../../assets/signup.svg";
import { login } from "../../api/worker";
import { setToken } from "../../utils/token";
const Login = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const submit = async ({ email, password }) => {
        setError(null);
        setLoading(true);
        try {
            const { token, user } = await login({ email, password });
            await setToken(token);
            console.log(user)
            dispatch({
                type: userActions.SET_USER_DETAILS,
                payload: user
            });
            history.push("/worker");
        } catch (err) {
            setError(err.message)
            console.log(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="login">
            <Row className="background-section">
                <Col span={12} className="left"></Col>
                <Col span={12} className="right"></Col>
            </Row>
            <div className="login-form-wrapper">
                <section className="login-form card">
                    <Row>
                        <Col span={10}>
                            <h2 className="main-title"> Sign in </h2>
                            <span className="sub-text"> Get ready for beautiful experience </span>
                            <div className="gap"></div>
                            <div className="gap"></div>
                            <Form form={form} layout="vertical" onFinish={submit}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email is a required field" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is a required field" }]}>
                                    <Input type="password" />
                                </Form.Item>
                                {error && (
                                    <>
                                        <Alert message={error} type="error" showIcon closable />
                                        <div className="gap"></div>
                                    </>
                                )}
                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit" loading={loading}>
                                        {" "}
                                        Login{" "}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={14} className="flex jcr ci">
                            <div style={{ position: "absolute", top: "1rem", right: "2rem" }}>
                                <Link to="/signup">
                                    <Button size="large" type="primary" ghost>
                                        {" "}
                                        Signup{" "}
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

export default Login;
