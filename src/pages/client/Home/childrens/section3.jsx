import { Col, Row } from "antd";

export default function Section3() {
    return (
        <>
            <div className="home__section-3">
                <div className="container-fluid">
                    <Row>
                        <Col span={8}>
                            <div className="section-3__content" style={{ backgroundColor: "#69dfe1" }}>
                                <i class="fa-solid fa-handshake"></i>
                                <h3>Xây dựng hệ sinh thái học tập tiếng Anh cho người mất gốc</h3>
                                <p>Không chỉ là một lớp học, mà là một môi trường học tập toàn diện, bao gồm: bài giảng chất lượng,
                                    bài tập rèn luyện cá nhân hóa, hệ thống kiểm tra tiến độ và đội ngũ hỗ trợ sát sao.</p>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="section-3__content" style={{ backgroundColor: "#f6c964" }}>
                                <i class="fa-solid fa-users"></i>
                                <h3>Hỗ trợ 10.000+ học viên vượt qua nỗi sợ tiếng Anh trong 5 năm tới</h3>
                                <p>Tạo ra thay đổi thực sự cho cộng đồng người học tiếng Anh ở Việt Nam – đặc biệt là các bạn từng
                                    mất gốc, mất động lực.</p>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="section-3__content" style={{ backgroundColor: "#e88ec6" }}>
                                <i className="fa-solid fa-trophy"></i>
                                <h3>Mở rộng thương hiệu "Cô Trà – Tiếng Anh cho học sinh mất gốc"</h3>
                                <p>Không cần ở thành phố lớn – bạn vẫn có thể học lại tiếng Anh cùng cô Trà, dù ở đâu.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}