import { Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createAction } from "../../../../redux/actions/baseAction";
import { createData } from "../../../../services/baseService";


const ExcerciseKeyModal = ({ visible, onClose, totalQuestion, exerciseData }) => {
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
    //Định dạng lại ảnh, đáp án
    // const images = exerciseData.images.map(image => image.name);
    const questions = answers.map(item => ({
      index: item.stt,
      answer: item.dapAn
    }));

    const options = {
      title: exerciseData.title,
      skillId: exerciseData.skillId,
      unit: exerciseData.unit,
      totalTime: exerciseData.totalTime,
      totalQuestion: exerciseData.totalQuestion,
      images: exerciseData.images,
      deleted: false,
      questions: questions,
    };


    const response = await createData("exercises", options);
    if (response) {
      alert("Thêm bài tập thành công");
      dispatch(createAction("exercises", response));
      onClose();
    }
    else {
      alert("Thêm bài tập thất bại");
    }  
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

export default ExcerciseKeyModal;
