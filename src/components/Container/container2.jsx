import './container.scss';

export default function Container2({ children }) {
    const style = {
        padding: "0 230px"
    }
    return (
        <div className="responsive-container" style={style}>
            {children}
        </div>
    );
}
