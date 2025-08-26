import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tooltip } from "antd";
import { formatDateFromApi } from '../../../../utils/formatDate';
const { Column } = Table;

export default function BlogTable({ blogData }) {
    const dataSource = blogData.map((item) => ({
        ...item,
        publishedAt: formatDateFromApi(item.publishedAt)
    }));

    console.log(blogData);
    return (
        <Table dataSource={dataSource}>
            <Column title="STT" key="index" render={(text, record, index) => index + 1} />
            <Column title="Tiêu đề" dataIndex="title" key="title" />
            <Column title="Ngày đăng" dataIndex="publishedAt" key="publishedAt" />
            <Column
                title="Hành động"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <Tooltip title="Xem chi tiết">
                            <EyeOutlined />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <EditOutlined onClick={() => console.log('Edit', record)} />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <DeleteOutlined onClick={() => console.log('Delete', record)} />
                        </Tooltip>
                    </Space>
                )}
            />
        </Table>
    )
}