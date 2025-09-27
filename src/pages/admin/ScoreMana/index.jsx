import { Pagination, Space } from 'antd';
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import padding1 from "../../../components/Padding";
import useFetch from '../../../hooks/useFetch';
import { fetchAction } from '../../../redux/actions/baseAction';
import ScoreFilter from './childrens/ScoreFilter';
import ScoreTable from './childrens/ScoreTable';

export default function ScoreMana() {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({ search: "", sort: "all" });

    const [data] = useFetch("admin/exercise/results", {}, {});

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("results", data.results?.items));
        }
    }, [data, dispatch]);

    const resultData = useSelector((state) => state.results.list || []);

    const filteredData = useMemo(() => {
        let temp = [...resultData];

        if (filters.search) {
            temp = temp.filter((item) =>
                item.studentId?.name.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        switch (filters.sort) {
            case "asc/duration":
                temp.sort((a, b) => a.duration - b.duration);
                break;
            case "dsc/duration":
                temp.sort((a, b) => b.duration - a.duration);
                break;
            case "asc/score":
                temp.sort((a, b) => a.score - b.score);
                break;
            case "dsc/score":
                temp.sort((a, b) => b.score - a.score);
                break;
            default:
                break;
        }

        return temp;
    }, [resultData, filters]);

    // callback từ ScoreFilter
    const handleFilterChange = ({ type, value }) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize,
        });
    };

    return (
        <div style={padding1}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <ScoreFilter onFilterChange={handleFilterChange} />

                <ScoreTable resultData={filteredData} pagination={data?.results?.pagination} />

                {data?.results?.pagination && (
                    <Pagination
                        current={data.results.pagination.currentPage}
                        pageSize={data.results.pagination.limit}
                        total={data.results.pagination.count}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={["5", "10", "20", "50"]}
                    />
                )}
            </Space> 
        </div>
    );
}
