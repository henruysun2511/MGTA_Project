import Container from "../../../../components/Container";
import Title from "../../../../components/Title";

export default function Section5() {
    return (
        <>
            <div class="about-us__section-5">
                <Container>
                    <Title title={"Cô trà là ai?"} />
                    <div class="section-5__wrap">
                        <div class="section-5__content">
                            <h1>Khơi lại đam mê tiếng Anh từ những điều cơ bản nhất</h1>
                            <p>Nhiều học sinh cấp 2 dù học tiếng Anh từ sớm nhưng vẫn cảm thấy mất gốc, chán nản, không hiểu
                                bài, sợ kiểm tra. Điều này ảnh hưởng trực tiếp đến kết quả học tập và sự tự tin của các em.
                                MGTA được xây dựng dành riêng cho học sinh mất gốc, giúp các em học lại từ đầu một cách dễ hiểu,
                                có lộ trình rõ ràng, giáo viên gần gũi và phương pháp dễ nhớ.
                                Không chỉ giúp các em nắm lại kiến thức nền tảng, MGTA còn tạo động lực và niềm vui trong việc
                                học tiếng Anh – để việc học không còn là áp lực, mà là hành trình khám phá đầy hứng thú.</p>
                        </div>
                        <div class="section-5__image">
                            <img src="https://i.pinimg.com/1200x/c7/0d/12/c70d12ec23b1b03e4d5d49c3cc368d8c.jpg" alt="" />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}