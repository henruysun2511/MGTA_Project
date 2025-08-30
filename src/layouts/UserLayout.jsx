import { BellFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/logoNoBackGround.png';
import Container2 from '../components/Container/container2';
import './UserLayout.scss';

export default function UserLayout() {
    const token = localStorage.getItem("accessToken");
    // const role = getCookie("role");
    const isLogin = useSelector(state => state.loginReducer);
    // const username = getCookie("username");

    // useEffect(() => {
    //     get
    // })

    return (
        <>
            <div className="header">
                <Container2>
                    <div className="header__wrap">
                        <Link to="/">
                            <div className='header__logo'>
                                <img src={logo} alt="logo.png" />
                            </div>
                        </Link>

                        <ul>
                            <li><NavLink to="/curriculum">Chương trình học</NavLink></li>
                            <li><NavLink to="/blog">Blog</NavLink></li>
                            <li><NavLink to="/feedback">Feedback</NavLink></li>
                            <li><NavLink to="/aboutus">Về chúng tôi</NavLink></li>
                        </ul>

                        <div className="header__auth">
                            {token ? (
                                <>
                                    {token === "123456" ? (
                                        <Button className="header__button-admin">
                                            <Link to="/admin/overview">Trang quản lý</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <BellFilled style={{ marginRight: 8 }} />
                                            <p>Xin chào /</p>
                                            <Button className="header__button-register">
                                                <Link to="/auth/logout">Đăng xuất</Link>
                                            </Button>
                                        </>
                                    )}

                                </>
                            ) : (
                                <>
                                    <Button className="header__button-login">
                                        <Link to="/auth/login">Đăng nhập</Link>
                                    </Button>
                                    <Button className="header__button-register">
                                        <Link to="/auth/register">Đăng ký</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </Container2>
            </div>

            <Outlet />

        </>
    )
}