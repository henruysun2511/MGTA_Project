import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select, Space, Table, message } from 'antd';
import { useState } from 'react';
import padding1 from "../../../components/Padding";

const { Column } = Table;
const { Search } = Input;
const { Option } = Select;

const initialData = [
    {
        key: '1',
        shift: 'Ca sáng (8:00 - 10:00)',
        classroom: 'Lớp 6A1',
        schedule: 'Thứ 2, Thứ 4, Thứ 6',
        zoom: 'https://zoom.us/j/12345678901',
    },
    {
        key: '2',
        shift: 'Ca chiều (14:00 - 16:00)',
        classroom: 'Lớp 6A2',
        schedule: 'Thứ 3, Thứ 5',
        zoom: 'https://zoom.us/j/23456789012',
    },
    {
        key: '3',
        shift: 'Ca tối (19:00 - 21:00)',
        classroom: 'Lớp 6A3',
        schedule: 'Thứ 7, Chủ nhật',
        zoom: 'https://zoom.us/j/34567890123',
    },
];

export default function StudyScheduleMana() {
    const [form] = Form.useForm();
    const [data, setData] = useState(initialData);
    const [modalVisible, setModalVisible] = useState(false);

    const onChangeDate = (date, dateString) => {
        console.log('Filter by date:', dateString);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const handleAddSchedule = () => {
        form.validateFields().then(values => {
            const newItem = {
                key: `${data.length + 1}`,
                shift: values.shift,
                classroom: values.classroom || 'Chưa rõ', // nếu bạn muốn thêm select lớp thì chỉnh
                schedule: values.schedule.format('dddd, DD/MM/YYYY'),
                zoom: values.zoom,
            };
            setData([...data, newItem]);
            setModalVisible(false);
            form.resetFields();
            message.success("Thêm lịch học thành công!");
        });
    };

    return (
        <>
            <div style={padding1}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Search
                        placeholder="Tìm kiếm lịch học"
                        size="large"
                        style={{ width: "100%", fontSize: "18px" }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <p>Lịch học:</p>
                            <DatePicker onChange={onChangeDate} needConfirm />
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                        >
                            Thêm lịch học mới
                        </Button>
                    </div>

                    <Table dataSource={data}>
                        <Column title="STT" key="index" render={(text, record, index) => index + 1} />
                        <Column title="Ca học" dataIndex="shift" key="shift" />
                        <Column title="Lớp" dataIndex="classroom" key="classroom" />
                        <Column title="Lịch" dataIndex="schedule" key="schedule" />
                        <Column title="Link zoom" dataIndex="zoom" key="zoom" />
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
            </div>

            {/* Modal thêm lịch học */}
            <Modal
                open={modalVisible}
                title="Thêm lịch học mới"
                onCancel={() => setModalVisible(false)}
                onOk={handleAddSchedule}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        name="shift"
                        label="Ca học"
                        rules={[{ required: true, message: 'Vui lòng chọn ca học' }]}
                    >
                        <Select placeholder="Chọn ca học">
                            <Option value="Ca 1">Ca 1 (18:00 - 19:30)</Option>
                            <Option value="Ca 2">Ca 1 (19:30 - 21:00)</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="schedule"
                        label="Lịch học"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày học' }]}
                    >
                        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="classroom"
                        label="Lớp"
                        rules={[{ required: true, message: 'Vui lòng nhập link Zoom' }]}
                    >
                        <Select placeholder="Chọn lớp">
                            <Option>6A</Option>
                            <Option>6B</Option>
                            <Option>6C</Option>
                            <Option>6D</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="zoom"
                        label="Link Zoom"
                        rules={[{ required: true, message: 'Vui lòng nhập link Zoom' }]}
                    >
                        <Input placeholder="https://zoom.us/..." />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
