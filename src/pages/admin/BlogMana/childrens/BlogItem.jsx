import { Image } from 'antd';
import { useEffect, useState } from 'react';
import GV from "../../../../assets/images/gv.png";
import useFetch from '../../../../hooks/useFetch';

export default function BlogItem({ key, blog }) {
    const [blogDataById] = useFetch(`admin/blog/blog-detail/${blog._id}`, {}, {});

    const [currentIndex, setCurrentIndex] = useState(0);
    const h4Matches = blogDataById?.content?.match(/<h4>(.*?)<\/h4>/g) || [];
    const tags = h4Matches.map(h4 => h4.replace(/<\/?h4>/g, ""));

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? blogDataById?.images?.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === blogDataById?.images?.length - 1 ? 0 : prev + 1
        );
    };

    useEffect(() => {
        setCurrentIndex(0);
    }, [blogDataById]);

    return (
        <>{
            blogDataById && (
                <div className="blog__item" key={blogDataById._id}>
                    <div className="blog__writer">
                        <div className="avatar">
                            <img src={GV} alt="anhdaidiengiaovien.png" />
                        </div>
                        <div className='blog__info'>
                            <p className="name">Nguyễn Thu Trà</p>
                            <div className="blog__time">{blogDataById.publishedAt}</div>
                        </div>
                    </div>

                    <h1 className="blog__title">{blogDataById.title}</h1>

                    <div
                        className="blog__content"
                        dangerouslySetInnerHTML={{
                            __html: blogDataById?.content?.replace(/<h4>.*?<\/h4>/g, "")
                        }}
                    />

                    {/*Slide ảnh */}
                    <div className="blog__image">
                        <div className="prev" onClick={prevSlide}>
                            <i className="fa-solid fa-angle-left"></i>
                        </div>
                        {Array.isArray(blogDataById?.images) && blogDataById.images.length > 0 ? (
                            <Image
                                style={{ width: "630px", height: "650px", objectFit: "cover" }}
                                width={"100%"}
                                src={blogDataById.images[currentIndex]}
                                alt={`blog-${currentIndex}`}
                            />
                        ) : (
                            <p>Không có ảnh</p>
                        )}
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
            )
        }
        </>
    )
}