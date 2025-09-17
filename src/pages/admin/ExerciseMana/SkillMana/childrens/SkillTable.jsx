import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleDelete } from "../../../../../utils/handles";
import SkillUpdateModal from "./SkillUpdateModal";
const { Column } = Table;

export default function SkillTable({ skillData }) {
    const dataSource = skillData || [];
    const dispatch = useDispatch();

    const handleSoftDeleteSkill = async (record) => {
        if (!record) return;
        await handleDelete(dispatch,"admin/skill","skills", record._id, record.skillName);
    }

    const [openModal, setOpenModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    return (
        <>
            <Table dataSource={dataSource}
                pagination={false}>
                <Column title="STT" key="index" render={(text, record, index) => index} />
                <Column title="Kỹ năng" dataIndex="skillName" key="skillName" />
                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Tooltip title="Chỉnh sửa">
                                <EditOutlined onClick={() => { setOpenModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <DeleteOutlined onClick={() => handleSoftDeleteSkill(record)} />
                            </Tooltip>

                        </Space>
                    )}
                />
            </Table>

            <SkillUpdateModal open={openModal} onCancel={() => setOpenModal(false)} record={editingRecord} />
        </>
    )
}