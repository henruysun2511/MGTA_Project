import { EditOutlined, RetweetOutlined } from "@ant-design/icons";
import { Col, Pagination, Row, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container2 from "../../../../components/Container/container2";
import useFetch from "../../../../hooks/useFetch";
import useQuery from "../../../../hooks/useQuery";
import { formatDateFromApi } from "../../../../utils/formatDate";
import PasswordUpdateModal from "./PasswordUpdateModal";
import ProfileUpdateModal from "./ProfileUpdateModal";
const { Column } = Table;

export default function Section2() {
    const navigate = useNavigate();
    const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);
    const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);

    const studentData = useSelector(state => state.students.list || []);

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10
    });
    const [data] = useFetch("exercise/results", query, {});
    const dataSource = data?.results?.items.map((rs, index) => {
        return {
            ...rs,
            key: index,
            title: rs.exerciseId?.title,
            endTime: formatDateFromApi(rs.endTime)
        };
    });

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    const handleWatchDetail = (id) => {
        navigate(`/score/${id}`);
    }

    return (
        <>
            <div className="profile__section-2">
                <Container2>
                    <Row gutter={12}>
                        <Col  xs={24} sm={8} md={8} lg={8} xl={8} >
                            <div className="profile__info">
                                {
                                    studentData.length > 0 && (
                                        <>
                                            <h3>Thông tin học sinh</h3>
                                            <ul>
                                                <li>Họ và tên: <strong>{studentData[0].name || "N/A"}</strong></li>
                                                <li>Email: <strong>{studentData[0].email || "N/A"}</strong></li>
                                                <li>Sđt: <strong>{studentData[0].phone || "N/A"}</strong></li>
                                                <li>Địa chỉ: <strong>{studentData[0].address || "N/A"}</strong></li>
                                                <li>Trường: <strong>{studentData[0].school || "N/A"}</strong></li>
                                                <li>Khối: <strong>{studentData[0].class || "N/A"}</strong></li>
                                            </ul>
                                            <h3>Thông tin phụ huynh</h3>
                                            <ul>
                                                <li>Họ và tên: <strong>{studentData[0].parentName || "N/A"}</strong></li>
                                                <li>Sđt: <strong>{studentData[0].parentPhone || "N/A"}</strong></li>
                                                <li>Email: <strong>{studentData[0].parentEmail || "N/A"}</strong></li>
                                            </ul>
                                        </>
                                    )
                                }
                                <div className="button__edit" onClick={() => setOpenUpdateProfileModal(true)}>
                                    <Tooltip title="Chỉnh sửa thông tin">
                                        <EditOutlined />
                                    </Tooltip>
                                </div>
                                <div className="button__edit--2" onClick={() => setOpenUpdatePasswordModal(true)}>
                                    <Tooltip title="Đổi mật khẩu">
                                        <RetweetOutlined />
                                    </Tooltip>
                                </div>
                            </div>
                        </Col>
                        <Col  xs={24} sm={16} md={16} lg={16} xl={16}>
                            <div className="profile__result">
                                <h3>Lịch sử làm bài</h3>
                                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                                    <Table dataSource={dataSource} pagination={false}>
                                        <Column title="STT" key="index" render={(text, record, index) =>
                                            ((data?.results?.pagination?.currentPage - 1) * data?.results?.pagination?.limit) + index + 1
                                        } />
                                        <Column title="Bài tập" dataIndex="title" key="title" />
                                        <Column title="Nộp lúc" dataIndex="endTime" key="endTime" />
                                        <Column title="Điểm" dataIndex="score" key="score" />
                                        <Column
                                            title="Hành động"
                                            key="action"
                                            render={(text, record) => (
                                                <Space size="middle">
                                                    <Tooltip title="Xem chi tiết điểm số">
                                                        <a href="" onClick={() => handleWatchDetail(record._id)}>Xem chi tiết</a>
                                                    </Tooltip>
                                                </Space>
                                            )}
                                        />
                                    </Table>
                                    {data?.results?.pagination && (
                                        <Pagination
                                            current={data.results.pagination.currentPage}
                                            pageSize={data.results.pagination.limit}
                                            total={data.results.pagination.count}
                                            onChange={handlePageChange}
                                            showSizeChanger
                                            pageSizeOptions={['5', '10', '20', '50']}
                                        />
                                    )}
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </Container2>
            </div>

            <ProfileUpdateModal open={openUpdateProfileModal} onCancel={() => setOpenUpdateProfileModal(false)} studentData={studentData[0]} />
            <PasswordUpdateModal open={openUpdatePasswordModal} onCancel={() => setOpenUpdatePasswordModal(false)} />
        </>
    )
}