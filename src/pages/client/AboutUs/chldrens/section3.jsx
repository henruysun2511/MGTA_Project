import { Col, Row } from "antd";
import Container2 from "../../../../components/Container/container2";

export default function Section3() {
    return (
        <>
            <div class="about-us__section-3">
                <Container2>
                    <div class="section-3__wrap">
                        <h1>TẠI SAO NÊN LỰA CHỌN LỚP HỌC MGTA?</h1>
                        <Row gutter={70}>
                            <Col span={6}>
                                <div className="section-3__card">
                                    <div className="card__image">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx1U7LeEb138tGvlbtc158eXkZ1OUbnvYL3w&s" alt="" />
                                    </div>
                                    <h3 className="card__title">Đội ngũ MGTA tận tâm, thân thiện</h3>
                                    <div className="card__script">Chúng tôi tin rằng sự tận tâm, chu đáo, luôn lắng nghe, thấu hiểu học sinh là cách nhanh nhất để có thể hiểu và truyền đạt cho các bạn niềm vui thích, hứng khởi trong quá trình học lại từ đầu môn Tiếng Anh</div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="section-3__card">

                                    <h3 className="card__title">Phương pháp dễ hiểu, hết nhớ</h3>
                                    <div className="card__script">Với kinh nghiệm 6 năm, đã tiếp nhận và gỡ rối rất nhiều trường hợp mất gốc tiếng anh. Chúng tôi đã có những phưng pháp hệ thống hóa ngữ pháp, phương pháp đối với từng kĩ năng để giúp các bạn học </div>
                                    <div className="card__image ci--1">
                                        <img src="" alt="" />
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="section-3__card">
                                    <div className="card__image">
                                        <img src="" alt="" />
                                    </div>
                                    <h3 className="card__title">Chương trình học bám sát chương trình phổ thông</h3>
                                    <div className="card__script">Tại MGTA, chúng tôi luôn khuyến khích, đảm bảo rằng học sinh năm được vững phần kiến thức cơ bản của chương trình học phổ thông, đảm bảo điểm số các em đạt mức trung bình - khá khi làm các bài kiểm tra trên trường lớp</div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="section-3__card">
                                    <h3 className="card__title">Kho học liệu, bài tập đa dạng</h3>
                                    <div className="card__script">Để cải thiện điểm số tiếng Anh, điều quan trọng nhất chính là luyện tập đều đặn mỗi ngày. Việc lặp lại và thực hành thường xuyên sẽ giúp các bạn nắm vững kiến thức, ghi nhớ lâu hơn và tiến bộ rõ rệt từng ngày.</div>
                                    <div className="card__image ci--1">
                                        <img src="" alt="" />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container2>
            </div>
        </>
    )
}