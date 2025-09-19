import { DatePicker, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
const { Search } = Input;
const { Option } = Select;

export default function BlogFilter({ onFilterChange }) {
    const options = [
        { value: 'publishedAt', label: 'Mới nhất' },
        { value: '-publishedAt', label: 'Cũ nhất' },
        { value: 'title', label: 'Từ A-Z' },
        { value: '-title', label: 'Từ Z-A' },
    ]

    const [searchText, setSearchText] = useState("");
    const debounceSearch = useDebounce(searchText, 500);

    useEffect(() => {
        onFilterChange({title: debounceSearch});
    }, [debounceSearch]);

    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm bài blog"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                 onChange={(e) => setSearchText(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <Select style={{ width: "250px" }} placeholder="Sắp xếp" options={options} defaultValue={'publishedAt'}
                onChange={(value) => onFilterChange({ sort: value })}
                >
                </Select>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Ngày đăng bài:</p>
                    <DatePicker needConfirm onChange={(date, dateString) => onFilterChange({ publishedAt: dateString })}/>
                </div>
            </div>
        </Space>
    </>)
}