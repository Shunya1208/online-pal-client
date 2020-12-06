import React from "react";
import classes from "./Input.module.css";
import Aux from "../../hoc/Aux/Aux";
import {countryOptions} from "../InputSearch/countriesOptions";
import {langugaeOptions} from "../InputSearch/languagesOptions"

const input = ( props ) => {
    let inputElement;
    let option;
    let inputClasses=[classes.Element];

    // Configure style and option element for select element
    switch(props.elementConfig.name) {
        case ("birth"):
            inputClasses.push(classes.BirthElement)
            break;
        case ("photo"):
            inputClasses =[""];
            break;
        case ("gender"):
            inputClasses.push(classes.GenderElement)
            option = (
                <Aux>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Aux>
            )
            break;
        case ("country"):
            inputClasses.push(classes.SelectElement)
            option = countryOptions;
            break;
        case ("native"):
        case ("learning"):
            inputClasses.push(classes.SelectElement)
            option = langugaeOptions;
            break;
        case ("summary"):
        case ("hobby"):
            inputClasses.push(classes.Textarea)
            break;
        default: 
            inputClasses.push(classes.InputElement)
    }

    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    // Configure  input element
    switch(props.elementType) {
        case ("input"):
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ("textarea"):
            inputElement = <textarea  className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        // case ("select"):
        //     inputElement = <select  className={inputClasses.join(" ")} onChange={props.changed} value={props.value} >{option}</select>
        //     break;
        default:
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>
       
    }

    if(props.elementConfig.name === "photo")
    inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} onChange={props.changed}/>

    return (
        <div className={classes.Input}>
            <div className={classes.Label}>{props.label}</div>
            {inputElement}
        </div>
    )
}

export default input;