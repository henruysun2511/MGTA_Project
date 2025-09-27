import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GV from "../../../../assets/images/gv.png";
import useFetch from '../../../../hooks/useFetch';
import Section1 from '../childrens/section1';

export default function BlogDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const cleanId = id.replace(/^:/, "");
    const [data] = useFetch(`blog/${cleanId}`, {}, {});
    const blog = data?.blog ? data?.blog : {};

    const [currentIndex, setCurrentIndex] = useState(0);
    const h4Matches = blog?.content?.match(/<h4>(.*?)<\/h4>/g) || [];
    const tags = h4Matches.map(h4 => h4.replace(/<\/?h4>/g, ""));

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? blog?.images?.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === blog?.images?.length - 1 ? 0 : prev + 1
        );
    };

    useEffect(() => {
        setCurrentIndex(0);
    }, [blog]);


    return (
        <>
            <Section1 />
            <div className='blog__wrap'>
                {
                    blog && (
                        <div className="blog__item" key={blog._id}>
                            <div className="blog__writer">
                                <div className="avatar">
                                    <img src={GV} alt="anhdaidiengiaovien.png" />
                                </div>
                                <div className='blog__info'>
                                    <p className="name">Nguyễn Thu Trà</p>
                                    <div className="blog__time">{blog.publishedAt}</div>
                                </div>
                            </div>

                            <h1 className="blog__title">{blog.title}</h1>

                            <div
                                className="blog__content"
                                dangerouslySetInnerHTML={{
                                    __html: blog?.content?.replace(/<h4>.*?<\/h4>/g, "")
                                }}
                            />

                            {/*Slide ảnh */}
                            <div className="blog__image">
                                <div className="prev" onClick={prevSlide}>
                                    <i className="fa-solid fa-angle-left"></i>
                                </div>
                                {Array.isArray(blog?.images) && blog.images.length > 0 ? (
                                    <Image
                                        style={{ width: "630px", height: "650px", objectFit: "cover" }}
                                        width={"100%"}
                                        src={blog.images[currentIndex]}
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
                <div className='button__back' onClick={() => navigate(-1)}>Thoát</div>
            </div>
        </>
    )
}