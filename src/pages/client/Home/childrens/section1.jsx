import girl from "../../../../assets/images/girl.png";
export default function Section1() {
    return (
        <>
            <div class="home__section-1">
                <div class="section-1__wrap">
                    <div class="section-1__content">
                        <h1>Tuyển sinh lớp Tiếng anh mất gốc
                            Cho học sinh cấp 2</h1>
                        <div class="year-label">2025–2026</div>
                        <ul class="checklist">
                            <li>Tuyển sinh các lớp 6, 7, 8, 9</li>
                            <li>Hình thức học: Online</li>
                            <li>Chương trình học bám sát theo SGK</li>
                            <li>Thời gian học: 2 buổi/tuần (1h30)</li>
                            <li>Cam kết điểm số từ 3,4 điểm tăng lên 6,7+ điểm sau một học kì</li>
                        </ul>
                          <div class="button__regist">Đăng ký học thử ngay</div>
                    </div>
                    <div class="section-1__image">
                        <div class="circle--dot">
                            <div class="circle--pink">
                                <img src={girl} alt="gv.png" />
                            </div>
                        </div>
                        <div class="contact contact--1">
                            <div class="contact__icon">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="contact__info">
                                <h3>Số điện thoại liên hệ</h3>
                                <p>03.999.78686</p>
                            </div>
                        </div>
                        <div class="contact contact--3">
                            <div class="contact__icon">
                                <i class="fa-brands fa-facebook"></i>
                            </div>
                            <div class="contact__info">
                                <h3>Facebook</h3>
                                <p>Tiếng Anh Cho Học Sinh Cấp 2 Mất Gốc</p>
                            </div>
                        </div>
                        <div class="contact contact--2">
                            <div class="contact__icon">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div class="contact__info">
                                <h3>Email</h3>
                                <p>mgtahanoi@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}