import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import Container2 from "../../../../components/Container/container2";
import { formatDateFromApi } from "../../../../utils/formatDate";

export default function Section1() {
    const accessToken = localStorage.getItem("accessToken");

    // account hiện tại
    const accountData = useSelector(state => state.accounts.list).filter(
        acc => !acc.deleted && acc.status === "active"
    ) || [];

    const currentAccount = accountData.find(
        acc => String(acc.accessToken) === String(accessToken)
    );

    // danh sách học sinh
    const studentData = useSelector(state => state.students.list).filter(
        st => !st.deleted
    ) || [];

    // danh sách kết quả
    const resultData = useSelector(state => state.results.list) || [];

    // tìm học sinh theo accountId
    const currentStudent = currentAccount
        ? studentData.find(st => st.accountId === currentAccount.id)
        : null;

    // tìm kết quả theo studentId
    const currentResults = currentStudent
        ? resultData.filter(r => r.studentId === currentStudent.id)
        : [];
    

    const exerciseData = useSelector(state => state.exercises.list) || [];
    return (
        <>
            <div class="curriculumn__section-1">
                <Container2>
                    {accessToken ? (
                        <>
                            <h1>Kết quả ôn luyện mới nhất</h1>
                            <div class="practice__history-wrap">
                                <Row gutter={15}>
                                    {currentResults.length > 0 ? (currentResults.map(rs => {
                                        const exerciseDataByResultId = exerciseData.find(
                                            ex => ex.id === rs.exerciseId
                                        );
                                        return (
                                            <Col span={6}>
                                                <div className="practice___history-item">
                                                    <h3>{exerciseDataByResultId?.title}</h3>
                                                    <div class="practice__tag">
                                                        <p>#Đọc hiểu</p>
                                                        <p>#Điền từ</p>
                                                        <p>#Viết lại câu</p>
                                                    </div>
                                                    <div className="practice__info">Ngày làm bài: {formatDateFromApi(rs.endTime)}</div>
                                                    <div className="practice__info">Thời gian làm bài: {rs.duration}</div>
                                                    <div className="practice__info">Kết quả: {rs.score}</div>
                                                    <a href="">[Xem chi tiết]</a>
                                                </div>
                                            </Col>
                                        ) 
                                    }) 
                                    ): (<i>Chưa có kết quả nào</i>)
                                    }
                                </Row>
                            </div>
                        </>
                    ) : (
                        <h1>Mày chưa đăng nhập</h1>
                    )
                    }

                </Container2>
            </div>
        </>
    )
}