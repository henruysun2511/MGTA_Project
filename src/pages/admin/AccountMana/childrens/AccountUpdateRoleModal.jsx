import { Button, Form, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { alertConfirm } from '../../../../utils/alerts';
import { handleUpdate } from '../../../../utils/handles';

export default function AccountUpdateRoleModal({ open, onCancel, record }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [data] = useFetch("admin/role/roles", {}, {});
    const roleData = data || [];

    useEffect(() => {
        if (open && record && roleData.length > 0) {
            const role = roleData.find(r => r._id === record.roleId || r.name === record.roleName);
            form.setFieldsValue({
                roleId: role ? role._id : ""
            });
        }
    }, [open, record, roleData, form]);

    const roleOptions = roleData.map(rl => ({
        label: rl.name,
        value: rl._id
    }));


    const handleUpdateRole = async (values) => {
        const result = await alertConfirm("Bạn có chắc chắn cập nhật vai trò cho tài khoản này?", "", "Xác nhận", "Hủy");
        if (result.isConfirmed) {
            const options = {
                ...values,
                username: record.username
            }
            await handleUpdate(dispatch, 'admin/account', "accounts", record._id, options, () => onCancel());
        }
    };

    return (
        <Modal
            title={"Chỉnh sửa vai trò"}
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleUpdateRole} form={form}>
                <Form.Item
                    name="roleId"
                    label="Chọn vai trò"
                    rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                >
                    <Select placeholder="Chọn vai trò" options={roleOptions} />
                </Form.Item>

                <div style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </div>
            </Form>
        </Modal>
    );
}
