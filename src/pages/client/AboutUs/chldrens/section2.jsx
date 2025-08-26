import { Col, Row } from "antd";
import Container from "../../../../components/Container/index";
import Title from "../../../../components/Title";

export default function Section2() {
    return (
        <>
            <div class="about-us__section-2">
                <Container>
                    <Title title={"Số liệu nổi bật"} subtitle={"Cô và trò cùng đạt được"} />
                    <Row gutter={35}>
                        <Col span={6}>
                            <div class="section-2__box">
                                <h1>90%</h1>
                                <p>Học sinh cải thiện điểm số sau 1 học kỳ</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div class="section-2__box" style={{ backgroundColor: "#69dfe1" }}>
                                <h1>95%</h1>
                                <p>Học sinh cảm thấy tự tin hơn khi học Tiếng Anh</p>
                            </div></Col>
                        <Col span={6}>
                            <div class="section-2__box" style={{ backgroundColor: "#f6c964" }}>
                                <h1>95%</h1>
                                <p>Học sinh và phụ huynh
                                    hài lòng với chất lượng dạy và học khi học tại
                                    lớp học MGTA</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div class="section-2__box">
                                <h1>6+</h1>
                                <p>Là số năm MGTA đã đồng hành cùng với rất nhiều thế hệ học sinh</p>
                            </div>
                        </Col>
                    </Row>
                </Container >
            </div>
        </>
    )
}