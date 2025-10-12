import {
    DeleteOutlined,
    EditOutlined, SaveOutlined, UploadOutlined
} from '@ant-design/icons';
import { Button, Col, Form, Image, Modal, Row, Spin, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleUpdate, handleUploadImage } from '../../../../../utils/handles';

export default function ExerciseImageList({ exerciseData, onUpdated }) {
    const dispatch = useDispatch();
    const [openEditImageModal, setOpenEditImageModal] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]); // lưu file upload mới
    const [currentImages, setCurrentImages] = useState([]); // ảnh hiện tại từ server
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (exerciseData) {
            setCurrentImages(exerciseData.images || []);
        }
    }, [exerciseData]);


    const handleRemoveImage = (index) => {
        const newImages = [...currentImages];
        newImages.splice(index, 1);
        setCurrentImages(newImages);
    };

    // Upload ảnh mới
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleUpdateImage = async () => {
        const uploadedImages = await handleUploadImage(fileList, setLoading);

        // ép uploadedImages thành mảng
        const newImages = Array.isArray(uploadedImages)
            ? uploadedImages
            : [uploadedImages];

        const mergedImages = [...currentImages, ...newImages];

        const options = {
            title: exerciseData.title,
            unit: exerciseData.unit,
            duration: exerciseData.duration,
            images: mergedImages,
            skillId: (exerciseData.skillId || []).map(s =>
                typeof s === "object" ? s._id : s
            ),
            questions: exerciseData.questions || [],
            totalQuestion: exerciseData.questions?.length || 0
        };
        await handleUpdate(dispatch, "admin/exercise", "exercises", exerciseData._id, options, () => setOpenEditImageModal(false));
    };

    return (
        <>
            <Spin spinning={loading} tip="Đang xử lý...">
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {currentImages.map((img, idx) => (
                        <div key={idx} style={{ position: "relative" }}>
                            <Image width={200} src={img} alt={`image-${idx}`} />
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                style={{ position: "absolute", top: 4, right: 4 }}
                                onClick={() => handleRemoveImage(idx)}
                            />
                        </div>
                    ))}
                    <Button icon={<EditOutlined />} onClick={() => setOpenEditImageModal(true)}>
                        Chỉnh sửa
                    </Button>
                    <Button icon={<SaveOutlined />} onClick={handleUpdateImage} loading={loading}>
                        Lưu
                    </Button>
                </div>
            </Spin>

            <Modal
                title="Sửa ảnh bài tập"
                open={openEditImageModal}
                onCancel={() => setOpenEditImageModal(false)}
                footer={null}
                width={800}
                confirmLoading={loading}
            >
                <Form layout="vertical" form={form} onFinish={handleUpdateImage}>
                    <Form.Item label="Upload ảnh mới">
                        <Upload
                            multiple
                            listType="picture"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={handleUploadChange}
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined />}>Chọn file</Button>
                        </Upload>
                    </Form.Item>

                    <Row gutter={16} justify="end">
                        <Col>
                            <Button type="primary" htmlType="submit">
                                Lưu ảnh
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
