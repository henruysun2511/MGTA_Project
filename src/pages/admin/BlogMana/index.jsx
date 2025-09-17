import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Pagination,
    Space
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import useFetch from '../../../hooks/useFetch';
import useQuery from '../../../hooks/useQuery';
import { fetchAction } from '../../../redux/actions/baseAction';
import { formatDateFromApi } from '../../../utils/formatDate';
import "./blogMana.scss";
import BlogCreateModal from './childrens/BlogCreateModal';
import BlogFilter from './childrens/BlogFilter';
import BlogTable from './childrens/BlogTable';

export default function BlogMana() {
    const [form] = Form.useForm();
    const [blogs, setBlogs] = useState([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const dispatch = useDispatch();

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10
    })
    const [data] = useFetch("admin/blog/blogs", query, {});
    console.log(data);

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("blogs", data?.blogActives?.items));
        }
    }, [data, dispatch]);

    const blogData = useSelector((state) => state.blogs.list || []);
    console.log(blogData);

    // Lọc + sắp xếp
    const [filters, setFilters] = useState({ search: "", sort: "newest", date: "" });

    const filteredBlogs = blogData
        .filter(blog => {
            const matchSearch = filters.search
                ? blog.title.toLowerCase().includes(filters.search.toLowerCase())
                : true;

            const matchDate = filters.date
                ? blog.publishedAt?.startsWith(filters.date)
                : true;

            return matchSearch && matchDate;
        })
        .sort((a, b) => {
            if (filters.sort === "newest") {
                return new Date(formatDateFromApi(b.publishedAt)) - new Date(a.publishedAt);
            } else {
                return new Date(a.publishedAt) - new Date(b.publishedAt);
            }
        });

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    return (
        <div style={padding1}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <BlogFilter onFilterChange={(f) => setFilters({ ...filters, ...f })} />

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

                <BlogTable blogData={filteredBlogs} pagination={data?.blogActives?.pagination} />

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
