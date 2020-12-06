import React from "react";
import classes from "./LanguageList.module.css";

const LanguageList = (props) => {
  
    return (
        <ul className={classes.LanguageList}>
            {props.array.map(el => {
                return <li key={el}>{el}</li>
            })}
        </ul>
    )
};

export default LanguageList;