import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logoNoBackGround.png';
import { checkLogin } from '../../../redux/actions/loginAction';
import { login } from '../../../services/userService';
import { setCookie } from "../../../utils/cookies";
import "./login.scss";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        const username = e.username;
        const password = e.password;
        const response = await login(username, password);
        if (response.length > 0) {
            setError(null);
            setSuccess("Đăng nhập thành công");
            setCookie("id",response[0].id,1);
            setCookie("username",response[0].username,1);
            setCookie("password",response[0].password,1);
            setCookie("role",response[0].role,1);
            dispatch(checkLogin(true));
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            setSuccess(null);
            setError("Tên đăng nhập hoặc mật khẩu sai");
        }
    }

    return (
        <>
            <div className="login__wrap">
                <div className="login">
                    <div className="square--blue"></div>
                    <div className="square--yellow"></div>
                    <div className="square--pink"></div>
                    <div className="square--yellow-2"></div>
                    <h2>Đăng nhập</h2>

                    <Form className="login__form"
                        // name="basic"
                        labelCol={{ span: 8, style: { textAlign: 'left' } }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={handleSubmit}
                    // initialValues={{ remember: true }}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    >

                        <div className="login__item">
                            <Form.Item
                                label="Tên đăng nhập"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </div>

                        <div className="login__button">
                            <button type="submit">Đăng nhập</button>
                            <p><Link to="/auth/register">Bạn chưa có tài khoản, ấn vào đây để đăng ký</Link></p>
                        </div>
                    </Form>

                    <div className="login__logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>
            <div className='my-alert'>
                {error && (
                    <Alert message={error} type="error" showIcon />
                )}
                {success && (
                    <Alert message={success} type="success" showIcon />
                )}
            </div>

        </>
    )

}