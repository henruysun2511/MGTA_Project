import { Calendar } from "antd";
import dayjs from "dayjs";

export default function StudentClassZoom({ classScheduleData, classSessionData }) {
    const onPanelChange = (value, mode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const dateCellRender = (value) => {
        // lọc ra các lịch trùng với ngày hiện tại
        const listData = classScheduleData.filter((cls) =>
            dayjs(cls.schedule).isSame(value, "day")
        );

        return (
            <ul className="events">
                {listData.map((item) => {
                    // tìm session theo classSessionId
                    const session = classSessionData.find(
                        (cs) => String(cs.id) === String(item.classSessionId)
                    );

                    return (
                        <div key={item.id} className="schedule__item">
                            <div className="schedule-info">
                                {session ? session.name : "Chưa rõ ca"}
                            </div>
                            <a
                                className="link"
                                href={item.linkZoom}
                                target="_blank"
                                rel="noreferrer"
                            >
                                THAM GIA LỚP (ZOOM)
                            </a>
                        </div>
                    );
                })}
            </ul>
        );
    };

    return (
        <Calendar
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
        />
    );
}