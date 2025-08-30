import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from "antd";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../hooks/usePagination';
import { updateAction } from '../../../../redux/actions/baseAction';
import { updateData } from '../../../../services/baseService';
import { formatDateFromApi } from '../../../../utils/formatDate';
import BlogUpdateModal from './BlogUpdateModal';
import BlogWatchDetailModal from './BlogWatchDetailModal';
const { Column } = Table;

export default function BlogTable({ blogData }) {
    const dataSource = blogData.map((item) => ({
        ...item,
        publishedAt: formatDateFromApi(item.publishedAt)
    }));

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openWatchDetailModal, setOpenWatchDetailModal] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const dispatch = useDispatch();

    const { getPagination, getIndex } = usePagination(10);

    const handleSoftDeleteBlog = async (record) => {
        const response = await updateData("blogs", record.id, {...record, deleted: true});
        if(response){
            dispatch(updateAction("blogs", response));
            alert(`Đã xóa bài viết ${record.title}`);
        }
    }

    return (
        <>
            <Table dataSource={dataSource} pagination={getPagination(dataSource.length)}>
                <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
                <Column title="Tiêu đề" dataIndex="title" key="title" />
                <Column title="Ngày đăng" dataIndex="publishedAt" key="publishedAt" />
                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Tooltip title="Xem chi tiết">
                                <EyeOutlined onClick={() => { setOpenWatchDetailModal(true); setEditingRecord(record); }}/>
                            </Tooltip>
                            <Tooltip title="Chỉnh sửa">
                                <EditOutlined onClick={() => { setOpenUpdateModal(true); setEditingRecord(record); }} />
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <DeleteOutlined onClick={() => { handleSoftDeleteBlog(record) }} />
                            </Tooltip>
                        </Space>
                    )}
                />
            </Table>

            <BlogUpdateModal open={openUpdateModal} onCancel={() => setOpenUpdateModal(false)} record={editingRecord}/>
            <BlogWatchDetailModal open={openWatchDetailModal} onCancel={() => setOpenWatchDetailModal(false)} record={editingRecord}/>
        </>

    )
}