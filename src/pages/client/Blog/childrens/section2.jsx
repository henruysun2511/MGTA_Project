import { Input } from 'antd';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../../../components/Container";
import { fetchAction } from '../../../../redux/actions/baseAction';
import { getAllData } from '../../../../services/baseService';
import BlogItem from './BlogItem';
const { Search } = Input;

export default function Section2() {
    const dispatch = useDispatch();
    const blogData = useSelector((state) => state.blogs.list) || [];

    useEffect(() => {
        getAllData("blogs").then((res) => { 
            dispatch(fetchAction("blogs", res)); 
        });
    }, [dispatch]);

    const [searchText, setSearchText] = useState("");
    const blogRefs = useRef({}); // lưu ref theo id

    const filteredBlogs = blogData.filter(blog =>
        blog.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleScrollTo = (id) => {
        blogRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

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

                <div className="blog__wrap">
                    <div className="blog__overview">
                        <h3>Blog mới nhất</h3>
                        {blogData.map(blog => (
                            <div
                                key={blog.id}
                                className="blog__index"
                                onClick={() => handleScrollTo(blog.id)}
                            >
                                <i className="fa-solid fa-blog"></i>
                                {blog.title}
                            </div>
                        ))}
                    </div>

                    <div className="blog__list">
                        {filteredBlogs.map(blog => (
                            <div
                                key={blog.id}
                                ref={(el) => (blogRefs.current[blog.id] = el)}
                            >
                                <BlogItem blog={blog} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
