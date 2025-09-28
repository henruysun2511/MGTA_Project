import './container.scss';

export default function Container({ children }){
    const style = {
        padding: "0 350px"
    }
    return (
        <div className="responsive-container" style={style}>
              {children}
        </div>
    )
};



