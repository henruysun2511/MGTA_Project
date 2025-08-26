import { Input, Select, Space } from 'antd';

const { Search } = Input;

export default function AccountFilter({ classData, onFilterChange }) {
    const { Search } = Input;

    const statusOptions = [
        { value: "all", label: "Tất cả" },
        { value: "active", label: "Đã kích hoạt" },
        { value: "inactive", label: "Chưa kích hoạt" }
    ];

    const classOptions = [
        { value: "all", label: "Tất cả" },
        ...classData.map(item => ({
            value: item.id,
            label: item.className,
        }))
    ];

    return (
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm tài khoản"
                size='large'
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) => onFilterChange({ type: "keyword", value: e.target.value })}
            />
            <Space direction='horizontal' size='large'>
                <p>Trạng thái: </p>
                <Select
                    options={statusOptions}
                    size='large'
                    defaultValue={'all'}
                    style={{ width: "200px", fontSize: "18px" }}
                    onChange={(value) => onFilterChange({ type: "status", value })}
                />
                <p>Lớp: </p>
                <Select
                    options={classOptions}
                    size='large'
                    defaultValue={'all'}
                    style={{ width: "200px", fontSize: "18px" }}
                    onChange={(value) => onFilterChange({ type: "classId", value })}
                />
            </Space>
        </Space>
    );
}
