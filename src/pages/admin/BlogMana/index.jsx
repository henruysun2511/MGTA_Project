import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    message,
    Space
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import { fetchAction } from '../../../redux/actions/baseAction';
import { getAllData } from '../../../services/baseService';
import BlogCreateModal from './childrens/BlogCreateModal';
import BlogFilter from './childrens/BlogFilter';
import BlogTable from './childrens/BlogTable';



export default function BlogMana() {
    const [form] = Form.useForm();
    const [blogs, setBlogs] = useState([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleAddBlog = () => {
        form.validateFields().then(values => {
            const newBlog = {
                key: blogs.length + 1,
                title: values.title,
                content: values.content,
                image: values.image?.[0]?.name || 'Không có ảnh',
                date: values.date.format('DD/MM/YYYY'),
            };
            setBlogs([...blogs, newBlog]);
            setModalVisible(false);
            form.resetFields();
            message.success("Đã thêm blog mới!");
        });
    };
    const dispatch = useDispatch();

    useEffect(() => {
        getAllData("blogs").then((res) => {dispatch(fetchAction("blogs", res)); });
    }, [dispatch]);

    const blogData = useSelector((state) => state.blogs.list).filter(item => item.status !== 'deleted');

    return (
        <div style={padding1}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <BlogFilter />
                
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

               <BlogTable blogData={blogData} />
            </Space>

            {/* Modal thêm blog */}
            <BlogCreateModal open={openCreateModal} onCancel={() => setOpenCreateModal(false)} />
        </div>
    );
}
