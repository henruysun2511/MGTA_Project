import { DeleteOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { handleDeleteAll, handleRestoreAll } from "./RecycleHandle";

export default function RecycleButton({ dispatch, path, list }) {
    return (
        <div style={{ textAlign: "right" }}>
            <Space size="middle" >
                <Button
                    icon={<RetweetOutlined />}
                    type="primary"
                    size="large"
                    onClick={() => handleRestoreAll(dispatch, path, list)}
                >
                    Khôi phục tất cả
                </Button>
                <Button
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                    size="large"
                    onClick={() => handleDeleteAll(dispatch, path, list)}
                >
                    Xóa tất cả
                </Button>
            </Space>
        </div>

    );
}