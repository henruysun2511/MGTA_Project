import { Tabs } from "antd";
import padding1 from "../../../components/Padding";
import ScheduleMana from "./ScheduleMana/index";
import SessionMana from "./SessionMana/index";

export default function ClassScheduleMana() {
    const items = [
        {
            key: "students",
            label: "Lịch học",
            children: <ScheduleMana/>,
        },
        {
            key: "exercises",
            label: "Ca học",
            children: <SessionMana />,
        },
    ];

    return (
        <>
            <div style={padding1}>
                <Tabs size="large" items={items} centered/>
            </div>
        </>
    )
}