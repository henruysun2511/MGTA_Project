import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../hooks/useFetch";
import { fetchAction } from "../../../../redux/actions/baseAction";
import "../PermissionMana/permission.scss";
import RoleCard from "./childrens/RoleCard";
import RoleCreateModal from "./childrens/RoleCreateModal";
import './roleMana.scss';

export default function RoleMana() {
    const dispatch = useDispatch();
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [data] = useFetch("admin/role/roles", {}, {});
    console.log(data);

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("roles", data));
        }
    }, [data, dispatch]);

    const roleData = useSelector(state => state.roles.list || []);
    const permissionData = useSelector(state => state.permissions.list || []);

    

    const newRoleData = roleData.map(role => {
        return {
            ...role,
            permissions: role.permissions?.map(permissionId => {
                const permissionName = permissionData.find(per => per._id === permissionId)?.name || "";
                return {
                    _id: permissionId,
                    permissionName
                };
            }) || []
        };
    });

    console.log(newRoleData)

    return (
        <>
            <Space size={"large"} direction="vertical" style={{ width: '100%' }}>
                <div style={{ textAlign: 'left' }}>
                    <Button size="large" icon={<PlusOutlined />} type="primary" onClick={() => setOpenCreateModal(true)}>Thêm vai trò</Button>
                </div>
                <div className='role__list'>

                    {roleData.length > 0 && (
                        roleData.map((role, idx) => (
                            <RoleCard key={idx} role={role} />
                        )
                        )
                    )}
                </div>
            </Space>

            <RoleCreateModal open={openCreateModal} onCancel={() => setOpenCreateModal(false)} />
        </>
    )
}