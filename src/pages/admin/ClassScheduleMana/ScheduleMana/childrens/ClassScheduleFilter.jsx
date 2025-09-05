import { DatePicker, Input, Select, Space } from 'antd';
const { Search } = Input;
export default function ClassScheduleFilter({ classData, classSessionData, onFilterChange }) {
    const classOptions = [
        { value: "all", label: "Tất cả" },
        ...classData.map((item) => ({
            value: item.id,
            label: item.className,
        })),
    ];

    const classSessionOptions = [
        { value: "all", label: "Tất cả" },
        ...classSessionData.map((item) => ({
            value: item.id,
            label: item.name,
        })),
    ];

    const handleChangeSearch = (value) => {
        onFilterChange({ keyword: value.target.value })
    }

    const handleChangeDate = (date, dateString) => {
        onFilterChange({ date: dateString });
    };

    const handleChangeClass = (value) => {
        onFilterChange({ classId: value });
    };

    const handleChangeSession = (value) => {
        onFilterChange({ classSessionId: value });
    };

    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm lịch học (theo link zoom)"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                onChange={handleChangeSearch}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Lịch học:</p>
                    <DatePicker onChange={handleChangeDate} needConfirm />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Lớp:</p>
                    <Select onChange={handleChangeClass} style={{ width: 120 }} options={classOptions} defaultValue="all"/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px'  }} >
                    <p>Ca học:</p>
                    <Select onChange={handleChangeSession} style={{ width: 120 }} options={classSessionOptions} defaultValue="all" />
                </div>
            </div>
        </Space>
    </>)
}