import { DatePicker, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../../hooks/useDebounce';
const { Search } = Input;

export default function ClassScheduleFilter({ onFilterChange, classSessionData, classData }) {
    const classOptions = [
        { value: "", label: "Tất cả" },
        ...classData.map((item) => ({
            value: item.className, 
            label: item.className,
        })),
    ]; 

    const classSessionOptions = [
        { value: "", label: "Tất cả" },
        ...classSessionData.map((item) => ({
            value: item.classSessionName, 
            label: item.classSessionName,
        })),
    ];

    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 500);

    useEffect(() => {
        onFilterChange({ className: debouncedSearch });
    }, [debouncedSearch]);

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm lịch học (theo tên lớp)"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Lịch học:</p>
                    <DatePicker
                        onChange={(date, dateString) => onFilterChange({ schedule: dateString })}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Lớp:</p>
                    <Select
                        onChange={(value) => onFilterChange({ className: value })}
                        style={{ width: 160 }}
                        options={classOptions}
                        defaultValue={""}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Ca học:</p>
                    <Select
                        onChange={(value) => onFilterChange({ classSessionName: value })}
                        style={{ width: 160 }}
                        options={classSessionOptions}
                        defaultValue={""}
                    />
                </div>
            </div>
        </Space>
    );
}