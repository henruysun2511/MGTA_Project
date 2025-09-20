import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../hooks/useFetch";
import useQuery from "../../../../hooks/useQuery";
import { fetchAction } from "../../../../redux/actions/baseAction";
import PermissionCard from "./childrens/PermissionCard";
import PermissionCreateModal from "./childrens/PermissionCreateModal";
import "./permission.scss";

export default function PermissionMana() {
    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10,
    });
    const [data] = useFetch("admin/permission/permissions", query, {});

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("permissions", data.permissions?.items));
        }
    }, [data, dispatch]);

    const permissionData = useSelector(state => state.permissions.list || []);

    const permissionGrouped = permissionData.reduce((acc, item) => {
        if (!acc[item.module]) {
            acc[item.module] = [];
        }
        acc[item.module].push(item);
        return acc;
    }, {});

    console.log(permissionGrouped);

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    }; 
    return (
        <> 
            <Space size={"large"} direction="vertical" style={{ width: '100%' }}>
                <div style={{ textAlign: 'right' }}>
                    <Button size="large" icon={<PlusOutlined />} type="primary" onClick={() => setOpenCreateModal(true)}>Thêm quyền hạn</Button>
                </div>
                <div className="permission__list">
                    {
                        Object.keys(permissionGrouped).map(module => (
                            <div className="permission__card" key={module}>
                                <h3>Module: {module}</h3>
                                {permissionGrouped[module].map(item => (
                                    <PermissionCard key={item._id} permissionData={item} />
                                ))}
                            </div>
                        ))
                    }
                </div>
                 {data?.permissions?.pagination && (
                    <Pagination
                        current={data.permissions.pagination.currentPage}
                        pageSize={data.permissions.pagination.limit}
                        total={data.permissions.pagination.count}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['10', '20', '50']}
                    />
                )}
            </Space>

            <PermissionCreateModal open={openCreateModal} onCancel={() => setOpenCreateModal(false)}/>
        </>
    )
}