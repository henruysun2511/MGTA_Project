import { DeleteOutlined, EyeOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { formatDateFromApi } from "../../../../../utils/formatDate";
import { handlePermanentDelete, handleRestore } from '../../../../../utils/handles';
const { Column } = Table;


export default function RecycleBlogTable({ blogData, pagination }) {
    const dataSource = blogData.map((blog, index) => ({
        ...blog,
        key: index, 
        deletedAt: formatDateFromApi(blog.deletedBy?.[0]?.deletedAt) || null, 
    }));


    const dispatch = useDispatch();

    const handleRestoreBlog = async (record) => {
            const options = {
                ids: [record._id]
            }
            await handleRestore(dispatch,"admin/blog/restore", "deletedblogs","", options, record.title );
    }

    const handlePermanentDeleteBlog = async (record) => {
        await handlePermanentDelete(dispatch, "admin/blog/delete", "deletedblogs", record._id, record.title);
    }

    return (
        <>
            <Table dataSource={dataSource} pagination={false}>
                <Column title="STT" key="index" render={(text, record, index) => (((pagination?.currentPage - 1) * pagination?.limit) + index + 1)}/>
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