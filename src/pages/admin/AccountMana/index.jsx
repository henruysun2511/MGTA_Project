import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import useFetch from '../../../hooks/useFetch';
import useQuery from '../../../hooks/useQuery';
import { fetchAction } from '../../../redux/actions/baseAction';
import AccountCreateModal from './childrens/AccountCreateModal';
import AccountFilter from './childrens/AccountFilter';
import AccountTable from './childrens/AccountTable';
const { Search } = Input;

export default function AccountMana() {
    const dispatch = useDispatch();

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 8
    });

    const [data] = useFetch("admin/account/accounts", query, {});
    const [studentDataRes] = useFetch("admin/student/students", {}, {});
    const [classDataRes] = useFetch("admin/class/classes", {}, {})

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("accounts", data.items));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (studentDataRes) {
            dispatch(fetchAction("students", studentDataRes?.students?.items));
        }
    }, [studentDataRes, dispatch]);

    useEffect(() => {
        if (classDataRes) {
            dispatch(fetchAction("classes", classDataRes?.classes?.items));
        }
    }, [classDataRes, dispatch]);

    const accountData = useSelector(state => state.accounts.list || [])?.filter(acc => !acc.deleted);
    const studentData = useSelector(state => state.students.list || [])?.filter(st => !st.deleted);
    const classData = useSelector(state => state.classes.list || [])?.filter(cls => !cls.deleted);

    const handleFilterChange = (newFilter) => {
        updateQuery({
            ...newFilter,
            page: 1,
        });
    };

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    return (
        <>
            <div style={padding1}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                    <AccountFilter accountData={accountData} onFilterChange={handleFilterChange} />
                    <div style={{textAlign: 'right'}}>
                        <Button icon={<PlusOutlined/> } type="primary" 
                        onClick={() => setOpenCreateModal(true)}
                        >Thêm tài khoản</Button>
                    </div> 
                    <AccountTable accountData={accountData} studentData={studentData} classData={classData} pagination={data?.pagination}/>
                    
                    {data?.pagination && (
                        <Pagination
                            current={data.pagination.currentPage}
                            pageSize={data.pagination.limit}
                            total={data.pagination.count}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['5', '10', '20', '50']}
                        />
                    )}
                </Space>
            </div>

            <AccountCreateModal open={openCreateModal} onCancel={() => setOpenCreateModal(false)} />

        </>
    )
}