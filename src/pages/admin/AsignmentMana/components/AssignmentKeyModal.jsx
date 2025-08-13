import { Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createAssignmentAction } from "../../../../redux/actions/assignmentAction";
import { createAssignment } from "../../../../services/asignmentService";

const AssignmentKeyModal = ({ visible, onClose, totalQuestion, assignmentData }) => {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const newAnswers = Array.from({ length: totalQuestion }, (_, index) => ({
      id: index + 1,
      stt: index + 1,
      cauSo: `Câu ${index + 1}`,
      dapAn: "",
    }));
    setAnswers(newAnswers);
  }, [totalQuestion, visible]);

  const handleChange = (value, index) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index].dapAn = value;
      return updated;
    });
  };

  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 80 },
    { title: "Câu số", dataIndex: "cauSo", key: "cauSo", width: 120 },
    {
      title: "Đáp án",
      dataIndex: "dapAn",
      key: "dapAn",
      render: (_, record, index) => (
        <Input
          value={record.dapAn}
          onChange={(e) => handleChange(e.target.value, index)}
          placeholder="Nhập đáp án"
        />
      ),
    },
  ];

  const handleOk = async () => {
    const options = {
      ...assignmentData,
      keys: answers,
    };

    try {
      const response = await createAssignment(options);
      console.log(response);
      if (response) {
        dispatch(createAssignmentAction(response)); // Cập nhật Redux
        alert("Thêm bài tập thành công");
      } else {
        alert("Thêm bài tập thất bại");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm bài tập");
    }

    onClose();
  };

  return (
    <Modal
      title="Nhập đáp án"
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      width={600}
    >
      <Table
        dataSource={answers}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </Modal>
  );
};

export default AssignmentKeyModal;
