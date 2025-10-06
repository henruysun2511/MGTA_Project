import { Link } from "react-router-dom"
import Container from "../../../../components/Container"
import Title from "../../../../components/Title"

export default function Section4() {
    return (
        <>
            <div class="home__section-4">
                <Container>
                    <Title title={"MGTA"} subtitle={"Lớp học Tiếng Anh ONLINE mất gốc cho học sinh cấp 2"}></Title>
                    <div className="section-4__wrap">
                        <div className="course__detail">
                            <div className="course__method">
                                <h3>Thông tin lớp học</h3>
                                <ul>
                                    <li><i class="fa-solid fa-laptop"></i> Hình thức học: Học online qua Zoom</li>
                                    <li><i class="fa-solid fa-users"></i> Lớp học nhóm nhỏ: Tối đa 5–7 bạn/lớp</li>
                                    <li><i class="fa-solid fa-coins"></i> <strong>Học phí: 150.000 VNĐ/buổi (90’)</strong></li>
                                    <li><i class="fa-solid fa-book"></i> Chương trình học theo SGK Global Success, bám sát chươn trình trên lớp, đảm bảo điểm số đạt tối thiểu 5+ và cải thiện lên mức 6,7+ sau một học kì </li>
                                    <li><i class="fa-solid fa-calendar-days"></i>Miễn phí buổi học tăng cường vào CN (16h30-18h) gần thi giữa kì, cuối kì - phụ huynh liên hệ trước để đặt lịch </li>
                                </ul>
                            </div>
                            <div className="course__content">
                                <h3>Quy trình học</h3>

                                <div className="phase">
                                    <h2>1. Trước khi đăng kí học</h2>
                                    <p>
                                        Trải nghiệm miễn phí một buổi học online 1:1, để học sinh xem có phù hợp với phương
                                        pháp giảng dạy của giáo viên không. Sau buổi học thử, cô giáo sẽ tư vấn lộ trình học
                                        tập cụ thể để cải thiện điểm số và cách học tiếng Anh phù hợp.
                                    </p>
                                </div>

                                <div className="phase">
                                    <h2>2. Trong quá trình học</h2>
                                    <ul>
                                        <li><i class="fas fa-user-graduate"></i> Học sinh được sắp xếp học 1:1 khoảng 4–5 buổi
                                            trước khi học nhóm.</li>
                                        <li><i class="fas fa-file-alt"></i> Trước buổi học, giáo viên gửi tài liệu và link Zoom
                                            lớp học.</li>
                                        <li><i class="fas fa-comments"></i> Học sinh chủ động tương tác, đặt câu hỏi, trả lời
                                            trong lớp học.</li>
                                        <li><i class="fas fa-clipboard-check"></i> Bài kiểm tra hàng tháng để đánh giá và nhận
                                            xét kỹ năng.</li>
                                        <li><i class="fas fa-file-upload"></i> Học sinh có thể gửi đề cương để giáo viên hướng
                                            dẫn.</li>
                                        <li><i class="fas fa-calendar-check"></i> Trước kỳ thi, có buổi ôn tập miễn phí vào CN.
                                        </li>
                                    </ul>
                                </div>

                                <div className="phase">
                                    <h2>3. Sau kì thi giữa kì, cuối kì</h2>
                                    <p>
                                        Cô và phụ huynh cùng trao đổi về kết quả học tập để điều chỉnh lộ trình học phù hợp,
                                        giúp học sinh cải thiện hiệu quả hơn trong học kỳ tiếp theo.
                                    </p>
                                </div>

                            </div>
                            <div className="course__achieve">
                                <h3>Khóa học này sẽ giúp em</h3>
                                <ul>
                                    <li>
                                        <div class="number">1</div>
                                        Cải thiện điểm số trên lớp sau một học kì, từ mất gốc tiếng anh đạt ngưỡng 5-6.5+
                                    </li>
                                    <li>
                                        <div class="number">2</div>
                                        Tự tin khi làm bài kiểm tra, bài thi trên lớp
                                    </li>
                                    <li>
                                        <div class="number">3</div>
                                        Nâng cao và mở rộng vốn từ vựng trong chương trình tiếng anh cấp 2
                                    </li>
                                    <li>
                                        <div class="number">4</div>
                                        Cải thiện kĩ năng làm bài đọc hiểu, nắm vững ngữ pháp cơ bản
                                    </li>
                                </ul>
                            </div>
                            <div className="course__fee">
                                <h3>Học phí</h3>
                                <ul>
                                    <li><strong>Học phí: 150.000 VNĐ/buổi (90’)</strong></li>
                                    <li><strong>Học phí đóng từ ngày 1 đến ngày 12 hằng tháng</strong></li>
                                    <li class="course-fee-info">Học phí được tính theo tổng số buổi học trong tháng, với các
                                        <strong> lưu ý:</strong>
                                        <ul>
                                            <li>Nếu học viên xin nghỉ có lý do, sẽ được sắp xếp học bù 1:1 hoặc học ghép lớp
                                                khác.</li>
                                            <li>Nếu học viên xin nghỉ nhưng không đăng ký học bù, buổi học đó sẽ được trừ trực
                                                tiếp vào học phí.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="course__schedule">
                                <h3>Lịch học</h3>
                                <p>Xem chi tiết lịch học tại đây:</p>
                                <div class="course__schedule-button">
                                    <Link to={"/curriculum"} ><div class="button__schedule">Chương trình học </div></Link>
                                 
                                </div>
                            </div>
                        </div>
                        <div className="course__overview">
                            <div className="course__overview-image">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/047/341/778/small_2x/young-boy-studying-hard-in-library-photo.jpg" alt="" />
                            </div>
                            <Link to={"/auth/register"}>
                                <div className="button__register-study">ĐĂNG KÝ HỌC NGAY</div>
                            </Link>
                            <Link to={"/auth/register"}>
                                <div className="button__register-try">HỌC THỬ MIỄN PHÚ</div>
                            </Link>
                            <div className="course__common-info">
                                <b>Khai giảng</b>
                                <p>15/9/2025</p>
                            </div>
                            <div className="course__common-info">
                                <b>Hình thức học</b>
                                <p>Online qua Zoom</p>
                            </div>
                            <div className="course__common-info">
                                <b>Học phí</b>
                                <p> 150.000 VNĐ/ buổi (90’)</p>
                            </div>

                            <div className="course__contact-zalo">
                                <p>Quý phụ huynh cần tư vấn thêm? Vui lòng liên hệ với Lớp học MGTA</p>
                                <div className="button__contact-zalo"><i class="fa-solid fa-phone"></i><Link to="https://zalo.me/0399978686" target="blank">Zalo: 03.999.78686</Link></div>
                            </div>

                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}