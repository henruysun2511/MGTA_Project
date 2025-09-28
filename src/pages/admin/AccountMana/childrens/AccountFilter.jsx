import { Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/useDebounce';

const { Search } = Input;

export default function AccountFilter({ onFilterChange }) {
    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 500)

    const statusOptions = [
        { value: "", label: "Tất cả" },
        { value: "active", label: "Đã kích hoạt" },
        { value: "inactive", label: "Chưa kích hoạt" }
    ]; 

    useEffect(() => {
            onFilterChange({ username: debouncedSearch });
        }, [debouncedSearch]);

    return (
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm tài khoản (theo username)"
                size='large'
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) => setSearchText(e.target.value) }
            />
            <Space direction='horizontal' size='large'>
                <p>Trạng thái: </p>
                <Select
                    options={statusOptions}
                    size='large'
                    defaultValue={'all'}
                    style={{ width: "200px", fontSize: "18px" }}
                    onChange={(value) => onFilterChange({status: value})}
                />
            </Space>
        </Space>
    );
}