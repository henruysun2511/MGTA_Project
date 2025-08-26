import { Modal, Table } from 'antd';
const { Column } = Table;

export default function ScoreWatchDetailModal({ open, onCancel, record }) {
    console.log(record);

    if (!record) {
        return (
            <Modal
                title="Chi tiết điểm"
                open={open}
                onCancel={onCancel}
                footer={null}
            >
                <p>Không có dữ liệu để hiển thị</p>
            </Modal>
        );
    }

    return (
        <Modal
            title={`Chi tiết điểm của học sinh: ${record.studentName}`}
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <p>Họ và tên: {record ? record.studentName : "N/A"}</p>
            <p>Lớp: {record ? record.className : "N/A"}</p>
            <p>Bài tập: {record ? record.exerciseTitle : "N/A"}</p>
            <p>Thời gian làm bài: {record ? record.duration : "N/A"}</p>
            <p>Nộp lúc: {record ? record.endTime : "N/A"}</p>
            <p>Điểm số: {record ? record.score : "N/A"}</p>
            <p>Số câu đúng: {record ? record.correctCount : "N/A"}</p>
            <p>Số câu sai: {record ? record.incorrecCount : "N/A"}</p>
            <p>Câu trả lời: </p>
            {record.answers.map((as) => (
                as.isCorrect === true ? 
                <p key={as.index}>{as.index}: {as.studentAnswer} </p>
                : <p key={as.index}>{as.index}: <del>{as.studentAnswer} </del>{as.correctAnswer}</p>
            ))}


        </Modal>
    );
}
