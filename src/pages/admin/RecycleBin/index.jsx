import { Tabs } from 'antd';
import padding1 from "../../../components/Padding";
import AssignmentList from './components/AssignmentList';

export default function RecycleBin() {
    const items = [
        {
            key: '1',
            label: 'Tài khoản',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Lịch học',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Bài tập',
            children: <AssignmentList />,
        },
        {
            key: '4',
            label: 'Blog',
            children: 'Content of Tab Pane 3',
        }
    ];

    return <>
        <div style={padding1}>
            <Tabs defaultActiveKey="1" size='large' centered items={items}/>
        </div></>
}