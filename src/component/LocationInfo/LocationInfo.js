import React, { Component } from "react";
import classes from "./LocationInfo.module.css"
import { Link } from "react-router-dom"

class LocationPanel extends Component {

    state = {
        url: null
    }

    componentDidMount() {
        import(`../../assets/images/locations/${this.props.photo}`).then(image =>  {this.setState({url: image.default})})
    }

    render () {
        return (
        <Link className={classes.LocationInfo} to="/search" onClick={(event)=> this.props.click(event,this.props.name)}>
            <img src ={this.state.url} alt={this.state.name}/>
            <div className={classes.Name}>{this.props.name}</div>
            <div className={classes.DistanceBox}><ion-icon name="location-outline"></ion-icon>{this.props.distance} km from your location</div>
        </Link>
        )
    }
};

export default LocationPanel;