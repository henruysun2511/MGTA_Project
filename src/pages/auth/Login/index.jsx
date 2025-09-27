import { Form, Input } from 'antd';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logoNoBackGround.png';
import { checkLogin } from '../../../redux/actions/loginAction';
import { createData } from '../../../services/baseService';
import { alertError, alertSuccess } from '../../../utils/alerts';
import "./login.scss";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        const username = e.username;
        const password = e.password;

        try {
            const response = await createData("auth/login", { username: username, password: password });
            console.log(response);

            if (response.statusCode === 200 && response.data?.accessToken) {
                const decoded = jwtDecode(response.data?.accessToken);
                console.log(decoded);
                localStorage.setItem("roleId", decoded.roleId);
                localStorage.setItem("accountId", decoded.accountId);
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("username", response.data.username);

                dispatch(checkLogin(true));

                alertSuccess("Đăng nhập thành công");

                const roleId = localStorage.getItem("roleId");
                if (roleId && roleId === "68ada708a19888b3462e7a6f") {
                    setTimeout(() => {
                        navigate("/admin/overview");
                    }, 1000);
                } else {
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }

            } else if (response.statusCode === 401) {
                dispatch(checkLogin(true));
                alertSuccess("Đăng nhập thành công " + response.message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            else {
                alertError("Tên đăng nhập hoặc mật khẩu sai");
            }
        } catch (error) {
            console.error(error);
            alertError("Có lỗi xảy ra khi đăng nhập");
        }
    };


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
                                label="Tên đăng nhập"
                                name="username"
                                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            >
                                <Input.Password />
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