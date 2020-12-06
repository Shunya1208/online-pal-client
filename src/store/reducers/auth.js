import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    location: {latitude:null,longitude:null},
    user: {
        name: null,
        birth: null,
        photo: null,
        hobby: null,
        gender: null,
        country: null,
        summary: null,
        native: null,
        learing:null
    },
    bookmark:[],
    error: null,
    loading: false,
    sentEmail: null,
    message: false
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state,action) => {
    return updateObject( state, {
        token: action.idToken,
        user: action.user,
        error: null, 
        loading: false,
        message: action.message
    })
}

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const updateSuccess = (state, action) => {
    return updateObject( state, {
        user: action.user,
        error: null, 
        loading: false,
        message: true
    })
}

const bookmarkSuccess = (state, action) => {
    return updateObject( state, {
        bookmark: action.bookmark,
        error: null, 
        loading: false
    })
}

const updateLocation = (state, action) => {
    return updateObject( state, {
        location: action.location
    })
}


const cancelSuccess = (state, action) => {
    return updateObject( state, {
        error: null, 
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject( state, { token: null, user: null })
};

const sendEmail = (state, action) => {
    return updateObject( state, { sentEmail: true , loading: false})
};

const clearEmail = (state, action) => {
    return updateObject( state, { sentEmail: false })
};

const clearError = (state, action) => {
    return updateObject( state, { error: null })
}

const clearMessage = (state, action) => {
    return updateObject( state, { message: null })
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_SEND_EMAIL: return sendEmail(state, action);
        case actionTypes.AUTH_CLEAR_EMAIL: return clearEmail(state, action);
        case actionTypes.AUTH_CLAER_ERROR: return clearError(state, action);
        case actionTypes.AUTH_UPDATE_SUCCESS: return updateSuccess(state, action);
        case actionTypes.AUTH_CANCEL_SUCCESS: return cancelSuccess(state, action);
        case actionTypes.UPDATE_LOCATION: return updateLocation(state, action); 
        case actionTypes.AUTH_BOOKMARK_SUCCESS: return bookmarkSuccess(state, action); 
        case actionTypes.AUTH_CLAER_MESSAGE: return clearMessage(state, action); 
        default:
            return state;
    }
}

export default reducer;