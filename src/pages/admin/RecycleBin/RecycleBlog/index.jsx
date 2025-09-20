import { DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import { Button, Pagination, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import useQuery from '../../../../hooks/useQuery';
import { fetchAction } from '../../../../redux/actions/baseAction';
import { handleDeleteAll, handleRestoreAll } from '../../../../utils/handles';
import RecycleBlogTable from './childrens/RecycleBlogTable';

export default function RecycleBlog() {
    const dispatch = useDispatch();

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10
    })
    const [data] = useFetch("admin/blog/deletedBlogs", query, {});
    console.log(data);

    const deletedBlog = data.deletedBlogs?.items.map(item => ({
        ...item,
        deleted: true
    }));

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("deletedblogs", deletedBlog));
        }
    }, [data, dispatch]);


    const blogData = useSelector((state) => state.deletedblogs.list || []).filter(blog => blog.deleted);

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    }; 

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Space size="middle">
                        <Button
                            icon={<RetweetOutlined />}
                            type="primary"
                            size="large"
                            onClick={() => handleRestoreAll(dispatch, "admin/blog/restore", "deletedblogs", blogData ? blogData : [])}
                        >
                            Khôi phục tất cả
                        </Button>
                        <Button
                            icon={<DeleteOutlined />}
                            type="primary"
                            danger
                            size="large"
                            onClick={() => handleDeleteAll(dispatch, "admin/blog/delete", "deletedblogs", blogData ? blogData : [])}
                        >
                            Xóa tất cả
                        </Button>
                    </Space>

                <RecycleBlogTable blogData={blogData} pagination={data?.deletedBlogs?.pagination} />

                {data?.deletedBlogs?.pagination && (
                    <Pagination
                        current={data.deletedBlogs.pagination.currentPage}
                        pageSize={data.deletedBlogs.pagination.limit}
                        total={data.deletedBlogs.pagination.count}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20', '50']}
                    />
                )}
            </Space>
        </>
    )
}