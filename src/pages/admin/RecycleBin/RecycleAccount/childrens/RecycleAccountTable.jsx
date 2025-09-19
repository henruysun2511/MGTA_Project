import { DeleteOutlined, EyeOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../../hooks/usePagination';
const { Column } = Table;


export default function RecycleAccountTable({ accountData }) {
    const dataSource = accountData || [];
    const dispatch = useDispatch();

    const { getPagination, getIndex } = usePagination(8);

    const handleRestoreAccount = async (record) => {
            const result = await alertConfirm("Khôi phục", `Khôi phục tài khoản ${record.username}`, "Xác nhận", "Hủy");
            if(result.isConfirmed){
                const options = {
                    ...record,
                    deleted: false
                }
                await handleUpdate(dispatch,"admin/account/restore", "deletedaccounts", record._id, options, () => {});
            }
        }
    
        const handlePermanentDeleteAccount = async (record) => {
            await handleDelete(dispatch, "admin/blog/delete", "deletedaccounts", record._id, record.title);
        }

    return (
        <>
            <Table dataSource={dataSource} ppagination={getPagination(dataSource.length)}>
                <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
                <Column title="Username" dataIndex="username" key="name" />
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
                                <RetweetOutlined onClick={() => handleRestoreAccount(record) }/>
                            </Tooltip>
                            <Tooltip title="Xóa vĩnh viễn">
                                <DeleteOutlined onClick={() => handlePermanentDeleteAccount(record)} />
                            </Tooltip>
                        </Space>
                    )}
                />
            </Table>
        </>
    )

}