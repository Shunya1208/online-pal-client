import * as actionTypes from "./actionTypes";


export const updateInput = (name,value) => {
    return {
        type: actionTypes.UPDATE_INPUT,
        inputName: name,
        value: value
    };
};

export const initializeInput = (obj) => {
    return {
        type: actionTypes.INITIALIZE_INPUT,
        inputs: obj
    };
};