import React, { Component }from "react";
import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
import User from "../User/User";
import Gender from "../Gender/Gender";
import NationalFlag from "../NationalFlag/NationalFlag";
// import OnlineIcon from "../Onlineicon/OnlineIcon";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import {ageCalculater} from "../../shared/utility";

class UserInfo extends Component {

    // Cut off over 3000 characters
    cutCharacters = text => {
        if(text && text.length > 300) {
            return `${text.substring(0,300)} ...`
        }

        return text;
    }

    render () {
        return (
            <Link className={classes.UserBox} to="/user" onClick={() => this.props.onUpdateSelectedUser(this.props.info)}>
                <User className={classes.Image} url={`https://online-pal1208.herokuapp.com/img/users/${this.props.info.photo}`} name={this.props.info.name}/>
                <div className={classes.UserInfoBox}>
                    {this.props.info.name}
                    <span className={classes.Gender}><Gender sex={this.props.info.gender}/></span>
                    {ageCalculater(this.props.info.birth)}
                </div>
                <div className={classes.CountryBox}>
                    <NationalFlag country={this.props.info.country}/>
                    <span style={{marginLeft: "7px"}}>{this.props.info.country}</span>
                    {/* <OnlineIcon online={this.props.info.online}/> */}
                </div>
                <p>{this.cutCharacters(this.props.info.summary)}</p>
            </Link>
        )
  }
};


const mapDispatchToProps =  dispatch => {
    return {
        onUpdateSelectedUser: (user) => dispatch(actions.updateSelectedUser(user)),
    }
}

export default connect(null,mapDispatchToProps)(UserInfo);