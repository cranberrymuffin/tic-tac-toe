const Square = (props) => {
    return (<div id={props.id} className="square" onClick={() => {
        props.handleClick()
    }
    }>
        {props.data === "cross" && <div className="cross"></div>}
        {props.data === "circle" && <div className="circle"></div>}
    </div>);
}

export default Square