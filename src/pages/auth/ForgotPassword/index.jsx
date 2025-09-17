import { Form, Input } from 'antd';
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logoNoBackGround.png';
import "./login.scss";

export default function ForgotPassword() {
    const handleSubmit = () => {

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
                        labelCol={{ span: 8, style: { textAlign: 'left' } }}
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
                                label="TNhập lại mật khẩu mới"
                                name="username"
                                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className='forgot-passsword'>Quên mật khẩu?</div>

                        <div className="login__button">
                            <button type="submit">Đăng nhập</button>
                            <p><Link to="/auth/register">Bạn chưa có tài khoản, ấn vào đây để đăng ký</Link></p>
                        </div>
                    </Form>

                    <div className="login__logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}