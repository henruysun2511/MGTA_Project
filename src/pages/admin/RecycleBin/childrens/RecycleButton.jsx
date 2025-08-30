import { RetweetOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { handleRestoreAll } from "./RecycleHandle";

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
            </Space>
        </div>

    );
}