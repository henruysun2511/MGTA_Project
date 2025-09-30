import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import ClassSessionCreateModal from './childrens/ClassSessionCreateModal';
import ClassSessionFilter from './childrens/ClassSessionFilter';
import ClassSessionTable from './childrens/ClassSessionTable';


export default function SessionMana() {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const [data] = useFetch("admin/class-session/class-sessions", {}, {});

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("classsessions", data));
        }
    }, [data, dispatch]);
    const classSessionData = useSelector((state) => (state.classsessions.list || []).filter(cls => !cls.deleted)); 

    const [filters, setFilters] = useState({
        search: "",
        sort: "all",
    });

    const filteredSessions = classSessionData
        .filter((item) =>
            item.classSessionName.toLowerCase().includes(filters.search.toLowerCase())
        )
        .sort((a, b) => {
            if (filters.sort === "asc/name") return a.classSessionName.localeCompare(b.classSessionName);
            if (filters.sort === "desc/name") return b.classSessionName.localeCompare(a.classSessionName);
            return 0;
        });

    return (
        <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <ClassSessionFilter
                    onFilterChange={(newFilter) =>
                        setFilters({ ...filters, [newFilter.type]: newFilter.value })
                    } />
                <div style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        size=" middle"
                        icon={<PlusOutlined />}
                        onClick={() => { setModalVisible(true) }}
                    >
                        Thêm ca học mới
                    </Button>
                </div>
                <ClassSessionTable classSessionData={filteredSessions} />
            </Space>

            <ClassSessionCreateModal open={modalVisible} onCancel={() => { setModalVisible(false) }} classSessionData={classSessionData} />
        </>
    )
}