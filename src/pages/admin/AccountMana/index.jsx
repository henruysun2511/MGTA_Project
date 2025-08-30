import { Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import { fetchAction } from '../../../redux/actions/baseAction';
import { getAllData } from '../../../services/baseService';
import AccountFilter from './childrens/AccountFilter';
import AccountTable from './childrens/AccountTable';
const { Search } = Input;

export default function AccountMana() {
    const dispatch = useDispatch();

    useEffect(() => {
        // getAllData("api/v1/admin/account/accounts").then((res) => {
        //     console.log(res);
        //     dispatch(fetchAction("accounts", res.data.data))
        // });
        getAllData("accounts").then((res) => dispatch(fetchAction("accounts", res)));
        getAllData("students").then((res) => dispatch(fetchAction("students", res)));
        getAllData("classes").then((res) => dispatch(fetchAction("classes", res)));
    }, [dispatch]);


    const accountData = useSelector(state => state.accounts.list).filter(acc => !acc.deleted);

    const studentData = useSelector(state => state.students.list).filter(st => !st.deleted);
        console.log(studentData);
    const classData = useSelector(state => state.classes.list).filter(cl => !cl.deleted);

    const [filters, setFilters] = useState({
        keyword: "",
        status: "all",
        classId: "all"
    });

    const handleFilterChange = ({ type, value }) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const filteredAccounts = (accountData ?? []).filter(acc => {
        // lọc theo keyword
        if (filters.keyword && !acc.username.toLowerCase().includes(filters.keyword.toLowerCase())) {
            return false;
        }
        // lọc theo trạng thái
        if (filters.status !== "all") {
            if (acc.status !== filters.status) return false;
        }
        // lọc theo lớp
        if (filters.classId !== "all") {
            const student = studentData.find(st => st.accountId === acc.id);
            if (!student || String(student.classId) !== String(filters.classId)) {
                return false;
            }
        }
        return true;
    });


    return (
        <>
            <div style={padding1}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                    <AccountFilter classData={classData} accountData={accountData} onFilterChange={handleFilterChange} />
                    <AccountTable accountData={filteredAccounts} studentData={studentData} classData={classData} />
                </Space>
            </div>

        </>
    )
}