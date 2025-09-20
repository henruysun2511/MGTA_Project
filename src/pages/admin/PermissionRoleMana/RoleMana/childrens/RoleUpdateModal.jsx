import { Button, Col, Form, Input, Modal, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../../../../hooks/useFetch';
import useQuery from '../../../../../hooks/useQuery';
import { handleUpdate } from '../../../../../utils/handles';
import PermissionCard from './PermissionCard';

export default function RoleUpdateModal({ open, onCancel, record }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (open && record) {
            form.setFieldsValue({
                name: record.name || "",
                description: record.description || ""
            });
            setSelectedPermissions(record.permissions || []);
        }
    }, [open, record, form]);

    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 8,
    });

    const [data] = useFetch("admin/permission/permissions", query, {});

    const permissionData = data.permissions?.items || [];

    const permissionGrouped = permissionData.reduce((acc, item) => {
        if (!acc[item.module]) {
            acc[item.module] = [];
        }
        acc[item.module].push(item);
        return acc;
    }, {});

    const handlePageChange = (page, pageSize) => {
        updateQuery({
            page: page,
            limit: pageSize
        });
    };

    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const handlePermissionSelect = (id, checked) => {
        setSelectedPermissions(prev =>
            checked ? [...prev, id] : prev.filter(pid => pid !== id)
        );
    };

    const handleUpdateRole = async (values) => {
        const options = {
            ...values,
            permissions: selectedPermissions,  
        };
        await handleUpdate(dispatch, "admin/role", "roles", record._id, options, () => onCancel());
    };

    return (<>
        <Modal
            open={open}
            title="Chỉnh sửa vai trò"
            onCancel={onCancel}
            footer={null}
            width={1500}
        >
            <Form layout="vertical" form={form} onFinish={handleUpdateRole}>
                <Form.Item
                    name="name"
                    label="Vai trò"
                    rules={[{ required: true, message: 'Vui lòng nhập vai trò' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Quyền hạn"
                >
                    <div className="permission__list">
                        {
                            Object.keys(permissionGrouped).map(module => (
                                <div className="permission__card" key={module}>
                                    <h3>Module: {module}</h3>
                                    {permissionGrouped[module].map(item => (
                                        <PermissionCard
                                            key={item._id}
                                            permissionData={item}
                                            checked={selectedPermissions.includes(item._id)}
                                            onChange={handlePermissionSelect}
                                        />
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                    <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                        {data?.permissions?.pagination && (
                            <Pagination
                                current={data.permissions.pagination.currentPage}
                                pageSize={data.permissions.pagination.limit}
                                total={data.permissions.pagination.count}
                                onChange={handlePageChange}
                                showSizeChanger
                                pageSizeOptions={['8', '20', '50']}
                            />
                        )}
                    </div>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                >
                    <Input />
                </Form.Item>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </Col>
            </Form>
        </Modal>
    </>)
}