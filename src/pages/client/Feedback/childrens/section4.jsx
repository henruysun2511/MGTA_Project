import Container2 from "../../../../components/Container/container2";
import Title from "../../../../components/Title";

export default function Section4() {
    return (
        <>
            <div class="feedback__section-4">
                <Container2>
                    <Title title={"Feedback từ học viên"} subtitle={"Lắng nghe chia sẻ thực tế từ những học sinh đã tham gia lớp học"} />
                    {/* <div class="search">
                        <input type="text" placeholder="Để lại feeback cho cô Trà nè!" />
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div> */}

                    <div class="feedback__list">
                        <div class="feedback__item">
                            <div class="feedback__avatar">
                                <img src="https://foto.sondakika.com/haber/2025/06/25/anlasma-saglandi-cristiano-ronaldo-imzayi-atiyor-18788528_2797_amp.jpg"
                                    alt="avatar" />
                            </div>
                            <div class="feedback__content">
                                <h4>Minh Anh – Lớp 7</h4>
                                <div class="stars">⭐⭐⭐⭐⭐</div>
                                <p>Trước khi học em không biết bắt đầu từ đâu, nhưng sau khoá học với cô Trà em đã tự tin hơn
                                    rất nhiều. Bài giảng dễ hiểu và rất tận tâm ạ!</p>
                            </div>
                        </div>

                        <div class="feedback__item">
                            <div class="feedback__avatar">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                    alt="avatar" />
                            </div>
                            <div class="feedback__content">
                                <h4>Quốc Khánh – Lớp 9</h4>
                                <div class="stars">⭐⭐⭐⭐</div>
                                <p>Em thích nhất là cô chữa bài kỹ và luôn khuyến khích học sinh hỏi lại nếu chưa hiểu. Sau khóa
                                    học em lên được 7.5 điểm tiếng Anh!</p>
                            </div>
                        </div>

                        <div class="feedback__item">
                            <div class="feedback__avatar">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO4M0a7-HyEPv1AWnjPPnOnd2pq9rqXxW5mQ&s://foto.sondakika.com/haber/2025/06/25/anlasma-saglandi-cristiano-ronaldo-imzayi-atiyor-18788528_2797_amp.jpg"
                                    alt="avatar" />
                            </div>
                            <div class="feedback__content">
                                <h4>Lan Hương – Lớp 8</h4>
                                <div class="stars">⭐⭐⭐⭐⭐</div>
                                <p>Em từng mất gốc tiếng Anh, giờ thì đã nắm chắc ngữ pháp và biết cách học từ vựng hiệu quả.
                                    Cảm ơn cô rất nhiều!</p>
                            </div>
                        </div>
                        <div class="feedback__item">
                            <div class="feedback__avatar">
                                <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yMjEtdi5qcGc.jpg"
                                    alt="avatar" />
                            </div>
                            <div class="feedback__content">
                                <h4>Hoàng Nam – Lớp 9</h4>
                                <div class="stars">⭐⭐⭐⭐</div>
                                <p>Khoá học giúp em lấy lại căn bản, đặc biệt là phần cô cho luyện tập thêm ở nhà rất hữu ích. Giờ em tự tin hơn trước khi thi vào 10.</p>
                            </div>
                        </div>
                        <div class="feedback__item">
                            <div class="feedback__avatar">
                                <img src="https://lh3.googleusercontent.com/proxy/tjqneXGCDYCm0bSauFRcbuUn2goqg1hl1CFF_KTKzmnpM6HWHqJe1fzosQMFOJYQEG1YG-V2B3kzu8rVkbDLvkzphs-ijgsQpjKBExD1Wb-U1Uv879nkJWPFtrSg0vfVTw"
                                    alt="avatar" />
                            </div>
                            <div class="feedback__content">
                                <h4>Minh Hoàng – Lớp 8</h4>
                                <div class="stars">⭐⭐⭐⭐⭐</div>
                                <p>Trước đây em toàn đoán bừa trong bài kiểm tra 😭 Sau khóa học này thì hiểu bản chất hơn nhiều, cô giải thích kỹ mà vui tính nữa. Em bắt đầu thích học lại rồi!</p>
                            </div>
                        </div>
                        <div class="feedback__item">
                            <div class="feedback__avatar">

                                <img src="https://i.pinimg.com/originals/b0/d8/3c/b0d83cfc1162fa4aa7f036bf50caefdc.jpg" 
                                   alt="avatar" />
                            </div>
                            <div class="feedback__content">
                                <h4>Gia Hưng – Lớp 7</h4>
                                <div class="stars">⭐⭐⭐⭐⭐</div>
                                <p>Cô dạy kỹ và dễ hiểu, có lúc em hỏi mấy câu “ngớ ngẩn” mà cô vẫn kiên nhẫn trả lời 😂</p>
                            </div>
                        </div>
                        <div class="feedback__item">
                            <div class="feedback__avatar">
                                <img src="https://thichtrangtri.com/wp-content/uploads/2025/05/anh-anime-kirito-ngau.jpg"
                                    alt="avatar" />
                            </div>
                            <div class="feedback__content">
                                <h4>Phương Anh – Lớp 6</h4>
                                <div class="stars">⭐⭐⭐⭐⭐</div>
                                <p>Cô nhẹ nhàng lắm, dạy từng chút một nên em không thấy áp lực. Giờ mỗi lần làm bài được điểm cao là em nhớ tới cô 😆</p>
                            </div>
                        </div>
                    </div>
                </Container2>
            </div>
        </>
    )
}