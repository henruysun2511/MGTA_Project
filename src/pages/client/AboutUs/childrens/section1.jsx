import bigben from "../../../../assets/images/bigben.png";
import Container2 from "../../../../components/Container/container2";
export default function Section1() {
    return (
        <>
            <div class="about-us__section-1">
                <Container2>
                    <div class="section-1__wrap">
                        <div class="section-1__content">
                            <h1>
                                Giỏi tiếng Anh – Mở cánh cửa thế giới!</h1>
                            <h3>Khóa học tiếng Anh online dành riêng cho học sinh mất gốc. Khởi động lại tiếng Anh cùng cô Trà –
                                Bắt đầu ngay hôm nay!
                            </h3>
                            <div class="button__study">Đăng ký học thử ngay</div>
                        </div>
                        <div class="section-1__image">
                            <img src={bigben} alt="bigben.png" />
                        </div>
                    </div>
                </Container2>
            </div>

        </>
    )
}