import React, {Component} from 'react';
import classes from "./UserPage.module.css";
import mapboxgl from 'mapbox-gl';
import Button from "../../component/UI/Button/Button";
import NationalFlag from "../../component/NationalFlag/NationalFlag";
import {getCountryPosition,convertCountryName,distance} from "../../shared/utility";
import Gender from "../../component/Gender/Gender";
import {connect} from "react-redux";
// import OnlineIcon from "../Onlineicon/OnlineIcon";
import LanguageList from "../../component/LanguageList/LanguageList";
import { ageCalculater } from "../../shared/utility";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";
import { withRouter } from 'react-router';
import Pusher from "pusher-js";
import { Redirect } from "react-router-dom";
import Scroll from "react-scroll";


class UserPage extends Component {
    state = {
        zoom: 0,
        distance: null
}
    componentDidMount() {
        const scroll = Scroll.animateScroll;

        // calculate longitude and latitude of selected user
        const {long,lat} = getCountryPosition(convertCountryName(this.props.selectedUser.country));
        //calculate distance between two points
        const dis = distance(lat, long, this.props.location.latitude, this.props.location.longitude);

        this.setState({distance: dis})

        // mapbox configuration
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/shunya1208/ckgkmmvn70nu019mcgdzfwr97',
            center: [this.props.location.longitude, this.props.location.latitude],
            zoom: this.state.zoom
            });

            new mapboxgl.Marker()
            .setLngLat([long, lat])
            .addTo(map);

            new mapboxgl.Popup({ offset: 30 })
            .setLngLat([long, lat])
            .setHTML(`<h3>${this.props.selectedUser.country}</h3>`)
            .addTo(map);

            new mapboxgl.Marker({color: 'green'})
            .setLngLat([this.props.location.longitude, this.props.location.latitude])
            .addTo(map);

            new mapboxgl.Popup({ offset: 25 })
            .setLngLat([this.props.location.longitude, this.props.location.latitude])
            .setHTML(`<h3>Your location</h3>`)
            .addTo(map);
        
        // pusher configuration
        this.pusher = new Pusher('b819afcc49b3b99809a0', {
            cluster: 'ap3'
        });
        
        this.channelRoom = this.pusher.subscribe('rooms');
        this.channelRoom.bind('inserted', (data) => {
                data.participants =[];
                data.participants.push(this.props.selectedUser)
                data.participants.push(this.props.user);
                new Promise( (resolutionFunc,rejectionFunc) => {
                    resolutionFunc(this.props.onAddRoom(data));
                }).then( () =>  this.props.history.push('/setting/message'))
               
        });
        
        scroll.scrollToTop({duration: 1});
    }

    componentWillUnmount() {
        this.channelRoom.unbind();
        this.pusher.unsubscribe(this.channelRoom);
    }

    goBackToPrevious = () => {
        this.props.history.goBack();
    }

    addBookmarkHandler = (bookmarkCheck) => {
        if(!this.props.bookmark || !bookmarkCheck.includes(this.props.selectedUser._id))
        this.props.onAddBookmark(this.props.selectedUser._id,this.props.user._id)
    }

    createRoomHandler = () => {
        this.props.onCreateRoom(this.props.selectedUser._id,this.props.user._id,this.props.history.goBack)
    }

    render () {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1bnlhMTIwOCIsImEiOiJja2hkMHU3YXkxdDBjMnBucW1mY2FlYzM3In0.sEEr_tNpin6XPV2LMkc5Hw';
        let backButton = (
            <div className={classes.Back} onClick={this.goBackToPrevious}>
                <ion-icon name="arrow-back-outline"></ion-icon><span>BACK</span>
            </div>
        );

        let button = null;

        // retrieve bookmark id
        let bookmarkCheck = this.props.bookmark.map(el => {
            return el._id
        })
        
        if(this.props.isAuthenticated) {
            button = (
                <Aux>
                    <Button type="blue" content="message" click={this.createRoomHandler}><ion-icon name="mail-outline" className={classes.Icon}></ion-icon>&nbsp;<span className={classes.IconText}>Message</span></Button>
                    {/* <Button type="blue"><ion-icon name="videocam-outline" className={classes.Icon}></ion-icon>&nbsp;<span className={classes.IconText}>Video</span></Button> */}
                    <Button type="blue" content="bookmark" bookmark={() => this.addBookmarkHandler(bookmarkCheck)} already={this.props.bookmark ? bookmarkCheck.includes(this.props.selectedUser._id) : false}>
                        <ion-icon name="bookmark-outline" className={classes.Icon}></ion-icon>&nbsp;
                        <span className={classes.IconText} >Bookmark</span>
                    </Button>
                </Aux>
            )
        }
        

        const age =  ageCalculater(this.props.selectedUser.birth)

        return (
            <div className={classes.Container}>
                {this.props.already ? <Redirect to="/setting/message"/> : null}
                {backButton}
                <div className={classes.ProfileContainer}>
                    <img src={`https://online-pal1208.herokuapp.com/img/users/${this.props.selectedUser.photo}`} alt={this.props.selectedUser.name}/>
                    <div className={classes.InfoBox}>
                        <span className={classes.Name}>{this.props.selectedUser.name}</span>
                        <span className={classes.Gender}><Gender sex={this.props.selectedUser.gender}/></span>
                        <span className={classes.Age}>{age}</span>
                    </div>
                    <div className={classes.CountryBox}>
                        <NationalFlag country={convertCountryName(this.props.selectedUser.country)}/>
                        <span style={{marginLeft: "7px"}}>{this.props.selectedUser.country}</span>
                        {/* <OnlineIcon online={this.props.props.online}/> */}
                    </div>
                    <div className={classes.LanguageBox}>
                        <div>
                            <span>Native:</span>
                            {this.props.selectedUser.native ? <LanguageList array={[this.props.selectedUser.native]}/> : null}
                        </div>
                        <div>
                            <span>Learning:</span>
                            {this.props.selectedUser.learning ? <LanguageList array={[this.props.selectedUser.learning]} text="Learning"/> : null}
                        </div>
                    </div>
                </div>
                <div className={classes.ButtonBox}>
                    {button}
                </div>
                <p className={classes.Category}>Introduction</p>
                <p>{this.props.selectedUser.summary}</p>
                <p className={classes.Category}>Hobby and Interests</p>
                <p>{this.props.selectedUser.hobby}</p>
                <p className={classes.Category}>Location</p>
                <p>{this.state.distance} km away from your location</p>
                <div className={classes.LocationBox}>
                    <div ref={el => this.mapContainer = el} className={classes.MapContainer}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedUser: state.user.selectedUser,
        location: state.auth.location,
        isAuthenticated: state.auth.token !== null,
        user: state.auth.user,
        bookmark: state.auth.bookmark,
        error: state.room.error,
        already: state.room.already
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddBookmark: (id,myId) => dispatch(actions.addBookmark(id,myId)),
        onCreateRoom: (id,myId,ref) => dispatch(actions.createRoom(id,myId,ref)),
        onAddRoom : (obj) => dispatch(actions.addRoom(obj)),
        onClearRoomError: () => dispatch(actions.clearRoomError()),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserPage));