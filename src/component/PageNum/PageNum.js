import React from "react";
import classes from "./PageNum.module.css"

const PageNum = (props) => {
    let pageNumClass = [classes.PageNum];
    if(props.type === "green") {
        pageNumClass =[classes.PageNum,classes.Green]
    }

    return (
        <div className={pageNumClass.join(" ")} onClick={props.change}>
            {props.children}
        </div>
    )
};

export default PageNum;