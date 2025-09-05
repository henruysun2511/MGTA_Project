import { PlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAction } from '../../../../redux/actions/baseAction';
import { getAllData } from '../../../../services/baseService';
import ClassSessionCreateModal from './childrens/ClassSessionCreateModal';
import ClassSessionFilter from './childrens/ClassSessionFilter';
import ClassSessionTable from './childrens/ClassSessionTable';


export default function SessionMana() {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const classSessionData = useSelector((state) => state.classsessions.list).filter(item => !item.deleted);

    useEffect(() => {
        getAllData("classsessions").then((res) => { dispatch(fetchAction("classsessions", res)); });
    }, [dispatch]);

    const [filters, setFilters] = useState({
        search: "",
        sort: "all",
    });

    const filteredSessions = classSessionData
        .filter((item) =>
            item.name.toLowerCase().includes(filters.search.toLowerCase())
        )
        .sort((a, b) => {
            if (filters.sort === "asc/name") return a.name.localeCompare(b.name);
            if (filters.sort === "desc/name") return b.name.localeCompare(a.name);
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