import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import { fetchAction } from '../../../redux/actions/baseAction';
import { getAllData } from '../../../services/baseService';
import RecycleAccountTable from './childrens/RecycleAccountTable';
import RecycleBlogTable from './childrens/RecycleBlogTable';
import RecycleClassScheduleTable from './childrens/RecycleClassScheduleTable';
import RecycleClassTable from './childrens/RecycleClassTable';
import RecycleDeadlineTable from './childrens/RecycleDeadlineTable';
import RecycleExcerciseTable from './childrens/RecycleExcerciseTable';

export default function RecycleBin() {
    const dispatch = useDispatch();
    useEffect(() => {
        getAllData("accounts").then((res) => dispatch(fetchAction("accounts", res)));
        getAllData("students").then((res) => dispatch(fetchAction("students", res)));
        getAllData("classes").then((res) => dispatch(fetchAction("classes", res)));
        getAllData("exercises").then((res) => dispatch(fetchAction("exercises", res)));
        getAllData("classschedules").then((res) => dispatch(fetchAction("classschedules", res)));
        getAllData("classsessions").then((res) => dispatch(fetchAction("classsessions", res)));
        getAllData("blogs").then((res) => dispatch(fetchAction("blogs", res)));
        getAllData("deadlines").then((res) => dispatch(fetchAction("deadlines", res)));
    }, [dispatch]);

    const accountData = useSelector((state) => state.accounts.list).filter(item => item.deleted);
    const studentData = useSelector((state) => state.students.list).filter(item => item.deleted);
    const classData = useSelector((state) => state.classes.list).filter(item => item.deleted);
    const classSessionData = useSelector((state) => state.classsessions.list);
    const classScheduleData = useSelector((state) => state.classschedules.list).filter(item => item.deleted);
    const exerciseData = useSelector((state) => state.exercises.list).filter(item => item.deleted);
    const blogData = useSelector((state) => state.blogs.list).filter(item => item.deleted);
    const deadlineData = useSelector((state) => state.blogs.list).filter(item => item.deleted);
    console.log(classScheduleData)

    const items = [
        {
            key: '1',
            label: 'Tài khoản',
            children: <RecycleAccountTable accountData={accountData} studentData={studentData} />,
        },
        {
            key: '2',
            label: 'Lớp',
            children: <RecycleClassTable classData={classData} />,
        },
        {
            key: '3',
            label: 'Lịch học',
            children: <RecycleClassScheduleTable classScheduleData={classScheduleData} classSessionData={classSessionData} classData={classData} />,
        },
        {
            key: '4',
            label: 'Bài tập',
            children: <RecycleExcerciseTable exerciseData={exerciseData} />,
        },
        {
            key: '5',
            label: 'Bài tập giao',
            children: <RecycleDeadlineTable deadlineData={deadlineData} />,
        },
        {
            key: '6',
            label: 'Blog',
            children: <RecycleBlogTable blogData={blogData} />,
        }
    ];

    return <>
        <div style={padding1}>
            <Tabs defaultActiveKey="1" size='large' centered items={items} />
        </div></>
}