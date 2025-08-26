import { UploadOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAction } from '../../../../redux/actions/baseAction';
import { createData } from '../../../../services/baseService';

export default function BlogCreateModal({ open, onCancel }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [content, setContent] = useState("");

   const handleCreateBlog = async (values) => {
    const options = {
      ...values,
      content, 
    };

    const res = await createData("blogs", options);
    if (res) {
      dispatch(createAction("blogs", res));
      alert("Thêm blog mới thành công");
      onCancel();
    } else {
      alert("Thêm blog mới thất bại");
    }
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
            >
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

                    <Form.Item
                        name="tags"
                        label="Thẻ Tags"
                        rules={[{ required: true, message: "Vui lòng nhập ít nhất 1 tag" }]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="Nhập tags và nhấn Enter"
                        />
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