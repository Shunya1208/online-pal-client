import React from "react";
import classes from "./H3.module.css"

const H3Text = (props) => {

    return (
        <div style={{textAlign: "center"}}><h3 className={classes.Sub} >{props.children}</h3></div>
    )
};

export default H3Text;