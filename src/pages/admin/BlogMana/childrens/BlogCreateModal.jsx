import { UploadOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Modal, Spin, Upload } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentDate } from '../../../../utils/formatDate';
import { handleCreate, handleUploadImage } from '../../../../utils/handles';

export default function BlogCreateModal({ open, onCancel }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateBlog = async (values) => {
        const uploadedUrls = await handleUploadImage(values.images, setLoading);
        const options = {
            ...values,
            content,
            images: uploadedUrls.urls || [uploadedUrls],
            publishedAt: getCurrentDate()
        };
        
        await handleCreate(dispatch,"admin/blog","blogs", options, () => onCancel());
    };

    return (
        <>
            <Modal
                open={open}
                title="Thêm blog mới"
                onCancel={onCancel}
                footer={null}
                width={900}
                height={1000}
                confirmLoading={loading}
            >
                <Spin spinning={loading} tip="Đang xử lý...">
                    <Form form={form} layout="vertical" onFinish={handleCreateBlog}>
                        <Form.Item
                            name="title"
                            label="Tiêu đề"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label="Nội dung"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                            valuePropName="value"
                            getValueFromEvent={(content) => content} // TinyMCE trả về HTML string
                        >
                            <Editor
                                apiKey="rz50e29xhnay1n5yu2vupiadbpxnip0dv2amfgi1zvo3lg8b"
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        "anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount",
                                        "checklist mediaembed casechange formatpainter pageembed a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode advtemplate ai uploadcare mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown importword exportword exportpdf"
                                    ],
                                    toolbar:
                                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                }}
                                onEditorChange={(newValue) => {
                                    setContent(newValue);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="images"
                            label="Ảnh"
                            valuePropName="fileList"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                            getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
                        >
                            <Upload
                                beforeUpload={() => false}
                                accept="image/*"
                                listType="picture"
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <div style={{ textAlign: "right" }}>
                            <Button type="primary" htmlType="submit">
                                Tạo blog
                            </Button>
                        </div>

                    </Form>
                </Spin>
            </Modal>
        </>
    )
}