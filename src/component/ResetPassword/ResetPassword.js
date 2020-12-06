import React from "react";
import classes from "./ResetPassword.module.css"
import Form from "../../container/Form/Form";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import {connect} from "react-redux"

const ResetPassword = (props) => {

    return (
        <div className={classes.ResetPassword}>
            {props.message ? <SuccessMessage>Successfully updated</SuccessMessage> : null}
            <Form type="Reset" token={props.match.params.token}/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        message: state.auth.message
    }
}

export default connect(mapStateToProps)(ResetPassword);