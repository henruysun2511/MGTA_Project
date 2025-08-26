import man from "../../../../assets/images/man.png";
import Container from "../../../../components/Container/index";
import Title from "../../../../components/Title";

export default function Section2() {
    return (
        <>
            <div className="home__section-2">
                <Container>
                    <Title title={"Giá trị cốt lõi"} subtitle={"Cốt lõi là sự tận tâm – định hướng là sự tiến bộ"}></Title>
                    <div className="section-2__wrap">
                        <div className="section-2__image">
                            <img src={man} alt="" />
                            <div className="blob"></div>
                        </div>
                        <div className="section-2__content">
                            <div className="section-2__box">
                                <h3>Hiểu học viên – Dạy từ gốc</h3>
                                <p>Chúng tôi tin rằng mỗi học viên đều có thể giỏi tiếng Anh, chỉ cần bắt đầu đúng cách. Việc
                                    giảng dạy không chỉ truyền đạt kiến thức, mà còn xuất phát từ sự thấu hiểu và kiên nhẫn.</p>
                            </div>
                            <div className="section-2__box">
                                <h3>Học thật – Tiến bộ thật</h3>
                                <p>Chúng tôi chú trọng vào kết quả học tập thực tế, không dạy mẹo đối phó. Kiến thức được xây
                                    dựng bền vững từ nền tảng, giúp học viên sử dụng tiếng Anh linh hoạt và tự nhiên.</p>
                            </div>
                            <div className="section-2__box">
                                <h3>Đồng hành – Không để ai bỏ lại phía sau</h3>
                                <p>Mỗi học viên đều nhận được sự quan tâm và hỗ trợ kịp thời. Cô Trà luôn theo sát tiến độ học
                                    tập và động viên tinh thần để học viên không cảm thấy lạc lõng trong quá trình học online.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
