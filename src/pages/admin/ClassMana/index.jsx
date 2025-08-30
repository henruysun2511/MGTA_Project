import { Button, Form, Input, Modal, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import padding1 from "../../../components/Padding";
import { createAction, fetchAction, softDeleteAction } from "../../../redux/actions/baseAction";
import { createData, getAllData, updateData } from "../../../services/baseService";
import "./ClassMana.scss";
import ClassTab from "./childrens/ClassTab";

export default function ClassMana() {
    const dispatch = useDispatch();
    const classData = useSelector((state) => state.classes.list);
    const studentData = useSelector((state) => state.students.list).filter(st => !st.deleted);

    const [items, setItems] = useState([]);
    const [activeKey, setActiveKey] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const newTabIndex = useRef(0);

    useEffect(() => {
        getAllData("classes").then((res) => {
            dispatch(fetchAction("classes", res));
        });
         getAllData("students").then((res) => {
            dispatch(fetchAction("students", res));
        });
    }, [dispatch]);

    useEffect(() => {
        if (classData && classData.length > 0) {
            const mapped = classData.map((cls) => ({
                key: String(cls.id),
                label: cls.className,
                children: <ClassTab classId={cls.id} />,
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
        dispatch(softDeleteAction("classes", targetKey));
        const res = await updateData("classes", targetKey, { deleted: true });
        if (res) {
            const affectedStudents = studentData.filter(st => String(st.classId) === String(targetKey));
            for (const st of affectedStudents) {
                await updateData("students", st.id, { classId: "" });
            }
            alert("Đã xóa lớp và cập nhật học sinh");

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
        const res = await createData("classes", value);
        if (res) {
            dispatch(createAction("classes", res));
            alert("Thêm lớp học thành công");
            const newActiveKey = `newTab${newTabIndex.current++}`;
            const newPanes = [...items, { label: res.className, children: <ClassTab classId={res.id} />, key: newActiveKey }];
            setItems(newPanes);
            setActiveKey(newActiveKey);
            setOpenModal(false);
        } else {
            alert("Thêm lớp học thất bại");
        }
    };

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
        </>

    );
}
