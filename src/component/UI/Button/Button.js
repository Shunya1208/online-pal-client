import React from "react";
import classes from "./Button.module.css"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import ButtonSpinner from "../Spinner/ButtonSpinner"


const Button = (props) => {
    let style = [classes.Button];

    if (props.type === "green"){
        style.push(classes.Green)
    }

    if(props.type === "blue"){
        style.push(classes.Blue)
    }

    if( props.already ){
        style.push(classes.Bookmarked)
    }

    let button;

    switch (props.content) {
        case "link":
                button= (<Link to={props.path} className={style.join(" ")} onClick={props.click}>
                            {props.children}
                        </Link>)
                break;
        case "bookmark":
                button = <button className={style.join(" ")}  disabled={props.disabled} onClick={props.bookmark}>{props.loading ? <ButtonSpinner/> : props.children}</button>;
                break;
        default:
                button = <button className={style.join(" ")} disabled={props.disabled} onClick={props.click}>{props.children}</button>;
    }

    return (
        button
    )
};

const mapDispatchToprops = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(Button);