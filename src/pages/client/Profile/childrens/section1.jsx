import { useSelector } from "react-redux";
import Container2 from "../../../../components/Container/container2";

export default function Section1() {
    const username = localStorage.getItem("username");
    const studentData = useSelector(state => state.students.list || []); 
    const baseAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Timoth%C3%A9e_Chalamet_in_2018_%28cropped%29.jpg/250px-Timoth%C3%A9e_Chalamet_in_2018_%28cropped%29.jpg";
    const newAvatar = studentData ? studentData[0]?.image : null;
    return (
        <>
            <div className="profile__section-1">
                <div className="wallpaper">
                    <img src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg" alt="" />
                </div>
                <Container2>
                    <div className="section-1__wrap">
                        <div className="profile__image">
                            <img src={newAvatar ? newAvatar : baseAvatar} alt="" />
                        </div>
                        <div className="profile__content">
                            <h3>{studentData[0]?.name  || "N/A"}</h3>
                            <p>@{username}</p>
                        </div>
                    </div>
                </Container2>
            </div>
        </>
    )
}