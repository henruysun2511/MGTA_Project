import { DeleteOutlined, EyeOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../hooks/usePagination';
import RecycleButton from './RecycleButton';
import RecycleFilter from './RecycleFilter';
import { handleRestore } from './RecycleHandle';
const { Column } = Table;


export default function RecycleAccountTable({ accountData, studentData }) {
    const dataSource = accountData;
    const dispatch = useDispatch();


    const { getPagination, getIndex } = usePagination(8);
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <RecycleFilter />
                <RecycleButton dispatch={dispatch} path="accounts" list={dataSource}/>
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
                                    <RetweetOutlined onClick={() => handleRestore(dispatch, "accounts", record.id, {...record, deleted: false})                                                              }/>
                                </Tooltip>
                                <Tooltip title="Xóa vĩnh viễn">
                                    <DeleteOutlined onClick={() => console.log('Delete', record)} />
                                </Tooltip>
                            </Space> 
                        )}
                    />

                </Table>
            </Space>
        </>
    )

}