import { Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import RecycleButton from '../RecycleButton';
import RecycleAccountTable from './childrens/RecycleAccountTable';

export default function RecycleAccount() {
    const dispatch = useDispatch();

    const [data] = useFetch("admin/account/accounts-deleted", {}, {});
    console.log(data);

    useEffect(() => {
        if(data){
            dispatch(fetchAction("deletedaccounts", data.deletedAccounts?.items));
        }
    }, [data, dispatch]);


    const accountData = useSelector((state) => state.deletedaccounts.list || []) ;
    
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <RecycleButton />
                <RecycleAccountTable accountData={accountData}/>
            </Space>
        </>
    )
}