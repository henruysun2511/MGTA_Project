import { BellFilled, BookOutlined, DeleteOutlined, FolderOutlined, HomeFilled, LaptopOutlined, LogoutOutlined, ReadOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import avatar from '../assets/images/gv.png';
import logo from '../assets/images/logo.jpg';
import "./AdminLayout.scss";

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleClick = ({ key }) => {
        navigate(key); // key chính là đường dẫn
    };

    const items = [
        { icon: <FolderOutlined />, label: 'Tổng quan', key: '/admin/overview' },
        { icon: <UserOutlined />, label: 'Quản lý tài khoản', key: '/admin/accountMana' },
        { icon: <ReadOutlined />, label: 'Quản lý lớp', key: '/admin/classMana' },
        { icon: <ScheduleOutlined />, label: 'Quản lý lịch học', key: '/admin/classScheduleMana' },
        { icon: <BookOutlined />, label: 'Quản lý bài tập', key: '/admin/exerciseMana' },
        { icon: <LaptopOutlined />, label: 'Quản lý blog', key: '/admin/blogMana' },
        { icon: <DeleteOutlined />, label: 'Thùng rác', key: '/admin/recycleBin' },

    ];

    return (
        <>
            <div className='admin__layout'>
                <div className='admin__sider'>
                    <div>
                        <div className='admin__avatar'><img src={avatar} alt="avatar.png" /></div>
                        <Menu items={items} onClick={handleClick} defaultSelectedKeys={['/admin/overview']}></Menu>
                    </div>
                    <Button className='button__logout' icon={<LogoutOutlined />}>
                        <Link to="/auth/logout">Đăng xuất</Link>
                    </Button>
                </div>

                <div className="admin__main">
                    <div className='admin__header'>
                        <div className='admin__logo'><img src={logo} alt="logo.jpg" /></div>
                        <Button className='button__home' icon={<HomeFilled />}>
                            <Link to="/">Home</Link>
                        </Button>
                        <BellFilled className='admin__icon-nofitication' />
                    </div>
                    <div className='admin__content'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};