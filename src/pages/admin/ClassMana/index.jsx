import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import padding1 from "../../../components/Padding";
import useFetch from '../../../hooks/useFetch';
import { createAction, fetchAction } from "../../../redux/actions/baseAction";
import { createData, updateData } from "../../../services/baseService";
import { alertError, alertSuccess } from "../../../utils/alerts";
import { handleDelete, handleUpdate } from "../../../utils/handles";
import "./ClassMana.scss";
import ClassTab from "./childrens/ClassTab";

export default function ClassMana() {
    const dispatch = useDispatch();
    const classData = useSelector((state) => state.classes.list || []);

    const [items, setItems] = useState([]);
    const [activeKey, setActiveKey] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const newTabIndex = useRef(0);
    const [form] = Form.useForm();

    const [classDataRes] = useFetch("admin/class/classes", {}, {});

    useEffect(() => {
        dispatch(fetchAction("classes", classDataRes?.classes?.items));
    }, [classDataRes, dispatch]);


    useEffect(() => {
        if (classData && classData.length > 0) {
            const mapped = classData.map((cls) => ({
                key: String(cls._id),
                label: <>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        {cls.className}
                        <EditOutlined onClick={() => {
                            setEditingClass(cls);
                            form.setFieldsValue({
                                className: cls.className
                            });
                            setOpenUpdateModal(true);
                        }} />
                    </div>
                </>,
                children: <ClassTab classId={cls._id} />,
            }));
            setItems(mapped);
            setActiveKey(String(mapped[0].key));
        }
    }, [classData]);

    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        setOpenModal(true);
    };

    const remove = async (targetKey) => {
        console.log(targetKey);
        const res = await handleDelete(dispatch, "admin/class", "classes", targetKey, "Lớp");
        if (res) {
            const affectedStudents = studentData.filter(st => String(st.classId) === String(targetKey));
            for (const st of affectedStudents) {
                await updateData("admin/student", st._id, { classId: "" });
            }
            alertSuccess("Đã xóa lớp và cập nhật học sinh");

            let newActiveKey = activeKey;
            let lastIndex = -1;
            items.forEach((item, i) => {
                if (item.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            const newPanes = items.filter((item) => item.key !== targetKey);
            if (newPanes.length && newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newPanes[lastIndex].key;
                } else {
                    newActiveKey = newPanes[0].key;
                }
            }
            setItems(newPanes);
            setActiveKey(newActiveKey);
        }
    };

    const onEdit = (targetKey, action) => {
        if (action === "add") {
            add();
        } else {
            remove(targetKey);
        }
    };

    const handleAddClass = async (value) => {
        const res = await createData("admin/class", value);
        if (res.statusCode === 201) {
            dispatch(createAction("classes", res));
            alertSuccess(res.message);
            const newActiveKey = `newTab${newTabIndex.current++}`;
            const newPanes = [...items, { label: res.className, children: <ClassTab classId={res._id} />, key: newActiveKey }];
            setItems(newPanes);
            setActiveKey(newActiveKey);
            setOpenModal(false);
        } else {
            alertError(res.message);
        }
    };

    const handleUpdateClass = async (value) => {
        const options = {
            ...value,
        }
        await handleUpdate(dispatch, "admin/class", "classes", editingClass._id, options, () => setOpenUpdateModal(false));
    }

    return (
        <>
            <div style={padding1}>
                <Tabs
                    type="editable-card"
                    items={items}
                    size="large"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={(targetKey, action) => onEdit(targetKey, action)}
                />
            </div>

            <Modal title="Thêm một lớp học mới"
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
                width={600}>
                <Form onFinish={handleAddClass}>
                    <Form.Item label="Tên lớp học" name="className">
                        <Input placeholder="Nhập tên lớp học" />
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">Thêm</Button>
                    </div>
                </Form>
            </Modal>

            <Modal title="Chỉnh sửa tên lớp"
                open={openUpdateModal}
                onCancel={() => setOpenUpdateModal(false)}
                footer={null}
                width={600}>
                <Form onFinish={handleUpdateClass} form={form}>
                    <Form.Item label="Tên lớp học" name="className">
                        <Input placeholder="Nhập tên lớp học" />
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </div>
                </Form>
            </Modal>
        </>

    );
}