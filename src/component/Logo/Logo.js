import React from "react";
import classes from "./Logo.module.css"
import { Link } from "react-router-dom"

import earthLogo from "../../assets/images/logo.png";

const Logo = (props) => (
    <Link className={classes.Logo} to={props.path} onClick={props.click}>
        <img src={earthLogo} alt="Earth"/>
    </Link>
);

export default Logo;