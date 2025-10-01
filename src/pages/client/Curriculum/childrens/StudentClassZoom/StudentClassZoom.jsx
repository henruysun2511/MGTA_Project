import { Calendar, Col, Row } from "antd";
import dayjs from "dayjs";
import useFetch from "../../../../../hooks/useFetch";
import useViewport from "../../../../../hooks/useViewport";
import { formatTimeFromApi } from "../../../../../utils/formatDate";

export default function StudentClassZoom({ classId }) {
    const [data] = useFetch(`class-schedule/class-schedules/${classId}`, {}, {});
    const classScheduleData = data?.items ?? [];
    const accessToken = localStorage.getItem("accessToken");

    const viewPort = useViewport();
    const isMobile = viewPort.width <= 850;

    const onPanelChange = (value, mode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    // render cho từng ngày trong Calendar
    const dateCellRender = (value) => {
        const listData = classScheduleData.filter((cls) =>
            dayjs(cls.schedule).isSame(value, "day")
        );

        return (
            <ul className="schedule__list">
                {listData.map((item) => (
                    <li key={item._id} className="schedule__item">
                        <div className="schedule-info">
                            <p>{item.classSessionId?.classSessionName ?? "N/A"}</p>
                            <p>
                                {item.classSessionId?.startTime
                                    ? formatTimeFromApi(item.classSessionId?.startTime)
                                    : "00:00"}{" "}
                                -{" "}
                                {item.classSessionId?.endTime
                                    ? formatTimeFromApi(item.classSessionId?.endTime)
                                    : "00:00"}
                            </p>
                        </div>
                        {accessToken && (
                            <a
                                className="link"
                                href={item.linkZoom ?? ""}
                                target="_blank"
                                rel="noreferrer"
                            >
                                THAM GIA LỚP
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {isMobile ? (
                <ul className="schedule__list">
                    <Row gutter={[16, 16]} >
                    {classScheduleData.map((item) => (
                        <Col xs={24} sm={12} key={item._id}>
                        <li key={item._id} className="schedule__item">
                            <div className="schedule-info">
                                <p>{item.classSessionId?.classSessionName ?? "N/A"}</p>
                                <p>
                                    {item.classSessionId?.startTime
                                        ? formatTimeFromApi(item.classSessionId?.startTime)
                                        : "00:00"}{" "}
                                    -{" "}
                                    {item.classSessionId?.endTime
                                        ? formatTimeFromApi(item.classSessionId?.endTime)
                                        : "00:00"}
                                </p>
                            </div>
                            {accessToken && (
                                <a
                                    className="link"
                                    href={item.linkZoom ?? ""}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    THAM GIA LỚP
                                </a>
                            )}
                        </li>
                        </Col>
                    ))}
                    </Row>
                </ul>
            ) : (
                <Calendar onPanelChange={onPanelChange} cellRender={dateCellRender} />
            )}
        </>
    );
}
