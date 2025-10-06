import { Collapse } from "antd";
import Container from "../../../../components/Container";
import Title from "../../../../components/Title";

export default function Section7() {

    const items = [
        {
            key: '1',
            label: 'Học sinh được học theo giáo trình nào?',
            children: <p>MGTA bám sát dạy theo giáo trình SGK
                Global Success của cấp 2, chương trình của bộ giáo dục để đảm bảo điểm số của các bạn ở trên lớp
            </p>,
        },
        {
            key: '2',
            label: 'Nền tảng học online có cố định và dễ sử dụnng không?',
            children: <p>Nền tảng học online qua Zoom Pro đảm bảo tính ổn định đường truyền mạng cho cả người dạy và học sinh tham gia lớp học, tránh bị thoát khỏi Zoom giữa chừng. Thông qua thời kì học online trong mùa Covid, các bạn cũng đã quen và dễ dàng sử dụng Zoom trên các thiết bị điện tử như điện thoại, iPad, Laptop.</p>,
        },
        {
            key: '3',
            label: 'Các bạn học sinh có được hỗ trợ kịp thời khi không hiểu bài không?',
            children: <p>Nếu các bạn đang trong buổi học, không hiểu bài thì hỏi cô giải đáp tức thời luôn ngay lúc đó. Hoặc ngoài thời gian học, các con không hiểu bài thì có thể nhắn hỏi bài cô qua Zalo.</p>,
        },
        {
            key: '4',
            label: 'Học online có hiệu quả như học trực tiếp không?',
            children: <p>Học online hay học trực tiếp không chỉ phụ thuộc vào phương pháp giảng dạy mà còn phụ thuộc vào sự nỗ lực, cố gắng của các bạn, đặc biệt là đối với lớp học đặc thù dành cho các bạn MGTA. Trong buổi học online cô và các bạn liên tục có sự tương tác qua lại liên tục để đảm bảo rằng các bạn nắm được nội dung bài học.</p>,
        },
        {
            key: '5',
            label: 'Lớp học online được tổ chức như nào? (lớp lớn, lớp nhỏ hay lớp 1:1)',
            children: <p>Lớp học MGTA online thường là lớp nhóm nhỏ 5–7 bạn, một số trường hợp đặc biệt học 1:1 để tăng cường, bổ sung kiến thức, cô giáo sát sao hơn và đảm bảo được học sinh nắm vững kiến thức, chậm mà chắc.</p>,
        },
        {
            key: '6',
            label: 'Nếu trong lúc học mạng bị lag và học sinh bị văng ra khỏi Zoom bị bỏ lỡ phần ghi chú cô giảng thì các con sẽ bổ sung lại phần đó như nào?',
            children: <p>Trường hợp hi hữu, trong lúc học các bạn bị văng ra khỏi Zoom thì cũng đừng lo bị bỏ lỡ phần ghi chú bài giảng, vì cuối mỗi buổi học, cô giáo sẽ gửi lại phần bài giảng đó vào nhóm chung hoặc zalo phụ huynh để các bạn có thể xem lại bài giảng, hoặc xem lại những phần chưa hiểu dễ dàng.</p>,
        },
        {
            key: '7',
            label: 'Nếu con vắng buổi học, có được học bù hoặc xem lại bài giảng không?',
            children: <p>Nếu vắng mặt trong buổi học chính, các bạn được xếp lịch học bù trong buổi học ghép với lớp khác, hoặc học bù 1:1 khi xếp được lịch học phù hợp.</p>,
        },
        {
            key: '8',
            label: 'Sau khóa học, các bạn học sinh sẽ đạt được gì?',
            children: <p>Sau khóa học thường thì khoảng 1 học kì, kết quả các bạn mất gốc tiếng Anh sẽ được cải thiện dần dần ở mức trung bình khá, đảm bảo 5,6+.</p>,
        },
        {
            key: '9',
            label: 'Có chính sách học thử miễn phí trước khi đăng kí cho con học lớp học online không?',
            children: <p>Hiểu được nhu cầu lăn tăn, cân nhắc về lớp học mất gốc tiếng anh Online, MGTA hằng tuần có lịch lớp học thử cố định cho các bạn trải nghiệm về phương pháp học hiệu quả và tài liệu học.</p>
        }
    ];

    return (

        <div className="about-us__section-7">
            <Container>
                <div className="section-7__wrap">
                    <Title title="Câu hỏi thường gặp" />

                    <Collapse items={items} defaultActiveKey={['1']} className="custom-collapse" />
                </div>
            </Container>
        </div>
    )
}