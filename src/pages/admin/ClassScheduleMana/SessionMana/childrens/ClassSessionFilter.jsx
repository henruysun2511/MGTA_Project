import { Input, Select, Space } from 'antd';
const { Search } = Input;
export default function ClassSessionFilter({ onFilterChange }) {
    const sortOptions = [
        { value: "all", label: "Tất cả" },
        { value: "asc/name", label: "Tên A → Z" },
        { value: "desc/name", label: "Tên Z → A" },
    ];


    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm ca học"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) => onFilterChange({ type: "search", value: e.target.value })}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Sắp xếp:</p>
                    <Select options={sortOptions} onChange={(value) => onFilterChange({ type: "sort", value })} style={{ width: 120 }} defaultValue="all" />
                </div>
            </div>
        </Space>
    </>)
}