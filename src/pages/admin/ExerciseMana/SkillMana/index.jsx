import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import padding1 from "../../../../components/Padding";
import useFetch from "../../../../hooks/useFetch";
import { fetchAction } from "../../../../redux/actions/baseAction";
import SkillCreateModal from "./childrens/SkillCreateModal";
import SkillTable from "./childrens/SkillTable";

export default function SkillMana() {
    const dispatch = useDispatch();
    const [data] = useFetch("admin/skill/skills", {}, {});
    const skillData = useSelector(state => state.skills.list || []);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (data) {
            dispatch(fetchAction("skills", data));
        }

    }, [data, dispatch]);


    return (
        <>
            <div style={padding1}>
                <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={"/admin/exerciseMana"}><Button size="large" icon={<ArrowLeftOutlined />}>Quay lại</Button></Link>
                    <Button size="large" type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>Thêm kĩ năng</Button>
                </div>
                <SkillTable skillData={skillData} />
            </div>

            <SkillCreateModal open={openModal} onCancel={() => setOpenModal(false)} />
        </>
    )
}