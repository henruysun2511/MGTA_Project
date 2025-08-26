import { DatePicker, Input, Select, Space } from 'antd';
const { Search } = Input;

export default function ClassExerciseFilter({onFilterChange}) {
   
    const options = [
        { value: "all", label: "Tất cả" },
        { value: "asc/date", label: "Tăng dần theo lịch" },
        { value: "desc/date", label: "Giảm dần theo lịch" },
    ]

    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm bài tập"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) => onFilterChange({type: "keyword", value: e.target.value})}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Hạn nộp:</p>
                    <DatePicker onChange={(value) => onFilterChange({type: "date", value: value})} needConfirm />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px'  }} >
                    <p>Sắp xếp:</p>
                    <Select onChange={(value) => onFilterChange({type: "sort", value: value})} style={{ width: 120 }} options={options} defaultValue="all" />
                </div>
            </div>
        </Space>
    </>)
}