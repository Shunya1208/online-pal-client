import React from "react";
import classes from "./ResetPassword.module.css"
import Form from "../../container/Form/Form"

const ResetPassword = (props) => {

    return (
        <div className={classes.ResetPassword}>
            <Form type="Reset" token={props.match.params.token}/>
        </div>
    )
};

export default ResetPassword;