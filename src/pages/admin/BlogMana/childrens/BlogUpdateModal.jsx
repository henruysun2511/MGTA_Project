import { UploadOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Modal, Spin, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { getCurrentDate } from '../../../../utils/formatDate';
import { handleUpdate, handleUploadImage } from '../../../../utils/handles';

export default function BlogUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const id = record?._id ? record._id : "";

    const [blogDataById] = useFetch(`admin/blog/blog-detail/${id}`, {}, {});

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                title: record.title || "",
                content: blogDataById?.content || record.content || "",
                images: blogDataById?.images?.map((img, index) => ({
                    uid: String(index),
                    name: `image-${index}`,
                    status: "done",
                    url: img,
                })) || [],
            });
            setContent(blogDataById?.content || record.content || "");
        }
    }, [open, record, blogDataById, form]);

    const handleUpdateBlog = async (values) => {
        //Ảnh cũ là url
        const oldImages = values.images
            ?.filter(file => !!file.url)
            .map(file => file.url);

        //Ảnh mới là filelist
        const newFiles = values.images
            ?.filter(file => file.originFileObj);

        let newImageUrls = [];
        if (newFiles.length > 0) {
            const uploaded = await handleUploadImage(newFiles, setLoading);
            newImageUrls = uploaded.urls || [uploaded];
        }

        const options = {
            ...values,
            content: content || values.content,
            publishedAt: getCurrentDate(),
            images: [...oldImages, ...newImageUrls], // giữ ảnh cũ + thêm mới
        };
        console.log(options)
        await handleUpdate(dispatch, "admin/blog", "blogs", record._id, options, () => onCancel());

    }
    return (
        <>
            <Modal
                open={open}
                title="Chỉnh sửa blog"
                onCancel={onCancel}
                footer={null}
                width={900}
                height={1000}
                confirmLoading={loading}
            >
                <Spin spinning={loading} tip="Đang xử lý">
                    <Form layout="vertical" form={form} onFinish={handleUpdateBlog}>
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
                            getValueFromEvent={(content) => content}
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
                                Lưu
                            </Button>
                        </div>

                    </Form>
                </Spin>
            </Modal>
        </>
    )
}