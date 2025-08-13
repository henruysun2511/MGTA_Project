import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    fullName: 'Đặng Nhật Huy',
    classroom: '6A',
    email: 'huysun2511@gmail.com',
    phone: '0362832880',
    status: 0,
  },
  {
    key: '2',
    fullName: 'Nguyễn Thị Mai',
    classroom: '6B',
    email: 'mainguyen@gmail.com',
    phone: '0388123456',
    status: 1,
  },
  {
    key: '3',
    fullName: 'Trần Văn Nam',
    classroom: '6C',
    email: 'namtran@gmail.com',
    phone: '0399111222',
    status: 0,
  },
  {
    key: '4',
    fullName: 'Lê Thị Hương',
    classroom: '6A',
    email: 'huongle@gmail.com',
    phone: '0377223344',
    status: 1,
  },
  {
    key: '5',
    fullName: 'Phạm Anh Tuấn',
    classroom: '6B',
    email: 'tuanpham@gmail.com',
    phone: '0366677889',
    status: 0,
  },
  {
    key: '6',
    fullName: 'Hoàng Mỹ Linh',
    classroom: '6C',
    email: 'linhhoang@gmail.com',
    phone: '0355123123',
    status: 1,
  },
  {
    key: '7',
    fullName: 'Bùi Quang Huy',
    classroom: '6A',
    email: 'huybui@gmail.com',
    phone: '0388777666',
    status: 0,
  },
  {
    key: '8',
    fullName: 'Đỗ Minh Châu',
    classroom: '6B',
    email: 'chaudo@gmail.com',
    phone: '0399333222',
    status: 1,
  },
];

export default function AccountList() {
    return (
        <>
            <Table dataSource={data}>
                <Column title="STT" key="index" render={(text, record, index) => index + 1} />
                <Column title="Họ và tên" dataIndex="fullName" key="fullName" />
                <Column title="Lớp" dataIndex="classroom" key="classroom" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Số điện thoại (PH)" dataIndex="phone" key="phone" />
                <Column
                    title="Hành động"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <EyeOutlined onClick={() => console.log('View', record)} />
                            <EditOutlined onClick={() => console.log('Edit', record)} />
                            <DeleteOutlined onClick={() => console.log('Delete', record)} />
                        </Space>
                    )}
                />

                <Column
                    title="Trạng thái"
                    dataIndex="status"
                    key="status"
                    render={(status, record) => (
                        <Button
                            type={status ? 'default' : 'primary'}
                            onClick={() => console.log('Kích hoạt', record)}
                        >
                            {status ? 'Đã kích hoạt' : 'Kích hoạt'}
                        </Button>
                    )}
                />
            </Table>
        </>
    )
}