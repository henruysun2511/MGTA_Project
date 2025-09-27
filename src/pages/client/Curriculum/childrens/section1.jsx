import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import banner from "../../../../assets/images/curriculumnBanner.png";
import Container2 from "../../../../components/Container/container2";
import useFetch from '../../../../hooks/useFetch';
import { formatDateFromApi } from "../../../../utils/formatDate";
export default function Section1() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const roleId = localStorage.getItem("roleId");
    const roleEnv = import.meta.env.VITE_ROLE_ID; 

    const [data] = useFetch("exercise/results", {}, {})
    const currentResults = data?.results?.items || [];

    const handleWatchDetail = (id) => {
        navigate(`/score/:${id}`);
    }

    return (
        <>
            <div class="curriculumn__section-1">
                <Container2>
                    {accessToken ? (
                        <>
                            {roleId === roleEnv ?
                                <>
                                    <div className="section-1__content">
                                        <div className="blob"></div>
                                        <img src={banner} alt="banner.png" />
                                        <h2>
                                            <span className="highlight">Chương trình dành cho học sinh cấp 2 </span>mất gốc
                                        </h2>
                                        <p>
                                            Đây là khóa học đặc biệt dành cho học sinh cấp hai bị hổng kiến thức,
                                            giúp các em củng cố lại toàn bộ nền tảng từ căn bản nhất.
                                            Nội dung học bao gồm Toán, Văn và Tiếng Anh, được biên soạn dễ hiểu,
                                            phù hợp với mọi trình độ để học sinh có thể lấy lại sự tự tin và
                                            bắt kịp bạn bè trên lớp.
                                        </p>
                                    </div>

                                    <div className="section-1__image">
                                        <div className="blob"></div>
                                    </div>

                                </> :
                                <>
                                    <h1>Kết quả ôn luyện mới nhất</h1>
                                    <div class="practice__history-wrap">
                                        <Row gutter={15}>
                                            {currentResults.length > 0 ? (currentResults.map(rs => {
                                                return (
                                                    <Col span={6}>
                                                        <div className="practice___history-item">
                                                            <h3>{rs.exerciseId.title || "N/A"}</h3>
                                                            <div className="practice__info">Ngày làm bài: {formatDateFromApi(rs.endTime)}</div>
                                                            <div className="practice__info">Kết quả: {rs.score}</div>
                                                            <a href="" onClick={() => handleWatchDetail(rs._id)}>[Xem chi tiết]</a>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                            ) : (<i>Chưa có kết quả nào</i>)
                                            }
                                        </Row>
                                    </div>
                                </>
                            }

                        </>
                    ) : (
                        <>
                            <div className="section-1__content">
                                <div className="blob"></div>
                                <img src={banner} alt="banner.png" />
                                <h2>
                                    <span className="highlight">Chương trình dành cho học sinh cấp 2 </span>mất gốc
                                </h2>
                                <p>
                                    Đây là khóa học đặc biệt dành cho học sinh cấp hai bị hổng kiến thức,
                                    giúp các em củng cố lại toàn bộ nền tảng từ căn bản nhất.
                                    Nội dung học bao gồm Toán, Văn và Tiếng Anh, được biên soạn dễ hiểu,
                                    phù hợp với mọi trình độ để học sinh có thể lấy lại sự tự tin và
                                    bắt kịp bạn bè trên lớp.
                                </p>
                            </div>

                            <div className="section-1__image">
                                <div className="blob"></div>
                            </div>
                        </>
                    )
                    }

                </Container2>
            </div>
        </>
    )
}