import React from 'react';
import classes from "./SuccessMessage.module.css";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Backderop from "../UI/Backderop/Backderop";
import Aux from "../../hoc/Aux/Aux";

const SuccessMessage = (props) => {
    const clickHandler = () => {
        props.onClearMessage()
    }

    return (
        <Aux>
            <Backderop show={props.message} close={clickHandler}/>
            <div className={classes.MessageBox} >
                <p>
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    <span>{props.children}</span>
                </p>
                <button onClick={clickHandler} >OK</button>
            </div>
        </Aux>

    )
};

const mapStateToProps = state => {
    return {
        message: state.auth.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearMessage: () => dispatch(actions.clearMessage()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SuccessMessage);



