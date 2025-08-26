import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import fb1 from "../../../../assets/images/feedbacks/feedback1.webp";
import fb2 from "../../../../assets/images/feedbacks/feedback2.webp";
import fb3 from "../../../../assets/images/feedbacks/feedback3.webp";
import fb4 from "../../../../assets/images/feedbacks/feedback4.webp";
import fb5 from "../../../../assets/images/feedbacks/feedback5.webp";
import fb6 from "../../../../assets/images/feedbacks/feedback6.webp";
import fb7 from "../../../../assets/images/feedbacks/feedback7.webp";
import Container2 from "../../../../components/Container/container2";
import Title from "../../../../components/Title";


export default function Section7() {
    const navigate = useNavigate();
    return (
        <>
            <div class="home__section-7">
                <Container2>
                    <Title title={"FEEDBACK TỪ HỌC VIÊN"} subtitle={"Những chia sẻ thật từ hành trình học cùng cô Trà"} />

                    <Row gutter={10}>
                        <Col span={6}>
                            <div class="feedback__col">
                                <p class="feedback__text">Hành trình thay đổi bắt đầu từ một khóa học đúng đắn</p>
                                <div class="feedback__image fb--1">
                                    <img src={fb1} alt="feedback1.webp" />
                                </div>
                            </div>
                        </Col>

                        <Col span={12}>
                            <div class="feedback__display--1">
                                <div class="feedback__image fb--2">
                                    <img src={fb2} alt="feedback2.webp" />
                                </div>
                                <div class="feedback__display--3">
                                    <div class="feedback__image fb--3">
                                        <p class="feedback__text txt--1">Tiếng nói chân thật từ những người từng mất gốc và đã
                                            tiến bộ.</p>
                                        <img src={fb3} alt="feedback3.webp" />
                                    </div>
                                </div>

                            </div>
                            <div class="feedback__display--2">
                                <div class="feedback__image fb--4">
                                    <img src={fb4} alt="feedback4.webp" />
                                </div>
                                <div class="feedback__image fb--5">
                                    <img src={fb5} alt="feedback5.webp" />
                                </div>

                            </div>
                        </Col>
                        <Col span={6}>
                            <div class="feedback__col--2">
                                <div class="feedback__image fb--6">
                                    <img src={fb6} alt="feedback6.webp" />
                                </div>
                                <div class="feedback__image fb--7">
                                    <img src={fb7} alt="feedback7.webp" />
                                </div>
                                <div class="feedback__text txt--1">Học xong rồi, giờ tụi em nói tiếng Anh cả ngày luôn!</div>
                            </div>
                        </Col>
                    </Row>

                    <div class="feedback__button">
                        <div class="button__watch-more" onClick={() => navigate('/feedback')}>Xem thêm feedback tại đây</div>
                    </div>
                </Container2>
            </div>
        </>
    )
}