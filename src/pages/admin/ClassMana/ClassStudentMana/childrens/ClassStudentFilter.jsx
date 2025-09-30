import { Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../../hooks/useDebounce';
const { Search } = Input;

export default function ClassStudentFilter({ onFilterChange }) {
    const options = [
        { value: "", label: "Sắp xếp" },
        { value: "name", label: "Theo tên (A-Z)" },
        { value: "-name", label: "Theo tên (Z-A)" },
    ];

    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 500);

    useEffect(() => {
        onFilterChange({ name: debouncedSearch });
    }, [debouncedSearch]);

    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm học sinh"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) =>
                    setSearchText(e.target.value)
                }
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                <Select onChange={(value) => onFilterChange({ sort: value })} style={{ width: 250 }} options={options} defaultValue={""} />
            </div>
        </Space>
    </>)
}