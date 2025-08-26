import { Input } from 'antd';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GV from "../../../../assets/images/gv.png";
import Container from "../../../../components/Container";
import { fetchAction } from '../../../../redux/actions/baseAction';
import { getAllData } from '../../../../services/baseService';
const { Search } = Input;

export default function Section2() {
    const dispatch = useDispatch();

    useEffect(() => {
        getAllData("blogs").then((res) => { dispatch(fetchAction("blogs", res)); });
    }, [dispatch])

    const blogData = useSelector((state) => state.blogs.list);
    console.log(blogData);
    return (
        <>
            <div class="blog__section-2">
                <Container>
                    <div className='blog__search'>
                        <Search
                            placeholder="Tìm kiếm bài blog"
                            size="large"
                            style={{ width: "50%", fontSize: "18px" }}
                        />
                    </div>

                    <div class="blog__wrap">
                        <div class="blog__overview">
                            <h3>Blog mới nhất</h3>
                            <div class="blog__index active"><i class="fa-solid fa-blog"></i>Bí kíp đạt 8+ tiếng anh cùng cô Trà
                            </div>
                            <div class="blog__index"><i class="fa-solid fa-blog"></i>Từ vựng mới nhất</div>
                            <div class="blog__index"><i class="fa-solid fa-blog"></i>Này, đã học tiếng anh cùng cô Trà chưa?
                            </div>
                        </div>
                        <div class="blog__list">
                            <div class="blog__item">
                                <div class="blog__writer">
                                    <div class="avatar"><img src={GV} alt="" /></div>
                                    <div>
                                        <p class="name">Nguyễn Thu Trà</p>
                                        <div class="time">28 tháng 7</div>
                                    </div>
                                </div>
                                <h1 class="blog__title">GIẢI ĐÁP TẤT TẦN TẬT NHỮNG THẮC MẮC CỦA PHỤ HUYNH VỀ LỚP HỌC MGTA</h1>
                                <div class="blog__content">Phụ huynh vui lòng click vào ảnh để xem thêm chi tiết
                                    Giải đáp toàn diện trước khi đăng ký lớp học Mất Gốc Tiếng Anh</div>
                                <div class="blog__content">Việc bắt đầu lại từ đầu với tiếng Anh là một quyết định quan trọng.
                                    Hiểu
                                    được điều đó, MGTA Online luôn sẵn sàng giải đáp rõ ràng những câu hỏi phổ biến mà phụ huynh
                                    và
                                    học sinh thường gặp trước khi đăng ký khóa học. </div>
                                <div class="blog__conent">𝐌𝐆𝐓𝐀 𝐕𝐀̂̃𝐍 𝐋𝐈𝐄̂𝐍 𝐓𝐔̣𝐂 𝐓𝐔𝐘𝐄̂̉𝐍 𝐒𝐈𝐍𝐇 𝐍𝐀̆𝐌
                                    𝐇𝐎̣𝐂
                                    𝟐𝟎𝟐𝟓-𝟐𝟎𝟐𝟔
                                    Phụ huynh vui lòng đọc thêm thông tin lớp học ở Wesbite sau:
                                    https://far-longan-20e.notion.site/mgta-lop-hoc-tieng-anh...</div>

                                <div class="blog__image">
                                    <div class="prev"><i class="fa-solid fa-angle-left"></i></div>
                                    <img src="assets/images/blog1.jpg" alt="" />
                                    <div class="next"><i class="fa-solid fa-angle-right"></i></div>
                                </div>
                                <ul class="blog-tag">
                                    <li>#MatgoctiengAnh</li>
                                    <li>#mgta</li>
                                </ul>
                                <div class="blog__react">
                                    <i class="fa-regular fa-heart"></i>
                                    15
                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>


        </>
    )
}