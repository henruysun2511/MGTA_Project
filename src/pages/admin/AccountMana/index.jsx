import { Input, Select, Space } from 'antd';
import padding1 from "../../../components/Padding";
import AccountList from "./AccountList";
const { Search } = Input;

export default function AccountMana() {
    const options = [
        {
            value: 'all',
            label: 'Tất cả'
        },
        {
            value: 1,
            label: 'Đã kích hoạt'
        },
        {
            value: 0,
            label: 'Chưa kích hoạt'
        }
    ];

    const options2 = [
        {
            value: 'all',
            label: 'Tất cả'
        },
        {
            value: '6A',
            label: '6A'
        },
        {
            value: '6B',
            label: '6B'
        },
        {
            value: '7A',
            label: '7A'
        },
        {
            value: '7B',
            label: '7B'
        },
        {
            value: '8A',
            label: '8A'
        },
    ]

    return (
        <>
            <div style={padding1}>
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
                    <Search placeholder="Tìm kiếm tài khoản" size='large' style={{ width: "100%", fontSize: "18px" }} />
                    <Space direction='horizontal' size='large'>
                        <p>Trạng thái: </p>
                        <Select size='large' defaultValue={'all'} options={options} style={{ width: "200px", fontSize: "18px" }}></Select>
                         <p>Lớp: </p><Select size='large' defaultValue={'all'} options={options2} style={{ width: "200px", fontSize: "18px" }}></Select>
                    </Space>
                    <AccountList></AccountList>
                </Space>
            </div>

        </>
    )
}