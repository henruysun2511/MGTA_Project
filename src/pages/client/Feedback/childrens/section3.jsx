import feedback1 from "../../../../assets/images/feedbacks/feedback1.webp";
import feedback2 from "../../../../assets/images/feedbacks/feedback2.webp";
import feedback3 from "../../../../assets/images/feedbacks/feedback3.webp";
import feedback4 from "../../../../assets/images/feedbacks/feedback4.webp";
import Container2 from "../../../../components/Container/container2";
import Title from "../../../../components/Title";

export default function Section3() {
    return (<>
        <div className="feedback__section-3">
            <Container2>
                <Title title={"Những bước tiến từ con số 0"} subtitle={"Kết thúc những năm học vừa rồi, MGTA đã tổng hợp feedback và những case mà đã thành công"} />
                <div className="section-3__wrap">
                    <div className="section-3__image">
                        <div className="image__col">
                            <img src={feedback1} alt="feedback1.png" />
                            <img src={feedback2} alt="feedback2.png" />
                        </div>
                        <div className="image__col ic--1">
                            <img src={feedback3} alt="feedback3.png" />
                            <img src={feedback4} alt="feedback4.png" />
                        </div>
                    </div>
                    <div className="section-3__content">
                        Với kinh nghiệm 5 năm “chữa” mất gốc tiếng anh cho các bạn học sinh cấp 2,
                        và đã được vài thành quả nhất định. Hiểu rõ
                        trong những năm học cấp 2 cũng gặp rất nhiều khó khăn với
                        phương pháp học tiếng anh. Đội ngũ MGTA hiểu được những khó
                        khăn mà các bạn học sinh thường gặp. Do đó, khi nhận dạy các bạn mất gốc,
                        chúng tôi luôn muốn truyền tải phương pháp học đúng, học đủ, xây dựng những nền
                        tảng từ các bước đầu tiên tới các bạn, đảm bảo rằng học sinh nắm được những yếu tố
                        cơ bản để bắt đầu “yêu lại từ đầu” với tiếng anh.
                    </div>
                </div>
            </Container2>
        </div>

    </>)
}