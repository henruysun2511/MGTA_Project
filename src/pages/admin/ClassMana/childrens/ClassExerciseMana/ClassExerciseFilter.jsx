import { DatePicker, Input, Select, Space } from 'antd';
const { Search } = Input;

export default function ClassExerciseFilter() {
   

    const handleChangeSearch = (value) => {
      
    }

    const handleChangeDate = (date, dateString) => {
   ;
    };

    const handleChangeClass = (value) => {
     
    };

    const handleChangeSession = (value) => {
       
    };

    const options = [
        { value: "all", label: "Tất cả" },
        { value: "asc", label: "Tăng dần theo lịch" },
        { value: "desc", label: "Giảm dần theo lịch" },
    ]

    return (<>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                placeholder="Tìm kiếm bài tập"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
                onChange={handleChangeSearch}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Hạn nộp:</p>
                    <DatePicker onChange={handleChangeDate} needConfirm />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px'  }} >
                    <p>Sắp xếp:</p>
                    <Select onChange={handleChangeSession} style={{ width: 120 }} options={options} defaultValue="all" />
                </div>
            </div>
        </Space>
    </>)
}