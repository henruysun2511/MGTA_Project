import { Calendar } from "antd";
import dayjs from "dayjs";
import useFetch from "../../../../../hooks/useFetch";
import { formatTimeFromApi } from "../../../../../utils/formatDate";

export default function StudentClassZoom({ classId }) {
    const [data] = useFetch(`class-schedule/class-schedules/${classId}`, {}, {});
    const classScheduleData = data?.items ? data.items : [];
    const accessToken = localStorage.getItem("accessToken");

    const onPanelChange = (value, mode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const dateCellRender = (value) => {
        // lọc ra các lịch trùng với ngày hiện tại
        const listData = classScheduleData.filter((cls) =>
            dayjs(cls.schedule).isSame(value, "day")
        );

        return (
            <ul className="schedule__list">
                {listData.map((item) => {
                    return (
                        <div key={item._id} className="schedule__item">
                            <div className="schedule-info">
                                <p>{item.classSessionId?.classSessionName ? item.classSessionId.classSessionName : "N/A"}</p>
                                <p>{item.classSessionId?.startTime ? formatTimeFromApi(item.classSessionId?.startTime) : "00:00"}
                                    -  {item.classSessionId?.endTime ? formatTimeFromApi(item.classSessionId?.endTime) : "00:00"}
                                </p>
                            </div>
                            {accessToken ? <a
                                className="link"
                                href={item.linkZoom ? item.linkZoom : ""}
                                target="_blank"
                                rel="noreferrer"
                            >
                                THAM GIA LỚP
                            </a> : ""
                            }
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