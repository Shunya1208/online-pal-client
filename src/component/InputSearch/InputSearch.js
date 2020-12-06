import React from "react";
import classes from "./InputSearch.module.css";
import {countryOptions} from "./countriesOptions";
import {langugaeOptions} from "./languagesOptions";
import {connect} from "react-redux";

const InputSearch = ( props ) => {
    let inputElement = null;

    // Import options of country
    let options = countryOptions;

    // Import options of language
    if(props.label === "Languages") {
        options = langugaeOptions
    }

    // Create element based on element type
    switch(props.id) {
        case ("minAge"):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.minAge} onChange={props.changed} id={props.id}/>
            break;
        case ("maxAge"):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.maxAge} onChange={props.changed} id={props.id}/>
            break;
        case ("male"):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} checked={props.male} onChange={props.changed} id={props.id}/>
            break;
        case ("female"):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} checked={props.female} onChange={props.changed} id={props.id}/>
            break;
        case ("countries"):
            inputElement = <select className={classes.SelectElement} {...props.elementConfig} value={props.countries} onChange={props.changed} id={props.id}>{options}</select>
            break;
        case ("languages"):
            inputElement = <select className={classes.SelectElement} {...props.elementConfig} value={props.languages} onChange={props.changed} id={props.id}>{options}</select>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} id={props.id}/>
       
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label} htmlFor={props.id}>{props.label}</label>
            {inputElement}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        minAge: state.search.minAge,
        maxAge: state.search.maxAge,
        male: state.search.male,
        female: state.search.female,
        countries: state.search.countries,
        languages: state.search.languages
    }
}

export default connect(mapStateToProps)(InputSearch);