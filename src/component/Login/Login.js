import React from "react";
import classes from "./Login.module.css"
import Form from "../../container/Form/Form"

const Login = (props) => {

    return (
        <div className={classes.Login}>
            <Form type="Log In"/>
        </div>
    )
};

export default Login;