import { useState } from "react";

export const usePagination = (pageSizeDefault = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeDefault);

  const paginate = (data) => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  };

  const getPagination = (total) => ({
    current: currentPage,
    pageSize,
    total,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
    onChange: (page, newPageSize) => {
      setCurrentPage(page);
      setPageSize(newPageSize);
    },
  });

  const getIndex = (index) => (currentPage - 1) * pageSize + index + 1;

  return { currentPage, pageSize, paginate, getPagination, getIndex };
};