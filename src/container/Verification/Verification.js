import React,{ Component } from "react";
import Spinner from "../../component/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import classes from "./Verification.module.css";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../../component/ErrorMessage/ErrorMessage"


class Verification extends Component {
    componentDidMount() {
        this.props.onAuth({token:this.props.match.params.token},"Verify");
    }
    
    render () {
        let loading;
        if(this.props.loading){
            loading = <Spinner />
        }

        let authRedirect;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/"/>
        }

        let errorMessage;
        if(this.props.error) {
            errorMessage = <ErrorMessage/>
        }

        return (
           
            <div className={classes.VerifyBox}>
                {loading}
                {errorMessage}
                {authRedirect}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        onAuth : (token,type) => dispatch(actions.auth(token,type)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Verification)
