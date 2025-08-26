export default function Container2({ children }){
     const style = {
        margin: "0 230px"
    }
    return (
        <div style={style}>
              {children}
        </div>
    );
}
