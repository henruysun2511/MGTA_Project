export default function Container({ children }){
    const style = {
        margin: "0 200px"
    }
    return (
        <div className="container" style={style}>
              {children}
        </div>
    )
};