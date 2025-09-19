import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import padding1 from "../../../components/Padding";
import RecycleAccount from './RecycleAccount';
import RecycleBlog from './RecycleBlog';

export default function RecycleBin() {
    const dispatch = useDispatch();
    useEffect(() => {

    }, [dispatch]);


    const items = [
        {
            key: '1',
            label: 'Tài khoản',
            children: <RecycleAccount />,
        },
        {
            key: '2',
            label: 'Blog',
            children: <RecycleBlog />,
        }
    ];

    return <>
        <div style={padding1}>
            <Tabs defaultActiveKey="1" size='large' centered items={items} />
        </div></>
}