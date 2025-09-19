import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../hooks/useFetch";
import { fetchAction } from "../../../../redux/actions/baseAction";
import RoleCard from "./childrens/RoleCard";
import RoleCreateModal from "./childrens/RoleCreateModal";
import './roleMana.scss';

export default function RoleMana() {
    const dispatch = useDispatch();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [data] = useFetch("admin/role/roles", {}, {});

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("roles", data));
        }
    }, [data, dispatch]);

    const roleData = useSelector(state => state.roles.list || []);

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