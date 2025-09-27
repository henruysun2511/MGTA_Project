import { Link } from "react-router-dom";
import girl from "../../../../assets/images/girl.png";
export default function Section1() {
    return (
        <>
            <div className="home__section-1">
                <div className="section-1__wrap">
                    <div className="section-1__content">
                        <h1>Tuyển sinh lớp Tiếng anh mất gốc
                            Cho học sinh cấp 2</h1>
                        <div className="year-label">2025–2026</div>
                        <ul className="checklist">
                            <li>Tuyển sinh các lớp 6, 7, 8, 9</li>
                            <li>Hình thức học: Online</li>
                            <li>Chương trình học bám sát theo SGK</li>
                            <li>Thời gian học: 2 buổi/tuần (1h30)</li>
                            <li>Cam kết điểm số từ 3,4 điểm tăng lên 6,7+ điểm sau một học kì</li>
                        </ul>
                        <Link to={"/auth/register"}>
                            <div className="button__regist">Đăng ký học thử ngay</div>
                        </Link>
                    </div>
                    <div className="section-1__image">
                        <div className="circle--dot">
                            <div className="circle--pink">
                                <img src={girl} alt="gv.png" />
                            </div>
                        </div>
                        <div className="contact contact--1">
                            <div className="contact__icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="contact__info">
                                <h3>Số điện thoại liên hệ</h3>
                                <p>03.999.78686</p>
                            </div>
                        </div>
                        <div className="contact contact--3">
                            <div className="contact__icon">
                                <i className="fa-brands fa-facebook"></i>
                            </div>
                            <div className="contact__info">
                                <h3>Facebook</h3>
                                <p>Tiếng Anh Cho Học Sinh Cấp 2 Mất Gốc</p>
                            </div>
                        </div>
                        <div className="contact contact--2">
                            <div className="contact__icon">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="contact__info">
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