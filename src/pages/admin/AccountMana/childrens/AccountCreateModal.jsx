import { Button, Col, Form, Input, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { alertError } from '../../../../utils/alerts';
import { handleCreate } from '../../../../utils/handles';

export default function AccountCreateModal({ open, onCancel}) {
    const dispatch = useDispatch();

    const [data] = useFetch("admin/role/roles", {}, {});
    const roleData = data || []; 

    const roleOptions = roleData.map(rl => ({
        label: rl.name,
        value: rl._id
    }));

    const handleCreateAccount = async (values) => {
        if(values.password !== values.rePassword){
            alertError("Mật khẩu nhập không trùng khớp","");
            return;
        }
        const options = {
            username: values.username,
            email: values.email,
            password: values.password,
            roleId: values.roleId
        }
        console.log(options)
        await handleCreate(dispatch, "admin/account", "accounts", options, () => onCancel());
    };

    return (<>
        <Modal
            open={open}
            title={`Thêm tài khoản mới`}
            onCancel={onCancel}
            footer={null}
            width={500}
        >
            <Form layout="horizontal" onFinish={handleCreateAccount}>
                 <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập mật username'}]}
                >
                    <Input />
                </Form.Item>
                 <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu mới"
                    name="rePassword"
                    rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }]}
                >
                    <Input.Password />
                </Form.Item>
                 <Form.Item
                    name="roleId"
                    label="Chọn vai trò"
                    rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                >
                    <Select placeholder="Chọn vai trò" options={roleOptions} />
                </Form.Item> 

                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </Col>
            </Form>
        </Modal>
    </>)
}