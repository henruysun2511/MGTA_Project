import { Table, Tabs } from 'antd';
import padding1 from "../../../../components/Padding";

const answerColumns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Câu số',
    dataIndex: 'cauSo',
    key: 'cauSo',
  },
  {
    title: 'Đáp án',
    dataIndex: 'dapAn',
    key: 'dapAn',
  },
];

const scoreColumns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên học sinh',
    dataIndex: 'ten',
    key: 'ten',
  },
  {
    title: 'Lớp',
    dataIndex: 'lop',
    key: 'lop',
  },
  {
    title: 'Điểm',
    dataIndex: 'diem',
    key: 'diem',
  },
];

// Dữ liệu mẫu
const answerData = Array.from({ length: 12 }, (_, i) => ({
  key: i + 1,
  stt: i + 1,
  cauSo: `Câu ${i + 1}`,
  dapAn: i < 10 ? ['A', 'B', 'C', 'D'][i % 4] : `Tự luận ${i + 1}`,
}));

const scoreData = [
  {
    key: 1,
    stt: 1,
    ten: 'Nguyễn Văn A',
    lop: '6A1',
    diem: 8.5,
  },
  {
    key: 2,
    stt: 2,
    ten: 'Trần Thị B',
    lop: '6A2',
    diem: 9.0,
  },
  {
    key: 3,
    stt: 3,
    ten: 'Lê Văn C',
    lop: '6A1',
    diem: 7.5,
  },
];

const onChange = (key) => {
  console.log("Tab changed:", key);
};

export default function AsignmentDetailMana() {
  const items = [
    {
      key: '1',
      label: 'Đáp án',
      children: <div style={{padding: "0 150px"}}><Table dataSource={answerData} columns={answerColumns} pagination={false} /></div>,
    },
    {
      key: '2',
      label: 'Điểm',
      children: <div style={{padding: "0 150px"}}><Table dataSource={scoreData} columns={scoreColumns} pagination={false} /></div>,
    },
  ];

  return (
    <div style={padding1}>
      <div className="practice">
        <h1>LUYỆN KĨ NĂNG ĐỌC HIỂU</h1>
        <p>Ngày đăng: 01/08/2025</p>
        <div className="flex">
          <div>
            <h3>Thông tin chung</h3>
            <div className="inner-icon">
              <i className="fa-solid fa-users"></i>
              <p>Đối tượng: Lớp 6</p>
            </div>
            <div className="inner-icon">
              <i className="fa-solid fa-clock"></i>
              <p>Thời gian làm bài: 40 phút</p>
            </div>
            <div className="inner-icon">
              <i className="fa-solid fa-circle-question"></i>
              <p>Số lượng câu hỏi: 50 câu hỏi</p>
            </div>
          </div>
          <div>
            <h3>Dạng bài</h3>
            <div className="practice-tag">
              <p>#Đọc hiểu</p>
              <p>#Điền từ</p>
              <p>#Viết lại câu</p>
            </div>
          </div>
          <div>
            <h3>Chi tiết câu hỏi:</h3>
            <p className="p1">Câu trắc nghiệm: 40 câu</p>
            <p className="p1">Câu điền đáp án: 10 câu</p>
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
