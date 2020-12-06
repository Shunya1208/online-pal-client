import React, { Component } from 'react';
import classes from './Toolbar.module.css';
import Logo from "../Logo/Logo";
import CorpName from "../CorpName/CorpName";
import Button from "../UI/Button/Button";
import DrawerToggle from "../DrawerToggle/DrawerToggle";
import Aux from "../../hoc/Aux/Aux";
import User from "../User/User";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";


class Toolbar extends Component {

    clickHandler = () => {
        this.props.onClearEmail()
    }

    render() {
        let buttons = (
            <Aux>
                <Button type="green" path="/signup" content="link">Sign Up</Button>
                <Button  path="/login" content="link">Log In</Button>
            </Aux>
        )

        let user = null;

        // Display logout button and user in the state of authentication
        if(this.props.isAuthenticated) {
            buttons = <Button content="logout" click={this.props.logout}>Log Out</Button>
            user = <User type="link" url={`http://127.0.0.1:3000/img/users/${this.props.user.photo}`} name={this.props.user.name} path="/setting/info"/>
        }

        return(
            <header className={classes.Toolbar}>
                <Logo path="/" click={this.clickHandler}/>
                <CorpName/>
                <div className={classes.Container}>
                    <div className={classes.BtnBox}>
                        {buttons}
                    </div>
                    <div className={classes.userBox}>{user}</div>
                    <DrawerToggle open={this.props.open}/>
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearEmail: () => dispatch(actions.clearEmail()),
    }
}

export default connect(null,mapDispatchToProps)(Toolbar);