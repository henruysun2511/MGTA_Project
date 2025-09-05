import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAction } from '../../../../redux/actions/baseAction';
import { getAllData } from '../../../../services/baseService';
import ClassScheduleCreateModal from './childrens/ClassScheduleCreateModal';
import ClassScheduleFilter from './childrens/ClassScheduleFilter';
import ClassScheduleTable from './childrens/ClassScheduleTable';

const { Search } = Input;
const { Option } = Select;

export default function ScheduleMana() {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const classScheduleData = useSelector((state) => state.classschedules.list);
    const classData = useSelector((state) => state.classes.list);
    const classSessionData = useSelector((state) => state.classsessions.list);

    useEffect(() => {
        getAllData("classschedules").then((res) => { dispatch(fetchAction("classschedules", res)); });
        getAllData("classes").then((res) => { dispatch(fetchAction("classes", res)); });
        getAllData("classsessions").then((res) => { dispatch(fetchAction("classsessions", res)); });
    }, [dispatch]);

    const [filters, setFilters] = useState({
        keyword: "",
        date: "",
        classId: "all",
        classSessionId: "all",
    });

    const filteredData = classScheduleData.filter((item) => {
        const matchKeyword =
            !filters.keyword ||
            item.linkZoom?.toLowerCase().includes(filters.keyword.toLowerCase());

        const matchDate =
            !filters.date ||
            item.schedule.startsWith(filters.date); // vì schedule là "YYYY-MM-DD..."

        const matchClass =
            filters.classId === "all" || String(item.classId) === String(filters.classId);

        const matchSession =
            filters.classSessionId === "all" || String(item.classSessionId) === String(filters.classSessionId);

        return matchKeyword && matchDate && matchClass && matchSession;
    });

    return (
        <>

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <ClassScheduleFilter classData={classData} classSessionData={classSessionData}
                    onFilterChange={(newFilter) => setFilters({ ...filters, ...newFilter })} />
                <div style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        size=" middle"
                        icon={<PlusOutlined />}
                        onClick={() => { setModalVisible(true) }}
                    >
                        Thêm lịch học mới
                    </Button>
                </div>
                <ClassScheduleTable classScheduleData={filteredData} classData={classData} classSessionData={classSessionData} />
            </Space>


            <ClassScheduleCreateModal open={modalVisible} onCancel={() => { setModalVisible(false) }} classData={classData} classSessionData={classSessionData} />

        </>
    );
}
