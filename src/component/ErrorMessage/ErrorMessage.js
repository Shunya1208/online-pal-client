import React from 'react';
import classes from "./ErrorMessage.module.css";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Backderop from "../UI/Backderop/Backderop";
import Aux from "../../hoc/Aux/Aux";

const ErrorMessage = (props) => {
    const clickHandler = () => {
        props.onClearError()
    }
    return (
        <Aux>
            <Backderop show={props.error} close={clickHandler}/>
            <div className={classes.ErrorBox} >
                <p>
                    <ion-icon name="warning-outline"></ion-icon>
                    <span>{props.error}</span>
                </p>
                <button onClick={clickHandler} >OK</button>
            </div>
        </Aux>

    )
};

const mapStateToProps = state => {
    return {
        error: state.auth.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearError: () => dispatch(actions.clearError()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorMessage);



