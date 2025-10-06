import Container from "../../../../components/Container/index";
import Title from "../../../../components/Title";

export default function Section4() {
    return (
        <div class="about-us__section-4">
            <Container>
                <Title title={"Giá trị cốt lõi"} subtitle={"Tạo nên MGTA English"} />
                <div className="section-4__wrap">
                    <div className="section-4__image">
                          <img src="https://i.pinimg.com/736x/0c/60/5f/0c605f5725146674637fe3342783ecf4.jpg" alt="Kids learning English" />
                    </div>
                    <div className="section-4__content">Chúng tôi tin rằng trẻ em là tài sản quý giá nhất của quốc gia, và mỗi em nhỏ đều xứng đáng được học tập, đặc biệt là tiếp cận ngôn ngữ toàn cầu – Tiếng Anh. Tiếng Anh không chỉ là môn học, mà còn là chìa khóa mở ra thế giới tri thức, giúp các em tự tin giao tiếp, tự tin bước ra xã hội và trở thành công dân toàn cầu với nhiều cơ hội học tập và nghề nghiệp rộng mở trong tương lai.</div>
                </div>
            </Container>          
        </div>
    )
}