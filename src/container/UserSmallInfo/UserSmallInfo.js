import React , { Component } from "react";
import classes from "./UserSmallInfo.module.css";
import User from "../../component/User/User";
import NationalFlag from "../../component/NationalFlag/NationalFlag";
import Gender from "../../component/Gender/Gender";
import { Link } from "react-router-dom";
import { ageCalculater } from "../../shared/utility";
import Aux from "../../hoc/Aux/Aux";

class UserSmallInfo extends Component {

    render () {
       let userInfo = (
        <Link className={classes.UserBox} to="/user" onClick={(event) => this.props.click(event,this.props.info)}>
            <User url={`https://online-pal1208.herokuapp.com/users/${this.props.info.photo}`} name={this.props.info.name}/>
            <div className={classes.NameBox}>
                {this.props.info.name}
                <Gender sex={this.props.info.gender}/>
                {ageCalculater(this.props.info.birth)}
            </div>
            <div>
                <NationalFlag country={this.props.info.country}/>
                <span style={{marginLeft: "7px"}}>{this.props.info.country}</span>
            </div>
        </Link>
       )

       if(this.props.type === "bookmark") {
        userInfo = (
            <div className={[classes.UserBox,classes.Bookmark].join(" ")}>
                <ion-icon name="close-circle-outline" onClick={(event) => this.props.delete(event,this.props.info._id)}></ion-icon>
                <Link to="/user"  className={classes.Link} onClick={(event) =>this.props.select(event,this.props.info)}>
                    <User url={`https://online-pal1208.herokuapp.com/img/users/${this.props.info.photo}`} name={this.props.info.name}/>
                    <div className={classes.NameBox}>
                        {this.props.info.name}
                        <Gender sex={this.props.info.gender}/>
                        {ageCalculater(this.props.info.birth)}
                    </div>
                    <div>
                        <NationalFlag country={this.props.info.country}/>
                        <span style={{marginLeft: "7px"}}>{this.props.info.country}</span>
                    </div>
                </Link>
            </div>
        )
       }
    return (
        <Aux>
            {userInfo}
        </Aux>
      
    )
  }
};

export default UserSmallInfo;