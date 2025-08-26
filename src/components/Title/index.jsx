import "./Title.scss"
export default function Title({ title, subtitle }) {
    return (
        <>
            <h2 className="title">{title}</h2>
            <h3 className="subtitle">{subtitle}</h3>
            <div className="line"></div>
        </>
    )
}
