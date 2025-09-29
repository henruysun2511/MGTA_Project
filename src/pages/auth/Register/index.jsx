import { Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logoNoBackGround.png';
import { createData } from '../../../services/baseService';
import { alertError, alertSuccess } from '../../../utils/alerts';
import "./register.scss";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        try {
            if (e.password != e.rePassword) {
                alertError("Mật khẩu không trùng khớp");
                return
            }

            const account = {
                username: e.username,
                password: e.password,
                email: e.email,
            };

            const student = {
                name: e.fullname,
                phone: e.phone || "",
                class: e.classroom || "",
                school: e.school || "",
                previousEnglishScore: Number(e.preScore),
                parentName: e.parentFullName,
                address: e.address || "",
                parentPhone: e.parentPhoneNumber,
                parentEmail: e.parentEmail
            };

            const options = {
                account: account,
                student: student
            };
            console.log(options)
            // const json = JSON.stringify(options);
            // console.log(json);

            const res = await createData("auth/register", options);
            console.log(res);

            if (res.statusCode === 201) {
                alertSuccess(res.message);
                setTimeout(() => {
                    navigate("/auth/login");
                }, 2000);
            } else {
                alertError(res.message);
            }
        } catch (err) {
            console.error(err);
            alertError("Có lỗi xảy ra khi đăng ký");
        } finally {
            setLoading(false);
        }

    }



    return (
        <>
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
                                <Form.Item label="Số điện thoại" name="phone">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email' }]}>
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
                                <Form.Item label="Nhập lại mật khẩu" name="rePassword" rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }]}>
                                    <Input.Password />
                                </Form.Item>
                            </div>

                        </div>

                        <div className="register__button">
                            <button type="submit">{loading ? "Đang tiến hành đăng ký..." : "Đăng ký"}</button>
                            <p><Link to="/auth/login">Bạn đã có tài khoản, ấn vào đây để đăng nhập</Link></p>
                        </div>
                    </Form>

                    <div className="register__logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </>

    )
}

