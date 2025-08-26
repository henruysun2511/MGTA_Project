import { DatePicker, Input, Select, Space } from 'antd';
const { Search } = Input;
const { Option } = Select;

export default function BlogFilter() {
    const options = [
        { value: 'newest', label: 'Mới nhất' },
        { value: 'oldest', label: 'Cũ nhất' },
    ]

    const handleChangeDate = (date, dateString) => {
        console.log(date, dateString);
    }
    
    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm bài blog"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <Select style={{ width: "250px" }} placeholder="Sắp xếp">
                </Select>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Ngày đăng bài:</p>
                    <DatePicker onChange={handleChangeDate} needConfirm />
                </div>
            </div>
        </Space>
    </>)
}