import { UploadOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';

export default function BlogUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const [content, setContent] = useState("");

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                title: record.title,
                content: record.content,
                images: record.images,
            });
            setContent(record.content || "");
        }
    }, [open, record, form]);

    return (
        <>
            <Modal
                open={open}
                title="Thêm blog mới"
                onCancel={onCancel}
                footer={null}
                width={900}
                height={1000}
            >
                <Form layout="vertical"  form={form}>
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
                            value={content}
                            onEditorChange={(newValue) => {
                                setContent(newValue);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="images"
                        label="Ảnh"
                        valuePropName="fileList"
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
            </Modal>
        </>
    )
}