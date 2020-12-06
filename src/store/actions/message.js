import * as actionTypes from "./actionTypes";
import axios from "../../axios-messages";


export const messageStart = () => {
    return {
        type: actionTypes.MESSAGE_START
    }
}

export const messageSuccess = (messages) => {
    return {
        type: actionTypes.MESSAGE_SUCCESS,
        messages,
    }
};

export const createSuccess = () => {
    return {
        type: actionTypes.MESSAGE_CREATE_SUCCESS
    }
};


export const messageFail = (error) => {
    return {
        type: actionTypes.MESSAGE_FAIL,
        error: error
    }
};

export const addMessage = (message) => {
    return {
        type: actionTypes.ADD_MESSAGE,
        message
    }
};

export const clearMessages = () => {
    return {
        type: actionTypes.CLEAR_MESSAGES
    }
};

export const fetchMessages = (roomId) => {

    return dispatch => {
        dispatch(messageStart())
        axios.get(`/${roomId}`)
            .then( response => {
                dispatch(messageSuccess(response.data.data.data));
            })
            .catch( err => {
                dispatch(messageFail(err.response.data.message));
            })
        }
}

export const createMessage = (obj) => {
    return dispatch => {
        dispatch(messageStart())
        axios.post(`/`,obj)
            .then( response => {
                dispatch(createSuccess());
            })
            .catch( err => {
                dispatch(messageFail(err.response.data.message));
            })
        }
}

export const deleteMessages = (id) => {
    return dispatch => {
        dispatch(messageStart())
        axios.request({
            method: 'delete',
            url: `/${id}`
          })
            .then( response => {
                dispatch(messageSuccess([],null));
            })
            .catch( err => {
                dispatch(messageFail(err.response.data.message));
            })
        }
}