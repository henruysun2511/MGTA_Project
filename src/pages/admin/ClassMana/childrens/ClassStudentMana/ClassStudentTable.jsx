import { EditOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../../hooks/usePagination';
import ClassStudentChangeClassModal from './ClassStudentChangeClassModal';
import ClassStudentUpdateModal from './ClassStudentUpdateModal';
const { Column } = Table;

export default function ClassStudentTable({ classStudentData }) {
    const dispatch = useDispatch();

    const { getPagination, getIndex } = usePagination(10);
    const [openModal, setOpenModal] = useState(false);
    const [openClassModal, setOpenClassModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    return (
        <>
            <Table dataSource={classStudentData}
            >
                <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
                <Column title="Học sinh" dataIndex="name" key="shift" />
                <Column title="Trường" dataIndex="school" key="shift" />
                <Column title="Địa chỉ" dataIndex="address" key="shift" />
                <Column title="Phụ huynh" dataIndex="parentName" key="classroom" />
                <Column title="SĐT Phụ huynh" dataIndex="parentPhone" key="classroom" />
                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="large">
                            <Tooltip title="Chỉnh sửa">
                                <EditOutlined onClick={() => { setOpenModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                            <Tooltip title="Chuyển lớp">
                                <RetweetOutlined onClick={() => { setOpenClassModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                        </Space>
                    )}
                />
            </Table>

            <ClassStudentChangeClassModal open={openClassModal} onCancel={() => setOpenClassModal(false)} record={editingRecord} />
            <ClassStudentUpdateModal open={openModal} onCancel={() => setOpenModal(false)} record={editingRecord} />
        </>
    )
}