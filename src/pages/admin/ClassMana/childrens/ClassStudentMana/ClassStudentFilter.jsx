import { Input, Select, Space } from 'antd';
const { Search } = Input;

export default function ClassStudentFilter({ onFilterChange }) {

    const options = [
        { value: "all", label: "Tất cả" },
        { value: "asc/name", label: "Theo tên (A-Z)" },
        { value: "desc/name", label: "Theo tên (Z-A)" },
    ];

    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm học sinh"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) =>
                    onFilterChange({ type: "keyword", value: e.target.value })
                }
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} >
                    <p>Sắp xếp:</p>
                    <Select onChange={(value) => onFilterChange({ type: "sort", value: value })} style={{ width: 250 }} options={options} defaultValue="all" />
                </div>
            </div>
        </Space>
    </>)
}