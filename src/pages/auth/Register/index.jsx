import { Alert, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logoNoBackGround.png';
import { checkExistAcount, createUser, register } from '../../../services/userService';
import "./register.scss";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        const username = e.username;
        const password = e.password;
        const checkExistUsername = await checkExistAcount("username", username);
        if (checkExistUsername.length > 0) {
            setError("Trùng tên đăng nhập");
        } else {
            const accountOptions = {
                username: username,
                password: password,
                role: "student",
                status: false
            }
            const response = await register(accountOptions);
            console.log(response);
            if (response && response.id) {
                const accountId = response.id;
                const fullname = e.fullname;
                const phoneNumber = e.phoneNumber;
                const email = e.email;
                const classroom = e.classroom;
                const school = e.school;
                const preScore = e.preScore;
                const parentFullName = e.parentFullName;
                const address = e.address;
                const parentPhoneNumber = e.parentPhoneNumber;
                const parentEmail = e.parentEmail;
                const userOptions = {
                    accountId: accountId,
                    fullname: fullname,
                    phoneNumber: phoneNumber,
                    email: email,
                    classroom: classroom,
                    school: school,
                    preScore: preScore,
                    parentFullName: parentFullName,
                    address: address,
                    parentPhoneNumber: parentPhoneNumber,
                    parentEmail: parentEmail
                }
                const response2 = createUser(userOptions);
                if (response2) {
                    setSuccess("Đăng ký thành công, tài khoản đang chờ active");
                    setError(null);
                    setTimeout(() => {
                        navigate("/auth/login");
                    }, 2000);
                } else {
                    setError("Đăng ký thất bại")
                }
            } else {
                setError("Không tìm thấy tài khoản");
            }
        }
    }

    return (
        <>
            <div className='my-alert'>
                {error && (
                    <Alert message={error} type="error" showIcon />
                )}
                {success && (
                    <Alert message={success} type="success" showIcon />
                )}
            </div>
            <div className="register__wrap">


                <div className="register">
                    <div className="square--blue"></div>
                    <div className="square--yellow"></div>
                    <div className="square--pink"></div>
                    <div className="square--yellow-2"></div>
                    <h2>Đăng ký học</h2>
                    <Form
                        className="register__form"
                        labelCol={{ span: 8, style: { textAlign: 'left' } }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: "100%" }}
                        onFinish={handleSubmit}
                    >
                        <div className="register__container">
                            <div className="register__item">
                                <p>1. Thông tin học sinh</p>
                                <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Lớp" name="classroom" rules={[{ required: true, message: 'Vui lòng chọn lớp' }]}>
                                    <Select>
                                        <Select.Option value="6">6</Select.Option>
                                        <Select.Option value="7">7</Select.Option>
                                        <Select.Option value="8">8</Select.Option>
                                        <Select.Option value="9">9</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Trường" name="school">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Số điện thoại" name="phoneNumber">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Điểm kì trước" name="preScore">
                                    <Input />
                                </Form.Item>
                            </div>

                            <div className="register__item">
                                <p>2. Thông tin phụ huynh</p>
                                <Form.Item label="Họ và tên" name="parentFullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Địa chỉ" name="address">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Số điện thoại" name="parentPhoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email" name="parentEmail" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                                    <Input />
                                </Form.Item>
                            </div>

                            <div className="register__item">
                                <p>3. Thông tin đăng nhập</p>
                                <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item label="Nhập lại mật khẩu" name="passwordAgain" rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }]}>
                                    <Input.Password />
                                </Form.Item>
                            </div>

                        </div>

                        <div className="register__button">
                            <button type="submit">Đăng ký</button>
                            <p><Link to="/auth/login">Bạn đã có tài khoản, ấn vào đây để đăng nhập</Link></p>
                        </div>
                    </Form>

                    <div className="register__logo">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
        </>

    )
}
