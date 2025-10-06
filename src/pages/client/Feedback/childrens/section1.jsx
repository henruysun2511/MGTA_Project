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
                        <img src="https://kenh14cdn.com/2020/9/9/1902965917836574986135528271706563799553163n-159963024042934862433.jpg"
                            alt="avatar" />
                    </div>
                    <div class="feedback__content">
                        <h4>Hồng Phúc – Lớp 7</h4>
                        <div class="stars">⭐⭐⭐⭐⭐</div>
                        <p>Tuyệt vời</p>
                    </div>
                </div>
                <div class="feedback__item fi--1">
                    <div class="feedback__avatar">
                        <img src="https://i.pinimg.com/564x/5e/6c/57/5e6c572eed026b75f81682e02f83a983.jpg"
                            alt="avatar" />
                    </div>
                    <div class="feedback__content">
                        <h4>Trường Duy – Lớp 9</h4>
                        <div class="stars">⭐⭐⭐⭐⭐</div>
                        <p>Cô giảng hay quá ạ!</p>
                    </div>
                </div>
                <div class="feedback__item fi--2">
                    <div class="feedback__avatar">
                        <img src="https://faceinch.vn/upload/news/chup-anh-the-tha-toc-3007.jpg"
                            alt="avatar" />
                    </div>
                    <div class="feedback__content">
                        <h4>Thanh Tâm – Lớp 8</h4>
                        <div class="stars">⭐⭐⭐⭐⭐</div>
                        <p>Em từng mất gốc tiếng Anh, giờ thì đã nắm chắc ngữ pháp và biết cách học từ vựng hiệu quả.
                            Cảm ơn cô rất nhiều!</p>
                    </div>
                </div>
            </div>

        </div>
    );
}