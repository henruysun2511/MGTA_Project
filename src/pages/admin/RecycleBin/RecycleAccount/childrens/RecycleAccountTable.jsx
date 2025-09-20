import { DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { formatDateFromApi } from '../../../../../utils/formatDate';
import { handlePermanentDelete, handleRestore } from '../../../../../utils/handles';
const { Column } = Table;


export default function RecycleAccountTable({ accountData, pagination }) {
    const dataSource = accountData.map((acc, index) => ({
        ...acc,
        key: index,
        deletedAt: formatDateFromApi(acc.deletedBy?.deletedAt) || null,
    }));

    const dispatch = useDispatch();

    const handleRestoreBlog = async (record) => {
        const options = {
            ids: [record._id]
        }
        await handleRestore(dispatch, "admin/account/restore", "deletedaccounts", "", options, record.title);
    }

    const handlePermanentDeleteBlog = async (record) => {
        await handlePermanentDelete(dispatch, "admin/account/delete", "deletedaccounts", record._id, record.username);
    }

    return (
        <>
            <Table dataSource={dataSource} pagination={false}>
                <Column title="STT" key="index" render={(text, record, index) => (((pagination?.currentPage - 1) * pagination?.limit) + index + 1)} />
                <Column title="Username" dataIndex="username" key="name" />
                <Column title="Thời gian xóa" dataIndex="deletedAt" key="name" />
                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
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