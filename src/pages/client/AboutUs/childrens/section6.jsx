import Container from "../../../../components/Container"

export default function Section6() {
    return (
        <>
            <div class="about-us__section-6">
                <Container>
                    <div class="section-6__wrap">
                        <div class="section-6__content ct--1">
                            <p>6 năm kinh nghiêm chuyên dạy cho học sinh mất gốc</p>
                        </div>
                        <div class="section-6__image">
                            <img src="https://i.pinimg.com/736x/2c/2c/1a/2c2c1a72179188c371cd46ae59894392.jpg"
                                alt="" />
                            <div class="section-6__quote">
                                "Tiếng Anh không khó, chỉ cần bắt đầu đúng cách – và bạn sẽ không đi một mình"
                            </div>
                        </div>
                        <div class="section-6__content">
                            <div class="section-6__info">
                                <h3>Giáo viên phụ trách</h3>
                                <h1>NGUYỄN THU TRÀ</h1>
                            </div>
                            <div class="section-6__info if--1">
                                Sáng lập MGTA English
                            </div>
                        </div>
                    </div>
                    <div class="section-6__profile">
                        <div class="profile__box">
                            <h2 class="profile__title" style={{color: "#e88ec6"}}>Học tập</h2>
                            <ul>
                                <li>Tốt nghiệp loại giỏi (Upper-second Division) ngành Quản Trị Kinh Doanh - Chương trình liên
                                    kết quốc
                                    tế (Top-Up) University of the West of England</li>
                                <li>Chứng chỉ tiếng Anh TEG - Level 4</li>
                            </ul>
                        </div>

                        <div class="profile__box">
                            <h2 class="profile__title" style={{color: "#69dfe1"}}>Kinh nghiệm</h2>
                            <ul>
                                <li>6 năm chuyên dạy kèm tiếng Anh mất gốc dành cho học sinh cấp 2 từ lớp 6–9 theo chương trình
                                    của BGD
                                    (sách giáo khoa Global Success)</li>
                                <li>2 năm dạy kèm chương trình tiếng Anh Cambridge Vinschool tiểu học</li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}