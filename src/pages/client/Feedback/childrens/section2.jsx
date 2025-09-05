import feedback10 from "../../../../assets/images/feedbacks/feedback10.webp";
import feedback11 from "../../../../assets/images/feedbacks/feedback11.webp";
import feedback12 from "../../../../assets/images/feedbacks/feedback12.webp";
import feedback13 from "../../../../assets/images/feedbacks/feedback13.webp";
import feedback14 from "../../../../assets/images/feedbacks/feedback14.webp";
import feedback15 from "../../../../assets/images/feedbacks/feedback15.webp";
import feedback16 from "../../../../assets/images/feedbacks/feedback16.webp";
import Container2 from "../../../../components/Container/container2";
import Title from "../../../../components/Title/index";
export default function Section2() {
    return (<>
        <div class="feedback__section-2">
            <Container2>
                <Title title={"Cùng vô vàn những feedback tích cực khác!"} subtitle={"Lớp học Tiếng Anh ONLINE mất gốc cho học sinh cấp 2"} />
                <div class="section-2__image-list">
                    <img src={feedback10} alt="feedback10.png" />
                    <img src={feedback11} alt="feedback10.png" />
                    <img src={feedback12} alt="feedback10.png" />
                    <img src={feedback13} alt="feedback10.png" />
                    <img src={feedback14} alt="feedback10.png" />
                    <img src={feedback15} alt="feedback10.png" />
                    <img src={feedback16} alt="feedback10.png" />
                </div>
            </Container2>

        </div>
    </>)
}