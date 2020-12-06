import React from "react";
import classes from "./LanguageSearch.module.css";
import Aux from "../../hoc/Aux/Aux";
import H2 from "../Text/H2/H2";
import LanguageFlag from "../LanguageFlag/LanguageFlag"



const LanguageSearch = (props) => {
    const languages = [
        {language: "English", photo:"english.png"},
        {language: "French", photo:"french.png"},
        {language: "German", photo:"german.png"},
        {language: "Russian", photo:"russian.png"},
        {language: "Chinese", photo:"chinese.png"},
    ];

    return (
        <Aux>
            <H2>search frineds by language</H2>
            <div className={classes.LanguageSearch}>
                {languages.map(el => <LanguageFlag key={el.language} name={el.language} photo={el.photo} click={props.click}/>)}
            </div>
        </Aux>
    )
};

export default LanguageSearch;