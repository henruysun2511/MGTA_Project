import { RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { usePagination } from '../../../../hooks/usePagination';
import RecycleButton from './RecycleButton';
import RecycleFilter from './RecycleFilter';
import { handleRestore, handleRestoreAll } from './RecycleHandle';
const { Column } = Table;

export default function RecycleClassTable({ classData }) {
    const dataSource = classData;
    const dispatch = useDispatch();

    const { getPagination, getIndex } = usePagination(8);
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <RecycleFilter handleRestoreAll={() => handleRestoreAll(dispatch, "class", dataSource)} />
                <RecycleButton dispatch={dispatch} path="classes" list={dataSource} />

                <Table dataSource={dataSource} pagination={getPagination(dataSource.length)}>
                    <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
                    <Column title="Lớp" dataIndex="className" key="className" />
                    <Column title="Thời gian xóa" dataIndex="deletedAt" key="name" />
                    <Column
                        title="Hành động"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Tooltip title="Khôi phục">
                                    <RetweetOutlined onClick={() => handleRestore(dispatch, "classes", record.id, { ...record, deleted: false })} />
                                </Tooltip>
                            </Space>
                        )}
                    />
                </Table>
            </Space>

        </>
    )

}