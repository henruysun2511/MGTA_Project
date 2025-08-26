export default function Container({ children }){
    const style = {
        margin: "0 350px"
    }
    return (
        <div style={style}>
              {children}
        </div>
    )
};



