import { DeleteOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { handleDeleteAll, handleRestoreAll } from "../../../utils/handles";

export default function RecycleButton({ dispatch, apiPth, reduxPath, list }) {
    return (
        <div style={{ textAlign: "right" }}>
            <Space size="middle" >
                <Button
                    icon={<RetweetOutlined />}
                    type="primary"
                    size="large"
                    onClick={() => handleRestoreAll(dispatch, apiPth, reduxPath, list)}
                >
                    Khôi phục tất cả
                </Button>
                <Button
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                    size="large"
                    onClick={() => handleDeleteAll(dispatch, apiPth, reduxPath, list)}
                >
                    Xóa tất cả
                </Button>
            </Space>
        </div>

    );
}