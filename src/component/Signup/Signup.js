import React from "react";
import classes from "./Signup.module.css"
import Form from "../../container/Form/Form"

const Signup = (props) => {

    return (
        <div className={classes.Signup}>
            <Form type="Sign Up"/>
        </div>
    )
};

export default Signup;