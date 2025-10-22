import { Input, Modal, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleCreate, handleUploadImage } from "../../../../utils/handles";

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

  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    const uploadedUrls = await handleUploadImage(exerciseData.images, setLoading);

    const questions = answers.map((item) => ({
      index: item.stt,
      answer: item.dapAn,
    }));

    const options = {
      ...exerciseData,
      unit: Number(exerciseData.unit),
      questions,
      images: uploadedUrls, 
    };

    await handleCreate(dispatch, "admin/exercise", "exercises", options, () => onClose());
  };

  return (
    <Modal
      title="Nhập đáp án"
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      width={600}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Đang xử lý...">
        <Table
          dataSource={answers}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </Spin>
    </Modal>
  );
};

export default ExcerciseKeyModal;
