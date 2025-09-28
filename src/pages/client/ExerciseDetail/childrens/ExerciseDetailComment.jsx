import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import giaovien from '../../../../assets/images/gv.png';
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import { handleCreate, handleDelete, handleUpdate } from '../../../../utils/handles';

export default function ExerciseDetailComment({ exerciseId }) {
    const dispatch = useDispatch();
    const accountId = localStorage.getItem("accountId");
    const roleId = localStorage.getItem("roleId");
    const roleEnv = import.meta.env.VITE_ROLE_ID;

    const [form] = Form.useForm();
    const [editingComment, setEditingComment] = useState(null);
    const [replyingCommentId, setReplyingCommentId] = useState(null);
    const [commentDataRes] = useFetch(`comment/comments/${exerciseId}`, {}, {});
    const [replyCommentDataRes] = useFetch(`comment/reply-comment/${exerciseId}`, {}, {});

    useEffect(() => {
        if (commentDataRes) {
            dispatch(fetchAction("comments", commentDataRes.comments));
        }
    }, [commentDataRes, dispatch]);

    useEffect(() => {
        if (replyCommentDataRes) {
            dispatch(fetchAction("replycomments", replyCommentDataRes.comments));
        }
    }, [replyCommentDataRes, dispatch]);

    const commentData = useSelector(state => state.comments.list || []);
    const replyCommentData = useSelector(state => state.replycomments.list || []);

    const mergerdComment = commentData.map(cmt => {
        const replyCommentByDataId = replyCommentData.filter(rpl => rpl.commentId === cmt._id);
        return ({
            ...cmt,
            replyCommentId: replyCommentByDataId
        })
    }
    )

    console.log(mergerdComment);


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

    const handleReplyComment = (cmt) => {
        setReplyingCommentId(cmt._id);
    };

    const handleSubmitReplyComment = async (values) => {
        const options = {
            exerciseId,
            accountId,
            content: values.content,
            commentId: replyingCommentId
        }
        await handleCreate(dispatch, "admin/reply-comment", "replycomments", options, () => {
            form.resetFields();
            setReplyingCommentId(null);
        });
    }

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

            {mergerdComment && mergerdComment.length > 0 ? (
                mergerdComment.map((cmt, index) => (
                    <div className='comment__item' key={index}>
                        <div className="comment__user">
                            <div className="comment__image">
                                {
                                    cmt.accountId?.roleId === roleEnv ? (
                                        <img src={giaovien} alt="giaovien.png" />
                                    ) : (
                                        <img src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg" alt="hocsinh.png" />
                                    )
                                }
                            </div>
                            <div className="comment__info">
                                <div className="comment__name">{cmt.accountId?.username || "Ẩn danh"}</div>
                                <div className="comment__content">{cmt.content || ""}</div>

                                <div className="comment__actions">
                                    {roleId === roleEnv ? (
                                        <>
                                            <p onClick={() => handleEditComment(cmt)}>Chỉnh sửa</p>
                                            <p onClick={() => handleDeleteComment(cmt)}>Xóa</p>
                                            <p onClick={() => handleReplyComment(cmt)}>Trả lời</p>
                                        </>
                                    ) : (
                                        (cmt.accountId?._id === accountId || cmt.accountId === accountId) && (
                                            <>
                                                <p onClick={() => handleEditComment(cmt)}>Chỉnh sửa</p>
                                                <p onClick={() => handleDeleteComment(cmt)}>Xóa</p>
                                            </>
                                        )
                                    )}

                                    {editingComment?._id === cmt._id && (
                                        <p
                                            onClick={() => {
                                                form.resetFields();
                                                setEditingComment(null);
                                            }}
                                        >
                                            Hủy
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {cmt.replyCommentId?.length > 0 &&
                            cmt.replyCommentId.map((rcmt, idx) => (
                                <div className="reply-comment" key={idx}>
                                    <div className="comment__user">
                                        <div className="comment__image">
                                            <img src={giaovien} alt="" />
                                        </div>
                                        <div className="comment__info">
                                            <div className="comment__name">
                                                Nguyễn Thu Trà
                                            </div>
                                            <div className="comment__content">{rcmt.content || "N/A"}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {replyingCommentId === cmt._id && (
                            <div className="reply-comment">
                                <Form layout="vertical" onFinish={handleSubmitReplyComment}>
                                    <Row>
                                        <Col span={22}>
                                            <Form.Item
                                                name="content"
                                                rules={[{ required: true, message: "Không được để trống" }]}
                                            >
                                                <Input size="large" placeholder="Trả lời bình luận" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2} style={{ textAlign: "right" }}>
                                            <Button size="large" type="primary" htmlType="submit">
                                                Gửi
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>Chưa có bình luận nào</p>
            )}
        </div>
    );
}