import { Image } from 'antd';
import { useState } from 'react';
import GV from "../../../../assets/images/gv.png";
import { formatDateFromApi } from '../../../../utils/formatDate';

export default function BlogItem({ key, blog }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const h4Matches = blog.content.match(/<h4>(.*?)<\/h4>/g) || [];
    const tags = h4Matches.map(h4 => h4.replace(/<\/?h4>/g, ""));

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? blog.images.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === blog.images.length - 1 ? 0 : prev + 1
        );
    };


    return (<>
        <div className="blog__item" key={blog.id}>
            <div className="blog__writer">
                <div className="avatar">
                    <img src={GV} alt="anhdaidiengiaovien.png" />
                </div>
                <div>
                    <p className="name">Nguyễn Thu Trà</p>
                    <div className="time">{formatDateFromApi(blog.publishedAt)}</div>
                </div>
            </div>

            <h1 className="blog__title">{blog.title}</h1>

            <div
                className="blog__content"
                dangerouslySetInnerHTML={{
                    __html: blog.content.replace(/<h4>.*?<\/h4>/g, "")
                }}
            />

            {/*Slide ảnh */}
            <div className="blog__image">
                <div className="prev" onClick={prevSlide}>
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <Image
                    width={"100%"}
                    src={blog.images[currentIndex]}
                    alt={`blog-${currentIndex}`}
                />
                <div className="next" onClick={nextSlide}>
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>

            {/* hiển thị tag từ h4 */}
            <ul className="blog__tag">
                {tags.map((tag, i) => (
                    <li key={i}>#{tag}</li>
                ))}
            </ul>
        </div>
    </>)
}