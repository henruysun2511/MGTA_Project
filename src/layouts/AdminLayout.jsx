import { BookOutlined, DeleteOutlined, FolderOutlined, HomeFilled, LaptopOutlined, LogoutOutlined, ReadOutlined, SafetyOutlined, ScheduleOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import avatar from '../assets/images/gv.png';
import "./AdminLayout.scss";

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleClick = ({ key }) => {
        navigate(key);
    };

    const settingData = useSelector(state => state.settings.list || []);

    const items = [
        { icon: <FolderOutlined />, label: 'Tổng quan', key: '/admin/overview' },
        { icon: <SafetyOutlined />, label: 'Quản lý quyền hạn', key: '/admin/permissionMana' },
        { icon: <UserOutlined />, label: 'Quản lý tài khoản', key: '/admin/accountMana' },
        { icon: <ReadOutlined />, label: 'Quản lý lớp', key: '/admin/classMana' },
        { icon: <ScheduleOutlined />, label: 'Quản lý lịch học', key: '/admin/classScheduleMana' },
        { icon: <BookOutlined />, label: 'Quản lý bài tập', key: '/admin/exerciseMana' },
        { icon: <TrophyOutlined />, label: 'Quản lý điểm số', key: '/admin/scoreMana' },
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
                    <Link to="/auth/logout" style={{ textAlign: 'center'}}>
                        <Button className='button__logout' icon={<LogoutOutlined />} style={{ width: '100%' }}>
                            Đăng xuất
                        </Button>
                    </Link>
                </div>

                <div className="admin__main">
                    <div className='admin__header'>
                        <div className='admin__logo'><img src={settingData[0]?.logo || ""} alt="logo.jpg" /></div>
                        <Link to="/">
                            <Button className='button__home' icon={<HomeFilled />}>
                                Home
                            </Button>
                        </Link>
                    </div>
                    <div className='admin__content'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};