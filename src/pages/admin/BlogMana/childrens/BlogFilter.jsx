import { DatePicker, Input, Select, Space } from 'antd';
const { Search } = Input;
const { Option } = Select;

export default function BlogFilter({ onFilterChange }) {
    const options = [
        { value: 'newest', label: 'Mới nhất' },
        { value: 'oldest', label: 'Cũ nhất' },
    ]

    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm bài blog"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                 onChange={(e) => onFilterChange({ search: e.target.value })}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <Select style={{ width: "250px" }} placeholder="Sắp xếp" options={options} defaultValue={'newest'}
                onChange={(value) => onFilterChange({ sort: value })}
                >
                </Select>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Ngày đăng bài:</p>
                    <DatePicker needConfirm onChange={(date, dateString) => onFilterChange({ date: dateString })}/>
                </div>
            </div>
        </Space>
    </>)
}