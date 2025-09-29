import { Form, Input } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createData } from '../../../../services/baseService';
import { alertSuccess } from '../../../../utils/alerts';
import "../forgotPassword.scss";
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        const options = {
            email: values.email
        }
        try {
            const res = await createData("auth/forgot-password", options);
            if (res.statusCode === 200) {
                sessionStorage.setItem("email", values.email);
                await alertSuccess("Thành công", `Đã gửi mã otp đến gmail ${values.email}`);
                navigate("/auth/otp");
            }
        } catch (error) {
            console.error(error);
            alertError("Có lỗi xảy ra với email");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="forgot__wrap">
                <div className="login">
                    <div className="square--blue"></div>
                    <div className="square--yellow"></div>
                    <div className="square--pink"></div>
                    <div className="square--yellow-2"></div>
                    <h2>Xác thực email</h2>

                    <Form className="login__form"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 500 }}
                        onFinish={handleSubmit}
                    >

                        <div className="login__item">
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="login__button">
                            <button type="submit" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Xác nhận"}
                            </button>
                            <p><Link to="/auth/login">Quay lại</Link></p>
                        </div> 

                    </Form>
                </div>
            </div>
        </>
    )
}