import { BellFilled, BookOutlined, ScheduleOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import useQuery from '../../hooks/useQuery';
import { fetchAction } from '../../redux/actions/baseAction';

export default function NofiticationStudent() {
    const dispatch = useDispatch();
    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 10
    });
    const notificationData = useSelector(state => state.notifications.list || []);
    const [data] = useFetch("notification/notifications", query, {});
    console.log(notificationData);
    useEffect(() => {
        if (data) {
            dispatch(fetchAction("notifications", data.notifications?.items));
        }
    }, [data, dispatch]);

    const nofiticationItems = [
        ...(notificationData || []).map((ntf, index) => {
            let bgColor = "#f0f0f0";
            let iconColor = "#f0f0f0";
            let IconComp = BellFilled;

            switch (ntf.type) {
                case "UPLOAD_SCHEDULE":
                    bgColor = "#e6f7e6";
                    iconColor = "#38db43ff";
                    IconComp = ScheduleOutlined;
                    break;
                case "ASSIGN_EXERCISE":
                    bgColor = "#fffbe6";
                    iconColor = "#db8f38ff";
                    IconComp = BookOutlined;
                    break;
                default:
                    bgColor = "#f5f5f5";
                    IconComp = UsergroupAddOutlined;
            }

            return {
                key: index,
                label: (
                    <div className='nofitication__wrap' style={{ display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: bgColor, padding: '0 10px' }}>
                        <div className="nofitication__icon" style={{ backgroundColor: iconColor, borderRadius: '50%', padding: '10px' }}>
                            <IconComp style={{ fontSize: '25px' }} />
                        </div>
                        <div className='nofitication__content'>
                            <h3>{ntf.title ?? "N/A"}</h3>
                            <p>{ntf.message ?? "N/A"}</p>
                        </div>
                    </div>
                )
            }
        }),
        {
            key: "load-more",
            label: (
                <div
                    style={{
                        textAlign: "center",
                        color: "#1677ff",
                        cursor: "pointer",
                        fontWeight: 500,
                        padding: "8px 0"
                    }}
                    onClick={() => {
                        updateQuery({ limit: query.limit + 10 });
                    }}
                >
                    Xem thêm
                </div>
            )
        }
    ];

    return (
        <>
            <Dropdown
                menu={{ items: nofiticationItems }}
                placement="bottomRight"
                overlayStyle={{ maxHeight: 400, overflowY: "auto" }}
            >
                <BellFilled className='admin__icon-nofitication' />
            </Dropdown>
        </>
    )
}