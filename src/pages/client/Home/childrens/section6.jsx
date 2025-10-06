import Container2 from "../../../../components/Container/container2";
import Title from "../../../../components/Title";

export default function Section6() {
    return (
        <>
            <div class="home__section-6">
                <Title title={"Sơ lược về cô trà"} />
                <Container2>
                    <div class="profile__wrap">
                        <div class="profile__image">
                            <div class="profile__box">
                                Tận tậm
                            </div>
                            <div class="profile__box bx-0">Giá trị thật</div>
                            <div class="profile__box bx-1">Thấu hiểu</div>
                            <div class="profile__box bx-2">Phát triển bền vững</div>

                        </div>
                        <div class="profile__content">
                            <h3><strong>Không còn</strong>s sợ Tiếng Anh nữa - Nhờ lớp học MGTA</h3>
                            <ul class="profile__achieve">
                                <li>
                                    <div class="profile__icon">
                                        <i class="fa-solid fa-graduation-cap"></i>
                                    </div>
                                    <p>Tốt nghiệp các chương trình liên kết quốc tế,
                                        hệ quốc tế, chất lượng cao các trường
                                        ĐH Kinh Tế, ĐH Ngoại Ngữ, ĐH Sư Phạm...</p>
                                </li>
                                <li>
                                    <div class="profile__icon ic-1">
                                        <i class="fa-solid fa-certificate"></i>
                                    </div>
                                    <p>Chứng chỉ IELTS 7.0+</p>
                                </li>
                                <li>
                                    <div class="profile__icon ic-2">
                                        <i class="fa-solid fa-pen-fancy"></i>
                                    </div>
                                    <p>6 năm chuyên dạy kèm tiếng anh mất gốc dành cho học sinh cấp 2 từ lớp 6-9 theo chương trình
                                        của
                                        BGD (sách giáo khoa Global Success)</p>
                                </li>
                                <li>
                                    <div class="profile__icon ic-3">
                                        <i class="fa-solid fa-book-open"></i>
                                    </div>
                                    <p>2 Năm dạy kèm chương tình tiếng anh Cambridge Vinschool tiểu học </p>
                                </li>
                            </ul>
                        </div>

                    </div>
                </Container2>
            </div>
        </>
    )
}