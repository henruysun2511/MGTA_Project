import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { updateData } from '../../../../services/baseService';
import { alertError, alertSuccess } from '../../../../utils/alerts';

export default function ResetPassword() {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        if (values.password != values.rePassword) {
            alertError("Mật khẩu không trùng khớp", "");
            return
        }

        const options = {
            newPassword: values.password,
            passwordConfirm: values.rePassword
        } 
        try {
            const res = await updateData("auth/reset-password","", options);
            if (res.statusCode === 200) {
                alertSuccess("Thành công", "Thay đổi mật khẩu thành công");
                navigate("/auth/login");
            }
            console.log(res)
        } catch (error) {
            console.error(error);
            alertError("Có lỗi xảy ra với mã otp");
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
                    <h2>Đăng nhập</h2>

                    <Form className="login__form"
                        labelCol={{ span: 12, style: { textAlign: 'left' } }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={handleSubmit}
                    >

                        <div className="login__item">
                            <Form.Item
                                label="Mật khẩu mới"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Nhập lại mật khẩu mới"
                                name="rePassword"
                                rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </div>

                        <div className="login__button">
                            <button type="submit">Xác nhận</button>
                        </div>
                    </Form>

                </div>
            </div>
        </>
    )
}