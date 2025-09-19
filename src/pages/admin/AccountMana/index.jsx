import { Input, Pagination, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import useFetch from '../../../hooks/useFetch';
import useQuery from '../../../hooks/useQuery';
import { fetchAction } from '../../../redux/actions/baseAction';
import AccountFilter from './childrens/AccountFilter';
import AccountTable from './childrens/AccountTable';
const { Search } = Input;

export default function AccountMana() {
    const dispatch = useDispatch();

    const [query, updateQuery, setQuery] = useQuery({
        page: 1,
        limit: 8
    });

    const [data] = useFetch("admin/account/accounts", query, {});
    console.log(data);
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

    const [filters, setFilters] = useState({
        keyword: "",
        status: "all",
        classId: "all"
    });

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

        </>
    )
}