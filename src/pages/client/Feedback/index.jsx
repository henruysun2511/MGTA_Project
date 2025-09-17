import Section1 from "./childrens/section1";
import Section2 from "./childrens/section2";
import Section3 from "./childrens/section3";
import Section4 from "./childrens/section4";
import Section5 from "./childrens/section5";
import "./feedback.scss";

function Feedback() {
    return (
        <>
            <Section1 />
            <Section3 />
            <Section5 />
            <Section2 />
            <Section4 />
        </>
    );
}

export default Feedback;