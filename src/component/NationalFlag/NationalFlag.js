import React from "react";
import {convertCountryName} from "../../shared/utility";
import "../../shared/css/flag-icon.css"

const NationalFlag = (props) => {
    
    return (
        <span className={"flag-icon flag-icon-" + convertCountryName(props.country)}></span>
    )
};

export default NationalFlag;