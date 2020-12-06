import React from "react";
import classes from "./User.module.css";
import { Link } from "react-router-dom";

const User = props => {
    let image = <img className={classes.Image} src={props.url} alt={props.name}/>


    if( props.type === "link"){
        image =(
            <Link className={classes.User} to={props.path} onClick={props.close}>
                <img src={props.url} alt={props.name}/>
            </Link>
        )
    }

    return image
    
};

export default User;