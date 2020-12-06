import React from 'react';
import classes from "./TestLogin.module.css";

const TestLogin = (props) => {
   
    return (
        <button className={classes.Button} onClick={(event) => props.click(event)}>{props.children}</button>
    )
};

export default TestLogin;



