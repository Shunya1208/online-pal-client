import React from "react";
import classes from "./NavigationItem.module.css";
import { Link } from "react-router-dom";

const NavigationItem = (props) => {
    
   return (
    <li onClick={props.close} className={classes.NavigationItem} >
        <Link to={props.path} style={{color:"white",textDecoration:"none"}}>{props.name}</Link>
    </li>
    )
};

export default NavigationItem;