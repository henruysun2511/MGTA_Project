import { RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useState } from 'react';
import ClassStudentChangeClassModal from './ClassStudentChangeClassModal';
const { Column } = Table;

export default function ClassStudentTable({ classStudentData, pagination }) {
    const [openClassModal, setOpenClassModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    return (
        <>
            <Table dataSource={classStudentData} pagination={false}
            >
                <Column title="STT" key="index" render={(text, record, index) =>
                    ((pagination?.currentPage - 1) * pagination?.limit) + index + 1
                }/>
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
                            <Tooltip title="Chuyển lớp">
                                <RetweetOutlined onClick={() => { setOpenClassModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                        </Space>
                    )}
                />
            </Table>

            <ClassStudentChangeClassModal open={openClassModal} onCancel={() => setOpenClassModal(false)} record={editingRecord} />
        </>
    )
}