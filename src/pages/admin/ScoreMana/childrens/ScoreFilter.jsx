import { Input, Select, Space } from "antd";
const { Search } = Input;

export default function ScoreFilter({ classData, exerciseData, onFilterChange }) {
    const sortOptions = [
        { value: "all", label: "Tất cả" },
        { value: "asc/duration", label: "Thời gian nộp tăng dần" },
        { value: "dsc/duration", label: "Thời gian nộp giảm dần" },
        { value: "asc/score", label: "Điểm tăng dần" },
        { value: "dsc/score", label: "Điểm giảm dần" }
    ];

    const classOptions = [
        { value: "all", label: "Tất cả" },
        ...classData.map(item => ({
            value: item.id,
            label: item.className,
        }))
    ];

    const exerciseOptions = [
        { value: "all", label: "Tất cả" },
        ...exerciseData.map(item => ({
            value: item.id,
            label: item.title,
        }))
    ];

    return (
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm điểm số theo tên học sinh"
                size='large'
                style={{ width: "100%", fontSize: "18px" }}
                onChange={(e) => onFilterChange({ type: "search", value: e.target.value })}
            />
            <Space direction='horizontal' size='large'>
                <p>Sắp xếp: </p>
                <Select
                    options={sortOptions}
                    size='large'
                    defaultValue={'all'}
                    style={{ width: "200px", fontSize: "18px" }}
                    onChange={(value) => onFilterChange({ type: "sort", value })}
                />
                <p>Lớp: </p>
                <Select
                    options={classOptions}
                    size='large'
                    defaultValue={'all'}
                    style={{ width: "200px", fontSize: "18px" }}
                    onChange={(value) => onFilterChange({ type: "class", value })}
                />
                <p>Bài tập: </p>
                <Select
                    options={exerciseOptions}
                    size='large'
                    defaultValue={'all'}
                    style={{ width: "200px", fontSize: "18px" }}
                    onChange={(value) => onFilterChange({ type: "exercise", value })}
                />
            </Space>
        </Space>
    )
}
