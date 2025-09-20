import { DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import { Button, Pagination, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import useQuery from '../../../../hooks/useQuery';
import { fetchAction } from '../../../../redux/actions/baseAction';
import { handleDeleteAll, handleRestoreAll } from '../../../../utils/handles';
import RecycleAccountTable from './childrens/RecycleAccountTable';

export default function RecycleAccount() {
    const dispatch = useDispatch();

    const [query, updateQuery, setQuery] = useQuery({
        page: 1,
        limit: 10
    })
    const [data] = useFetch("admin/account/accounts-deleted", query, {});
    console.log(data);

    const deletedAccount = data.items ? data.items.map(item => ({
        ...item,
        deleted: true
    })) : [];

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("deletedaccounts", deletedAccount));
        }
    }, [data, dispatch]);


    const accountData = useSelector((state) => state.deletedaccounts.list || []);
    console.log(accountData);
    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Space size="middle" >
                    <Button
                        icon={<RetweetOutlined />}
                        type="primary"
                        size="large"
                        onClick={() => handleRestoreAll(dispatch, "", "", list)}
                    >
                        Khôi phục tất cả
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        danger
                        size="large"
                        onClick={() => handleDeleteAll(dispatch, "", "", list)}
                    >
                        Xóa tất cả
                    </Button>
                </Space>
                
                <RecycleAccountTable accountData={accountData} pagination={data?.pagination} />

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
        </>
    )
}