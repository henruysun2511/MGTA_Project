import { Button, notification } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/images/logoNoBackGround.png';
import Container2 from '../components/Container/container2';
import NofiticationStudent from '../components/Nofitications/NofiticationStudent';
import useFetch from '../hooks/useFetch';
import { fetchAction } from '../redux/actions/baseAction';
import { EVENT } from "../sockets/event";
import socket from "../sockets/socket";
import './UserLayout.scss';

export default function UserLayout() {
    const token = localStorage.getItem("accessToken");
    const roleId = localStorage.getItem("roleId");
    const isLogin = useSelector(state => state.loginReducer);
    const username = localStorage.getItem("username");

    const dispatch = useDispatch();
    const settingData = useSelector(state => state.settings.list || []);
    const [settingDataRes] = useFetch(
        settingData.length === 0 ? "admin/setting" : "", {}, {}
    );
    useEffect(() => {
        if (settingDataRes) {
            dispatch(fetchAction("settings", [settingDataRes]));
        }
    }, [dispatch, settingDataRes]);


    //Xử lý socket thông báo
    useEffect(() => {
        // socket connect
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on(EVENT.NEW_SCHEDULE, (data) => {
            notification.info({
                message: "Lịch học mới",
                description: data.message,
            });
        });

        socket.on(EVENT.ASSIGN_EXERCISE, (data) => {
            notification.warning({
                message: "📝 Bài tập mới",
                description: data.message,
            });
        });

        socket.on(EVENT.CHANGE_CLASS_SCHEDULE, (data) => {
            notification.info({
                message: "Thay đổi lịch học",
                description: data.message,
            });
        });

        return () => {
            socket.off(EVENT.NEW_SCHEDULE);
            socket.off(EVENT.ASSIGN_EXERCISE);
            socket.off(EVENT.CHANGE_CLASS_SCHEDULE);
        };
    }, []);


    return (
        <>
            <div className="header">
                <Container2>
                    <div className="header__wrap">
                        <Link to="/">
                            <div className='header__logo'>
                                <img src={settingData[0]?.logo ? settingData[0].logo : logo} alt="logo.png" />
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
                                    {roleId === "68ada708a19888b3462e7a6f" ? (
                                        <Button className="header__button-admin">
                                            <Link to="/admin/overview">Trang quản lý</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <NofiticationStudent style={{ marginRight: 8 }} />
                                            <Link to="/profile"><p>Xin chào {username ? username : "N/A"}/</p></Link>
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

            <div class="footer">
                <div class="footer__top">
                    <ul>
                        <li>
                            <div class="footer__icon">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <p>{settingData[0]?.phone ? settingData[0].phone : "03.999.78686"}</p>
                        </li>
                        <li>
                            <div class="footer__icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <p>{settingData[0]?.email ? settingData[0].email : "mgtahanoi@gmail.com"}</p>
                        </li>
                        <li>
                            <div class="footer__icon">
                                <i class="fa-brands fa-facebook"></i>
                            </div>
                            <p>{settingData[0]?.fb ? settingData[0].fb : "Tiếng Anh Cho Học Sinh Cấp 2 Mất Gốc"}</p>
                        </li>

                    </ul>
                </div>

                <div class="footer__main">
                    <div class="about-us">
                        <h1>VỀ MGTA</h1>
                        <div class="list-box"></div>
                        <ul>
                            <li><Link to="/aboutUs">Về chúng tôi</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/feedback">Đánh giá từ học viên</Link></li>
                        </ul>
                    </div>
                    <div class="about-us">
                        <h1>QUY ĐỊNH & ĐIỀU KHOẢN</h1>
                        <div class="list-box"></div>
                        <ul>
                            <li><a href="#">Điều khoản</a></li>
                            <li><a href="#">Quy định thành viên</a></li>
                            <li><a href="#">Quy định và chính sách chung</a></li>
                            <li><a href="#">Chính sách bảo vệ thông tin cá nhân của người tiêu dùng</a></li>
                        </ul>
                    </div>
                    <div class="about-us">
                        <h1>CHĂM SÓC KHÁCH HÀNG</h1>
                        <div class="list-box"></div>
                        <ul>
                            <li>
                                <p><b>Hotline:</b> 19002005</p>
                            </li>
                            <li>
                                <p><b>Giờ làm việc</b>: 9:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ, Tết)</p>
                            </li>
                            <li>
                                <p><b>Email:</b> huysun2511@gmail.com</p>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="footer__bottom">
                    © 2025. Bản quyền thuộc về Tác giả. Nghiêm cấm sao chép dưới mọi hình thức.
                </div>
            </div>


        </>
    )
}