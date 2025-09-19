import { Select, Space } from "antd";
import Search from "antd/es/transfer/search";

export default function RecycleAccountFilter() {
    const options = [
        { value: "deletedAt", label: "Ngày xóa gần đây" },
        { value: "-deletedAt", label: "Ngày xóa xa nhất" },
        { value: "username", label: "Từ A-Z" },
        { value: "-username", label: "Từ Z-A" },
    ]
    return (<>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Search
                placeholder="Tìm kiếm tên phần đã xóa"
                size="large"
                style={{ width: "100%", fontSize: "18px" }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '35px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <p>Sắp xếp:</p>
                    <Select style={{ width: 120 }} options={options} defaultValue="deletedAt" />
                </div>
            </div>
        </Space>
    </>)
}