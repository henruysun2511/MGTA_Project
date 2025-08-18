import { Tabs } from 'antd';
import padding1 from "../../../components/Padding";
import ClassScheduleTable from './childrens/ClassScheduleTable';
import ExcerciseTable from './childrens/ExcerciseTable';

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
            children: <ClassScheduleTable />,
        },
        {
            key: '3',
            label: 'Bài tập',
            children: <ExcerciseTable />,
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