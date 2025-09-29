import { Form, Input, Statistic } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../../../services/baseService';
import { alertError, alertSuccess, alertWarning } from '../../../../utils/alerts';
const { Countdown } = Statistic;

export default function Otp() {
    const email = sessionStorage.getItem("email");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 

    const handleEndtime = async () => {
        const alert = await alertWarning("Đã hết thời gian nhập mã", "");
        if (alert.isConfirmed) {
            navigate(-1);
        }
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        const options = {
            otp: values.otp,
            email: email
        }
        console.log(options)
        try {
            const res = await createData("auth/confirm-password", options);
            if (res.statusCode === 200) {
                alertSuccess("Thành công", "Xác thực tài khoản thành công");
                navigate("/auth/resetPassword");
            }
            console.log(res)
        } catch (error) {
            console.error(error);
            alertError("Có lỗi xảy ra với mã otp");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="forgot__wrap">
                <div className="login">
                    <div className="square--blue"></div>
                    <div className="square--yellow"></div>
                    <div className="square--pink"></div>
                    <div className="square--yellow-2"></div>
                    <h2>Nhập mã OTP</h2>

                    <Form className="login__form"
                        onFinish={handleSubmit}
                    >

                        <div className="login__item">
                            <Form.Item
                                label=""
                                name="otp"
                                rules={[{ required: true, message: 'Vui lòng nhập mã OTP' }]}
                            >
                                <Input.OTP
                                    length={8}
                                    size="large"
                                    separator={(i) => (
                                        <span style={{ color: i & 1 ? 'red' : 'blue', fontWeight: 'bold' }}>—</span>
                                    )}
                                />
                            </Form.Item>
                            <Countdown
                                style={{ textAlign: 'center' }}
                                title="Thời gian còn lại"
                                value={Date.now() + 1000 * 60 * 3}
                                format="mm:ss"
                                onFinish={handleEndtime}
                            />

                        </div>

                        <div className="login__button">
                            <button type="submit" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Xác nhận"}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}