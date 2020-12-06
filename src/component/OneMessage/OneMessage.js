import React from "react";
import classes from "./OneMessage.module.css";
import {connect} from "react-redux";

const OneMessage = (props) => {
    let style =[classes.Message]

    if(props.user.name === props.message.name) {
        style = [classes.Message, classes.Sender]
    }
    const time = new Date(props.message.timestamp)
    const formatedTime = `${time.getFullYear()}/${("0"+(time.getMonth() + 1)).slice(-2)}/
                            ${("0"+time.getDate()).slice(-2)} ${("0"+time.getHours()).slice(-2)}:${("0"+time.getMinutes()).slice(-2)}`

   return (
       <div className={style.join(" ")}>
           <div className={classes.Name}>{props.message.name}</div>
           <div className={classes.Text}>{props.message.message}</div>
           <div className={classes.Timestamp}>{formatedTime}</div>
       </div>
    )
};

const mapStateToProps = state => {
    return {
       user: state.auth.user
    }
}

export default connect(mapStateToProps)(OneMessage);