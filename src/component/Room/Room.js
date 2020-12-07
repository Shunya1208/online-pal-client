import React , { Component } from "react";
import classes from "./Room.module.css";
import {connect} from "react-redux"

class Room extends Component {
  
    render () {
        let style = [classes.Room];
        let button = null
        if(this.props.selectedRoom && this.props.roomId === this.props.selectedRoom) {
            style = [classes.Room, classes.Active];
            button = <ion-icon name="close-circle-outline" onClick={(event) => this.props.delete(event)}></ion-icon>
        }

        return (
            <div className={style.join(" ")} onClick={(event) => this.props.getMessage(event)}>
                <img className={classes.Image} src={`https://lit-chamber-33999.herokuapp.com/img/users/${this.props.info.photo}`} alt={this.props.info.name} />
                <div className={classes.NameBox}>
                    {this.props.info.name}
                    <div className={classes.Button}>
                        {button}
                    </div>
                </div>
            </div>
        
        )
  }
};

const mapStateToProps = state => {
    return {
        selectedRoom: state.room.selectedRoom
    }
}

export default connect(mapStateToProps)(Room);