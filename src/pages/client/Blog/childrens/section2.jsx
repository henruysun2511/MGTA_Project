import { Col, Input, Row } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Container from "../../../../components/Container";
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import { formatDateFromApi } from '../../../../utils/formatDate';
const { Search } = Input;

export default function Section2() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blogData = useSelector((state) => state.blogs.list) || [];
    const [data] = useFetch("blog/blogs", {}, {});

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("blogs", data?.blogs?.items));
        }
    }, [dispatch, data]);

    const [searchText, setSearchText] = useState("");

    const filteredBlogs = blogData.filter(blog =>
        blog.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="blog__section-2">
            <Container>
                <div className='blog__search'>
                    <Search
                        placeholder="Tìm kiếm bài blog"
                        size="large"
                        style={{ width: "50%", fontSize: "18px" }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div className="blog__list">
                    <Row gutter={[20, 20]}>
                        {filteredBlogs.map((blog) => (
                            <Col
                                key={blog._id}
                                xs={24}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={8}
                            >
                                <div className='blog__card' key={blog._id} onClick={() => navigate(`/blogDetail/:${blog._id}`)}>
                                    <div className="blog__image">
                                        <img src={blog.images[0] || ""} alt="blog.png" />
                                    </div>
                                    <p className="blog__published">{formatDateFromApi(blog.publishedAt) || "N/A"}</p>
                                    <h3 className="blog__title">{blog.title || "N/A"}</h3>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    );
}
