import React from "react";
import classes from "./H2.module.css"

const H2Text = (props) => {

    return (
        <div style={{textAlign: "center"}}><h2 className={classes.Sub} >{props.children}</h2></div>
    )
};

export default H2Text;