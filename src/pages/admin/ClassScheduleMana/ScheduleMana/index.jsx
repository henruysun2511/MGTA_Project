import { PlusOutlined } from '@ant-design/icons';
import { Button, Pagination, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import useQuery from '../../../../hooks/useQuery';
import { fetchAction } from '../../../../redux/actions/baseAction';
import ClassScheduleCreateModal from './childrens/ClassScheduleCreateModal';
import ClassScheduleFilter from './childrens/ClassScheduleFilter';
import ClassScheduleTable from './childrens/ClassScheduleTable';


export default function ScheduleMana() {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10,
    });

    const [data] = useFetch("admin/class-schedule/class-schedules", query, {});

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("classschedules", data.classSchedules?.items));
        }
    }, [data, dispatch]);

    const classScheduleData = useSelector(state => state.classschedules.list || []).filter(csc => !csc.deleted);

    const handleFilterChange = (newFilter) => {
        updateQuery({
            ...newFilter,
            page: 1, 
        });
    };

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    const [classDataRes] = useFetch("admin/class/classes");
    const classData = classDataRes?.classes?.items || [];

    const [classSessionRes] = useFetch("admin/class-session/class-sessions");
    const classSessionData = classSessionRes || [];

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <ClassScheduleFilter
                    classData={classData}
                    classSessionData={classSessionData}
                    onFilterChange={handleFilterChange}
                />
                <div style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={() => setModalVisible(true)}
                    >
                        Thêm lịch học mới
                    </Button>
                </div>
                <ClassScheduleTable classScheduleData={classScheduleData} classData={classData}
                    classSessionData={classSessionData} pagination={data?.classSchedules?.pagination} />

                {data?.classSchedules?.pagination && (
                    <Pagination
                        current={data.classSchedules.pagination.currentPage}
                        pageSize={data.classSchedules.pagination.limit}
                        total={data.classSchedules.pagination.count}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20', '50']}
                    />
                )}
            </Space>

            <ClassScheduleCreateModal
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                classData={classData}
                classSessionData={classSessionData}
            />
        </>
    );
}
