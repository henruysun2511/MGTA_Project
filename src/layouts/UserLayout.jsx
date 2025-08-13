import { BellFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/logoNoBackGround.png';
import Container from "../components/Container";
import { getCookie } from '../utils/cookies';
import './UserLayout.scss';

export default function UserLayout() {
    const role = getCookie("role");
    const isLogin = useSelector(state => state.loginReducer);
    const username = getCookie("username");

    return (
        <>
            <div className="header">
                <Container>
                    <div className="header__wrap">
                        <Link to=""><div className='header__logo'><img src={logo} alt="logo.png" /></div></Link>
                        <ul>
                            <li><NavLink to="/curriculum">Chương trình học</NavLink></li>
                            <li><NavLink to="/blog">Blog</NavLink></li>
                            <li><NavLink to="/feedback">Feedback</NavLink></li>
                            <li><NavLink to="/aboutus">Về chúng tôi</NavLink></li>
                        </ul>
                        {!role && (
                            <div className="header__auth">
                                <Button className="header__button-login">
                                    <Link to="/auth/login">Đăng nhập</Link>
                                </Button>
                                <Button className="header__button-register">
                                    <Link to="/auth/register">Đăng ký</Link>
                                </Button>
                            </div>
                        )}
                        {role === "student" && (
                            <div className="header__auth">
                                <BellFilled />
                                <p>Xin chào {username} /</p>
                                <Button className="header__button-register">
                                    <Link to="/auth/logout">Đăng xuất</Link>
                                </Button>
                            </div>
                        )}
                        {role === "admin" && (
                            <div className="header__auth">
                                <Button className="header__button-admin">
                                    <Link to="/admin/overview">Trang quản lý</Link>
                                </Button>
                            </div>
                        )}

                    </div>
                </Container>
            </div>
            <Outlet />

        </>
    )
}