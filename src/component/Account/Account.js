
// eslint-disable-next-line
import React from "react";
import Form from "../../container/Form/Form"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {connect} from "react-redux";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import classes from "./Account.module.css"

const Account = (props) => {

    let deleteAccount = <Form type="Delete"/>

    if(props.user.role === "test")
        deleteAccount= null;

    return (
       <div className={classes.FormBox}>
            {props.message ? <SuccessMessage>Successfully updated</SuccessMessage> : null}
            {props.error ? <ErrorMessage/> : null}
            <Form type="Change"/>
            {deleteAccount}
       </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        message: state.auth.message,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Account);