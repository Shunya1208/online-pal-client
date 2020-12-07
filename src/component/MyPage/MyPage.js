import React, {Component} from 'react';
import classes from "./MyPage.module.css";
import mapboxgl from 'mapbox-gl';
import Button from "../UI/Button/Button";
import NationalFlag from "../NationalFlag/NationalFlag";
import {convertCountryName} from "../../shared/utility";
import Gender from "../Gender/Gender";
// import OnlineIcon from "../Onlineicon/OnlineIcon";
import LanguageList from "../LanguageList/LanguageList";
import {ageCalculater} from "../../shared/utility";
import {connect} from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Scroll from "react-scroll";


class MyPage extends Component {
    state = {
        zoom: 0
    }

    componentDidMount() {
        const scroll = Scroll.animateScroll;

        // mapbox configuration
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/shunya1208/ckgkmmvn70nu019mcgdzfwr97',
            center: [this.props.location.longitude, this.props.location.latitude],
            zoom: this.state.zoom
            });

            if(this.props.user.country) {
                new mapboxgl.Marker()
                .setLngLat([this.props.location.longitude, this.props.location.latitude])
                .addTo(map);

                new mapboxgl.Popup({ offset: 30 })
                .setLngLat([this.props.location.longitude, this.props.location.latitude])
                .setHTML(`<h3>${this.props.user.country}</h3>`)
                .addTo(map);
            }
        
        scroll.scrollToTop({duration: 1});

    }


    render () {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1bnlhMTIwOCIsImEiOiJja2hkMHU3YXkxdDBjMnBucW1mY2FlYzM3In0.sEEr_tNpin6XPV2LMkc5Hw';

        const age =  ageCalculater(this.props.user.birth)

        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.ProfileContainer}>
                        <img src={`https://online-pal1208.herokuapp.com/img/users/${this.props.user.photo}`} alt={this.props.user.name}/>
                        <div className={classes.InfoBox}>
                            <span className={classes.Name}>{this.props.user.name}</span>
                            <span className={classes.Gender}><Gender sex={this.props.user.gender}/></span>
                            <span className={classes.Age}>{age}</span>
                        </div>
                        <div className={classes.CountryBox}>
                            <NationalFlag country={convertCountryName(this.props.user.country)}/>
                            <span style={{marginLeft: "7px"}}>{this.props.user.country}</span>
                            {/* <OnlineIcon online={this.props.props.online}/> */}
                        </div>
                        <div className={classes.LanguageBox}>
                            <div>
                                <span>Native:</span>
                                {this.props.user.native ? <LanguageList array={[this.props.user.native]}/> : null}
                            </div>
                            <div>
                                <span>Learning:</span>
                                {this.props.user.learning ? <LanguageList array={[this.props.user.learning]} text={"Learning"}/> : null}
                            </div>
                        </div>
                    </div>
                    <div className={classes.ButtonBox}>
                        <Button type="blue"><ion-icon name="mail-outline"></ion-icon>&nbsp;<span className={classes.IconText}>Message</span></Button>
                        {/* <Button type="blue"><ion-icon name="videocam-outline" className={classes.Icon}></ion-icon>&nbsp;<span className={classes.IconText}>Video</span></Button> */}
                        <Button type="blue"><ion-icon name="bookmark-outline"></ion-icon>&nbsp;<span className={classes.IconText}>Bookmark</span></Button>
                    </div>
                    <p className={classes.Category}>Introduction</p>
                    <p>{this.props.user.summary}</p>
                    <p className={classes.Category}>Hobby and Interests</p>
                    <p>{this.props.user.hobby}</p>
                    <p className={classes.Category}>Location</p>
                    <p><span className={classes.Placeholder}>XXXX</span> km away from your location</p>
                    <div className={classes.LocationBox}>
                        <div ref={el => this.mapContainer = el} className={classes.MapContainer}/>
                    </div>
                </div>

            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        location: state.auth.location
    }
}

export default connect(mapStateToProps)(MyPage);

  