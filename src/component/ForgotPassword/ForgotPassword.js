import React from "react";
import classes from "./ForgotPassword.module.css"
import Form from "../../container/Form/Form"

const ForgotPassword = (props) => {

    return (
        <div className={classes.Forgot}>
            <Form type="Send"/>
        </div>
    )
};

export default ForgotPassword;