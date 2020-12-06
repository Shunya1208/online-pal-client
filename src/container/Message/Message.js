import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./Message.module.css";
import Room from "../../component/Room/Room";
import OneMessage from "../../component/OneMessage/OneMessage";
import Pusher from "pusher-js";
import Spinner from "../../component/UI/Spinner/Spinner";
import RoomSpinner from "../../component/UI/Spinner/RoomSpinner";


class Message extends Component {

    state = {
        value: "",
    }

    componentDidMount() {
        this.props.onFetchRooms(this.props.user._id);
        

        this.pusher = new Pusher('b819afcc49b3b99809a0', {
            cluster: 'ap3'
        });
      
        this.channelMessage = this.pusher.subscribe('messages');
        this.channelMessage.bind('inserted', (data) => {
            this.props.onAddMessage(data)
        });
    }

    componentWillUnmount() {
        this.channelMessage.unbind();
        this.pusher.unsubscribe(this.channelMessage);
    }

    componentDidUpdate() {
        this.scrollToBottom();
      }

    changeHandler = (event) => {
        this.setState({value: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(this.state.value !== "" && this.props.selectedRoom) {
            this.props.onCreateMessage({message:this.state.value,room:this.props.selectedRoom,name:this.props.user.name})
            this.props.onUpdateRoomDate(this.props.selectedRoom)
            this.setState({value:""})
        }
    }

    getMessageHandler = (event,roomId) => {
        // get messages using id
        this.props.onSelectRoom(roomId);
        this.props.onFetchMessages(roomId)
        
    }

    deleteRoomHandler = (event) => {
        this.props.onDeleteRoom(this.props.selectedRoom,this.props.user._id)
        this.props.onDeleteMessages(this.props.selectedRoom)
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render () {
        let style =[classes.Button];

        if(this.state.value !== "" && this.props.selectedRoom) {
            style =[classes.Button,classes.Valid];
        }

        const participantArray = [];
        if(this.props.rooms)
        this.props.rooms.forEach(room => {
            room.participants.forEach(participant => {
                if(participant._id !== this.props.user._id) {
                    participantArray.push(participant)
                }
            })
        })


        let room = participantArray.map((participant,i) => {
            return <Room key={this.props.rooms[i]._id} 
                        info={participant} 
                        getMessage={(event) => this.getMessageHandler(event,this.props.rooms[i]._id)} 
                        delete={(event) => this.deleteRoomHandler(event)}
                        roomId={this.props.rooms[i]._id}
                        />
        })

        let message = this.props.messages.map(message => {
            return <OneMessage key= {message._id} message={message}/>
        })

        if(this.props.loading)
        room = <RoomSpinner/>

        if(this.props.messageLoading)
        message = <Spinner/>

        return (
                <div className={classes.Message}>
                    <div className={classes.Header}>
                        {room}
                    </div>
                    <div className={classes.Body} id="body">
                        {message}
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                    <div className={classes.Footer}>
                        <form className={classes.Form} onSubmit={(event) => this.submitHandler(event)}>
                            <input type="text" placeholder="Type messsage" className={classes.Input} onChange={(event) => this.changeHandler(event)} value={this.state.value}/>
                            <button className={style.join(" ")}><ion-icon name="paper-plane-outline"></ion-icon></button>
                        </form>
                    </div>
                </div>
        )
    }
} 

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        rooms: state.room.rooms,
        loading: state.room.loading,
        messages: state.message.messages,
        selectedRoom: state.room.selectedRoom,
        messageLoading: state.message.loading
    }
}

const mapDispatchToProps =  dispatch => {
    return {
        onFetchRooms : (myId) => dispatch(actions.fetchRooms(myId)),
        onDeleteRoom: (id,myId) => dispatch(actions.deleteRoom(id,myId)),
        onFetchMessages: (roomId) => dispatch(actions.fetchMessages(roomId)),
        onCreateMessage: (obj) =>  dispatch(actions.createMessage(obj)),
        onAddMessage: (obj) => dispatch(actions.addMessage(obj)),
        onDeleteMessages: (id) => dispatch(actions.deleteMessages(id)),
        onSelectRoom: (roomId) => dispatch(actions.selectRoom(roomId)),
        onUpdateRoomDate: (roomId) => dispatch(actions.updateRoomDate(roomId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Message);