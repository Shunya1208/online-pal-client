import React from "react";
import classes from "./Gender.module.css";
import Aux from "../../hoc/Aux/Aux";

const Gender = (props) => {
    let gender = <ion-icon className={classes.Gender} style={{color: "blue"}} name="male-outline"></ion-icon>
    
    if(props.sex === "Female") {
        gender= <ion-icon className={classes.Gender} style={{color: "red"}} name="female-outline"></ion-icon>
    }

    return (
        <Aux className={classes.Login}>
            {gender}
        </Aux>
    )
};

export default Gender;