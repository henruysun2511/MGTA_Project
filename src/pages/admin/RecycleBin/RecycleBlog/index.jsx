import { Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { fetchAction } from '../../../../redux/actions/baseAction';
import RecycleButton from '../RecycleButton';
import RecycleBlogFilter from './childrens/RecycleBlogFilter';
import RecycleBlogTable from './childrens/RecycleBlogTable';
export default function RecycleBlog() {
    const dispatch = useDispatch();

    const [data] = useFetch("admin/blog/deletedBlogs", {}, {});
    console.log(data);

    useEffect(() => {
        if(data){
            dispatch(fetchAction("deletedblogs", data.deletedBlogs?.items));
        }
    }, [data, dispatch]);


    const blogData = useSelector((state) => state.deletedblogs.list || []) ;
    
    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <RecycleBlogFilter />
                <RecycleButton />
                <RecycleBlogTable blogData= {blogData}/>
            </Space>
        </>
    )
}