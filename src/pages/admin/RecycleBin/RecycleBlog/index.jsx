import { Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import RecycleButton from '../RecycleButton';
import RecycleBlogTable from './childrens/RecycleBlogTable';

export default function RecycleBlog() {
    const dispatch = useDispatch();

    const [data] = useFetch("admin/blog/deletedBlogs", {}, {});
    console.log(data);

    const deletedBlog = data.deletedBlogs?.items.map(item => ({
        ...item, 
        deleted: true
    }));

    useEffect(() => {
        if(data){
            dispatch(fetchAction("deletedblogs", deletedBlog));
        }
    }, [data, dispatch]);


    const blogData = useSelector((state) => state.deletedblogs.list || []).filter(blog => blog.deleted) ;
    
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <RecycleButton />
                <RecycleBlogTable blogData= {blogData}/>
            </Space>
        </>
    )
}