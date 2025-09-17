import feedback from "../../../../assets/images/feedbackBanner.png";
import heartIcon from "../../../../assets/images/heartIcon.png";

export default function Section1() {
    return (
        <div className="feedback__section-1">
            <div className="section-1__content">
                <h2>
                    <span className="highlight">STUDENT</span> FEEDBACK
                </h2>
                <p>
                    Học sinh mất gốc tiếng Anh đã lấy lại tự tin sau khi tham gia khóa học.
                    Chúng tôi cam kết kèm cặp từng bạn đến khi tiến bộ rõ rệt.
                </p>
                <button className="btn-learn">LEARN MORE</button>
            </div>

            <div className="section-1__image">
                <div className="blob"></div>
                <img className="banner" src={feedback} alt="" />
                <img className="heart" src={heartIcon} alt="" />
                <div class="feedback__item">
                    <div class="feedback__avatar">
                        <img src="https://i.pinimg.com/originals/b0/d8/3c/b0d83cfc1162fa4aa7f036bf50caefdc.jpg"
                            alt="avatar" />
                    </div>
                    <div class="feedback__content">
                        <h4>Lan Hương – Lớp 8</h4>
                        <div class="stars">⭐⭐⭐⭐⭐</div>
                        <p>Tuyệt vời</p>
                    </div>
                </div>
                <div class="feedback__item fi--1">
                    <div class="feedback__avatar">
                        <img src="https://i.pinimg.com/originals/b0/d8/3c/b0d83cfc1162fa4aa7f036bf50caefdc.jpg"
                            alt="avatar" />
                    </div>
                    <div class="feedback__content">
                        <h4>Lan Hương – Lớp 8</h4>
                        <div class="stars">⭐⭐⭐⭐⭐</div>
                        <p>Cô giảng hay quá ạ!</p>
                    </div>
                </div>
                <div class="feedback__item fi--2">
                    <div class="feedback__avatar">
                        <img src="https://i.pinimg.com/originals/b0/d8/3c/b0d83cfc1162fa4aa7f036bf50caefdc.jpg"
                            alt="avatar" />
                    </div>
                    <div class="feedback__content">
                        <h4>Lan Hương – Lớp 8</h4>
                        <div class="stars">⭐⭐⭐⭐⭐</div>
                        <p>Em từng mất gốc tiếng Anh, giờ thì đã nắm chắc ngữ pháp và biết cách học từ vựng hiệu quả.
                            Cảm ơn cô rất nhiều!</p>
                    </div>
                </div>
            </div>

        </div>
    );
}