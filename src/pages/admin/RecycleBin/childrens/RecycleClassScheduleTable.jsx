import { DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from 'antd';
import { useDispatch } from "react-redux";
import { usePagination } from '../../../../hooks/usePagination';
import RecycleButton from './RecycleButton';
import RecycleFilter from './RecycleFilter';
import { handleRestore } from './RecycleHandle';
const { Column } = Table;

export default function RecycleClassScheduleTable({ classScheduleData, classData, classSessionData }) {
    const dataSource = classScheduleData.map((item) => {
        const classById = classData.find(
            (cls) => String(cls.id) === String(item.classId)
        );
        const classSessionById = classSessionData.find(
            (cls) => String(cls.id) === String(item.classSessionId)
        );

        return {
            ...item,
            className: classById ? classById.className : "Chưa có lớp",
            classSessionName: classSessionById ? classSessionById.name : "Chưa có ca học",
        };
    });

    console.log(dataSource);



    const dispatch = useDispatch();


    const { getPagination, getIndex } = usePagination(8);
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <RecycleFilter />
                <RecycleButton dispatch={dispatch} path="classschedules" list={dataSource} />
                <Table dataSource={dataSource} ppagination={getPagination(dataSource.length)}>
                    <Column title="STT" key="index" render={(text, record, index) => getIndex(index)} />
                    <Column title="Lịch học" dataIndex="schedule" key="name" />
                    <Column title="Ca học" dataIndex="classSessionName" key="name" />
                    <Column title="Lớp" dataIndex="className" key="name" />
                    <Column title="Thời gian xóa" dataIndex="deletedAt" key="name" />
                    <Column
                        title="Hành động"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Tooltip title="Khôi phục">
                                    <RetweetOutlined onClick={() => handleRestore(dispatch, "accounts", record.id, { ...record, deleted: false })} />
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