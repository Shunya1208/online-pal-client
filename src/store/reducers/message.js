import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    messages: [],
    error: null,
    loading: false,
};

const messageStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const messageSuccess = (state,action) => {
    return updateObject( state, {
        messages: action.messages,
        error: null, 
        loading: false
    })
};

const messageFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const createSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false
    })
};

const addMessage = (state, action) => {
     const messages = state.messages ? state.messages.concat([action.message]) : [action.messages]

    return updateObject( state, {
        messages
    })
};

const clearMessages = (state, action) => {
   return updateObject( state, {
       messages: []
   })
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MESSAGE_START: return messageStart(state, action);
        case actionTypes.MESSAGE_SUCCESS: return messageSuccess(state, action);
        case actionTypes.MESSAGE_FAIL: return messageFail(state, action);
        case actionTypes.MESSAGE_CREATE_SUCCESS: return createSuccess(state, action);
        case actionTypes.ADD_MESSAGE: return addMessage(state, action);
        case actionTypes.CLEAR_MESSAGES: return clearMessages(state, action);
        default: return state;
    }
}

export default reducer;