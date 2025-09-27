import { EditTwoTone } from "@ant-design/icons";
import { Image, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import padding1 from "../../../components/Padding";
import useFetch from "../../../hooks/useFetch";
import { fetchAction } from "../../../redux/actions/baseAction";
import SettingUpdateModal from "./SettingUpdateModal";

export default function Overview() {
    const dispatch = useDispatch();
    const username = localStorage.getItem("username");
    const roleId = localStorage.getItem("roleId");
    const roleEnv = import.meta.env.VITE_ROLE_ID;

    const [settingDataRes] = useFetch("admin/setting", {}, {});
    const settingData = useSelector(state => state.settings.list || []);
    useEffect(() => {
        if (settingDataRes) {
            dispatch(fetchAction("settings", [settingDataRes]));
        }
    }, [dispatch, settingDataRes]);

    const [openEditSettingModal, setOpenEditSettingModal] = useState(false);
    
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ ...padding1, marginRight: "20px" }}>
                    <h3>Thông tin chung</h3>
                    <p>Username: <strong>{username || "N/A"}</strong></p>
                    {
                        roleId === roleEnv && <p>Role: <strong>Admin</strong></p>
                    }
                </div>
                <div style={{ ...padding1, position: "relative" }}>
                    <h3>Thông tin trang web</h3>
                    {
                        settingData && (
                            <>
                                <p>email: <strong>{settingData[0]?.email || "N/A"}</strong></p>
                                <p>facebook: <strong>{settingData[0]?.fb || "N/A"}</strong></p>
                                <p>hotline: <strong>{settingData[0]?.hotline || "N/A"}</strong></p>
                                <p>phone: <strong>{settingData[0]?.phone || "N/A"}</strong></p>
                                <p>website: <strong>{settingData[0]?.webName || "N/A"}</strong></p>
                                <p>logo:</p>
                                <Image
                                    width={150}
                                    height={150}
                                    src={settingData[0]?.logo || ""}
                                    alt="logo.png"
                                    style={{objectFit: "cover"}}
                                    preview={false}
                                />
                            </>
                        )
                    }
                    <div className="button__delete"
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            border: "1px solid blue",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "18px",
                            padding: "5px"
                        }}
                        onClick={() => setOpenEditSettingModal(true)}>
                        <Tooltip title="Chỉnh sửa">
                            <EditTwoTone />
                        </Tooltip>
                    </div>
                </div>
            </div >

            <SettingUpdateModal open={openEditSettingModal} onCancel={() => setOpenEditSettingModal(false)} settingData={settingData} />
        </>
    )
}