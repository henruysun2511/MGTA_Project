import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
    Upload
} from 'antd';
import { useState } from 'react';
import padding1 from "../../../components/Padding";
const { Search } = Input;

const { Column } = Table;
const { TextArea } = Input;

export default function BlogMana() {
    const [form] = Form.useForm();
    const [blogs, setBlogs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const handleCancel = () => {
        setModalVisible(false);
        form.resetFields();
    };

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

    return (
        <div style={padding1}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Search
                    placeholder="Tìm kiếm bài blog"
                    size="large"
                    style={{ width: "100%", fontSize: "18px" }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Select style={{width: "250px"}}>
                        <Option>Sắp xếp theo ngày đăng</Option>
                    </Select>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                    >
                        Thêm blog mới
                    </Button>
                </div>

                <Table dataSource={blogs}>
                    <Column title="STT" key="index" render={(text, record, index) => index + 1} />
                    <Column title="Tiêu đề" dataIndex="title" key="title" />
                    <Column title="Nội dung" dataIndex="content" key="content" />
                    <Column title="Ảnh" dataIndex="image" key="image" />
                    <Column title="Ngày đăng" dataIndex="date" key="date" />
                    <Column
                        title="Hành động"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <EditOutlined onClick={() => console.log('Edit', record)} />
                                <DeleteOutlined onClick={() => console.log('Delete', record)} />
                            </Space>
                        )}
                    />
                </Table>
            </Space>

            {/* Modal thêm blog */}
            <Modal
                open={modalVisible}
                title="Thêm blog mới"
                onCancel={handleCancel}
                onOk={handleAddBlog}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
                    >
                        <Upload
                            maxCount={1}
                            beforeUpload={() => false} // Không upload lên server
                            accept="image/*"
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="date"
                        label="Ngày đăng"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày đăng' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
