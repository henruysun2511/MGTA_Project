import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Pagination,
    Space
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import useFetch from '../../../hooks/useFetch';
import useQuery from '../../../hooks/useQuery';
import { fetchAction } from '../../../redux/actions/baseAction';
import "./blogMana.scss";
import BlogCreateModal from './childrens/BlogCreateModal';
import BlogFilter from './childrens/BlogFilter';
import BlogTable from './childrens/BlogTable';

export default function BlogMana() {
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const dispatch = useDispatch();

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10
    })
    const [data] = useFetch("admin/blog/blogs", query, {});

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("blogs", data?.blogActives?.items));
        }
    }, [data, dispatch]);

    const blogData = useSelector((state) => state.blogs.list || []);
    console.log(blogData);

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
        <div style={padding1}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <BlogFilter onFilterChange={(handleFilterChange)} />

                <div style={{ textAlign: 'right' }}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => setOpenCreateModal(true)}
                    >
                        Thêm blog mới
                    </Button>
                </div>

                <BlogTable blogData={blogData} pagination={data?.blogActives?.pagination} />

                {data?.blogActives?.pagination && (
                    <Pagination
                        current={data.blogActives.pagination.currentPage}
                        pageSize={data.blogActives.pagination.limit}
                        total={data.blogActives.pagination.count}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['5', '10', '20', '50']}
                    />
                )}
            </Space>

            {/* Modal thêm blog */}
            <BlogCreateModal open={openCreateModal} onCancel={() => setOpenCreateModal(false)} />
        </div>
    );
}
