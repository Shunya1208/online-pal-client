import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import H2 from "../Text/H2/H2"
import LocationInfo from "../../component/LocationInfo/LocationInfo"
import classes from "./LocationSearch.module.css"

class LocationSearch extends Component {
    
    render() {
        return (
            <Aux>
                <div style={{marginBottom:"20px"}}>
                    <H2>search friends by location</H2>
                </div>
                <div className={classes.LocationBox}>
                    {this.props.countries.map(el => {
                        return <LocationInfo key={el.name} name={el.name} photo={el.photo} distance={el.distance} click={this.props.click}/>
                    })}
                </div>
            </Aux>
        )
    }
   
};

export default LocationSearch;