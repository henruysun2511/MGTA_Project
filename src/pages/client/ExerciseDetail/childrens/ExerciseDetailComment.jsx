import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import { handleCreate, handleDelete, handleUpdate } from '../../../../utils/handles';


export default function ExerciseDetailComment({ exerciseId }) {
    const dispatch = useDispatch();
    const accountId = localStorage.getItem("accountId");
    const roleId = localStorage.getItem("roleId");
    const roleEnv = import.meta.env.VITE_ROLE_ID;

    const [form] = Form.useForm();
    const [data] = useFetch(`comment/comments/${exerciseId}`, {}, {});
    const commentData = useSelector(state => state.comments.list || []);

    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("comments", data));
        }
    }, [data, dispatch]);

    const handleComment = async (values) => {
        if (editingComment) {
            const options = {
                exerciseId,
                content: values.content,
                accountId
            };
            console.log(options)
            if (roleId === roleEnv) {
                await handleUpdate(dispatch, "admin/comment", "comments", editingComment._id, options, () => {
                    form.resetFields();
                    setEditingComment(null);
                });
            } else {
                await handleUpdate(dispatch, "comment", "comments", editingComment._id, options, () => {
                    form.resetFields();
                    setEditingComment(null);
                });
            }
        } else {
            const options = {
                exerciseId,
                content: values.content,
                accountId
            };
            await handleCreate(dispatch, "comment", "comments", options, () => {
                form.resetFields();
            });
        }
    };

    const handleDeleteComment = async (cmt) => {
        if (roleId === roleEnv) {
            await handleDelete(dispatch, "admin/comment", "comments", cmt._id, `bình luận ${cmt.content}`);
        } else {
            await handleDelete(dispatch, "comment", "comments", cmt._id, `bình luận ${cmt.content}`);
        }
    };

    const handleEditComment = (cmt) => {
        setEditingComment(cmt);
        form.setFieldsValue({ content: cmt.content });
    };

    return (
        <div className="comment">
            <h3>Bình luận</h3>
            <Form form={form} layout="vertical" onFinish={handleComment}>
                <Row>
                    <Col span={22}>
                        <Form.Item name="content" rules={[{ required: true, message: "Không được để trống" }]}>
                            <Input size="large" placeholder="Cảm xúc của em sau khi làm bài" />
                        </Form.Item>
                    </Col>
                    <Col span={2} style={{ textAlign: "right" }}>
                        <Button size="large" type="primary" htmlType="submit">
                            {editingComment ? "Cập nhật" : "Gửi"}
                        </Button>
                    </Col>
                </Row>
            </Form>

            {commentData && commentData.length > 0 ? (
                commentData.map((cmt, index) => (
                    <div className="comment__user" key={index}>
                        <div className="comment__image">
                            <img
                                src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"
                                alt=""
                            />
                        </div>
                        <div className="comment__info">
                            <div className="comment__name">{cmt.accountId?.username || "Ẩn danh"}</div>
                            <div className="comment__content">{cmt.content || ""}</div>

                            <div className="comment__actions">
                                {(cmt.accountId?._id === accountId || cmt.accountId === accountId) && (
                                    <>
                                        <p onClick={() => handleEditComment(cmt)}>Chỉnh sửa</p>
                                        <p onClick={() => handleDeleteComment(cmt)}>Xóa</p>
                                    </>
                                )}

                                {editingComment && <>
                                    <p onClick={() => {
                                        form.resetFields();
                                        setEditingComment(null);
                                    }}>Hủy</p>
                                </>
                                }

                                {roleId === roleEnv && <> <p>Trả lời</p>
                                    <p onClick={() => handleEditComment(cmt)}>Chỉnh sửa</p>
                                    <p onClick={() => handleDeleteComment(cmt)}>Xóa</p>
                                </>

                                }
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Chưa có bình luận nào</p>
            )}
        </div>
    );
}