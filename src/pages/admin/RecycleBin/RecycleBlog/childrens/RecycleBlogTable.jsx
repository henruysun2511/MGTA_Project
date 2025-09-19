import { DeleteOutlined, EyeOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../../hooks/usePagination';
import { alertConfirm } from '../../../../../utils/alerts';
import { handleDelete, handleUpdate } from '../../../../../utils/handles';
const { Column } = Table;


export default function RecycleBlogTable({ blogData }) {
    const dataSource = blogData ||  [];
    const dispatch = useDispatch();


    const { getPagination, getIndex } = usePagination(8);

    const handleRestoreBlog = async (record) => {
        const result = await alertConfirm("Khôi phục", `Khôi phục bài blog ${record.title}`, "Xác nhận", "Hủy");
        if(result.isConfirmed){
            const options = {
                ...record,
                deleted: false
            }
            await handleUpdate(dispatch, "admin/blog/deletedBlog", "deletedblog", record._id, options, () => {});
        }
    }

    const handlePermanentDeleteBlog = async (record) => {
        await handleDelete(dispatch, "admin/blog/delete", "deletedblogs", record._id, record.title);
    }

    return (
        <>
            <Table dataSource={dataSource} ppagination={getPagination(dataSource.length)}>
                <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
                <Column title="Tiêu đề" dataIndex="title" key="name" />
                <Column title="Thời gian xóa" dataIndex="deletedAt" key="name" />
                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <Tooltip title="Xem chi tiết">
                                <EyeOutlined onClick={() => console.log('View', record)} />
                            </Tooltip>
                            <Tooltip title="Khôi phục">
                                <RetweetOutlined onClick={() => handleRestoreBlog(record)} />
                            </Tooltip>
                            <Tooltip title="Xóa vĩnh viễn">
                                <DeleteOutlined onClick={() => handlePermanentDeleteBlog(record)} />
                            </Tooltip>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}