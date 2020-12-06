import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
        minAge: 16,
        maxAge: 99,
        male: true,
        female: true,
        countries: "Any",
        languages: "Any"
};

const updateInput = (state, action) => {
    let updatedInput = { [action.inputName] : action.value}
    
    const updatedInputs = updateObject(state.inputName,updatedInput);
    return updateObject(state, updatedInputs);
 
};

const initializeInput = (state, action) => {
    return updateObject(state, action.inputs);
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_INPUT: return updateInput(state, action);
        case actionTypes.INITIALIZE_INPUT: return initializeInput(state, action);
        default: return state;
    }
}

export default reducer;