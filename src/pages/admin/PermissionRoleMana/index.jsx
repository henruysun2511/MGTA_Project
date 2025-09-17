import { Tabs } from "antd";
import padding1 from "../../../components/Padding";
import PermissionMana from "./PermissionMana/index";
import RoleMana from "./RoleMana/index";

export default function PermissionRoleMana() {
    const items = [
        {
            key: 'permission',
            label: 'Quyền hạn',
            children: <PermissionMana />
        },
        {
            key: 'role',
            label: 'Vai trò',
            children: <RoleMana />
        }
    ]

    return (
        <>
            <div style={padding1}>
                <Tabs items={items} defaultValue={'permission'} size="large" centered/>
            </div>
        </>
    )
}