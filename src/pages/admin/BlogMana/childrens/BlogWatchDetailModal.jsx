import { Modal } from "antd"
import BlogItem from "./BlogItem"
export default function BlogWatchDetailModal({ open, onCancel, record }) {
    return (
        <>
            <Modal open={open} onCancel={onCancel} footer={null} width={750}>
                <BlogItem blog={record} />
            </Modal>
        </>
    )

}