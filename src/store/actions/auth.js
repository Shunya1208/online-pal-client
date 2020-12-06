import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, user,message) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        user,
        message
    }
};

export const updateSuccess = (user) => {
    return {
        type: actionTypes.AUTH_UPDATE_SUCCESS,
        user
    }
}

export const bookmarkSuccess = (bookmark) => {
    return {
        type: actionTypes.AUTH_BOOKMARK_SUCCESS,
        bookmark
    }
}

export const cancelSuccess = () => {
    return {
        type: actionTypes.AUTH_CANCEL_SUCCESS
    }
}

export const clearError = () => {
    return {
        type: actionTypes.AUTH_CLAER_ERROR
    }
}

export const clearMessage = () => {
    return {
        type: actionTypes.AUTH_CLAER_MESSAGE
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const sendEmail = () => {
    return {
        type: actionTypes.AUTH_SEND_EMAIL
    }
}

export const clearEmail = () => {
    return {
        type: actionTypes.AUTH_CLEAR_EMAIL
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000)
    }
}

export const updateLocation = (obj) => {
    return {
        type: actionTypes.UPDATE_LOCATION,
        location: obj
    }
}

export const updateMe = (data,id) => {
    return dispatch => {
        dispatch(authStart())

        axios.patch(`updateMe/${id}`,data, {headers: {
            'content-type': 'multipart/form-data'
        }})
        .then( response => {
            dispatch(updateSuccess(response.data.data.user));
        })
        .catch( err => {
            dispatch(authFail(err));
        })
    }
}

export const cancelMe = (id) => {
    return dispatch => {
        dispatch(authStart())

        axios.delete(`deleteMe/${id}`)
        .then( response => {
            dispatch(cancelSuccess());
            dispatch(logout());
        })
        .catch( err => {
            dispatch(authFail(err.response.data.message));
        })
    }
}

export const resetPassword = (data, token) => {
    return dispatch => {
        dispatch(authStart())

        axios.patch(`resetPassword/${token}`, data)
            .then( response => {
                dispatch(authSuccess(null,response.data.data.user,true));
            })
            .catch( err => {
                dispatch(authFail(err.response.data.message));
            })
        }
}

export const addBookmark = (id,myId) => {
    return dispatch => {
        dispatch(authStart())

        axios.post(`bookmark/${myId}`, {id})
            .then( response => {
                dispatch(getBookmark(myId));
            })
            .catch( err => {
                dispatch(authFail(err.response.data.message));
            })
        }
}

export const getBookmark = (id) => {
    return dispatch => {
        dispatch(authStart())

        axios.get(`/${id}`)
            .then( response => {
                dispatch(bookmarkSuccess(response.data.data.data.bookmark));
            })
            .catch( err => {
                dispatch(authFail(err.response.data.message));
            })
        }
}

export const deleteBookmark = (id,myId) => {
    return dispatch => {
        dispatch(authStart())
        axios.request({
            method: 'delete',
            url: `bookmark/${myId}`,
            data: {id: id},
          })
            .then( response => {
                dispatch(getBookmark(myId));
            })
            .catch( err => {
                dispatch(authFail(err.response.data.message));
            })
        }
}

export const auth = (data, type) => {
    return dispatch => {
        dispatch(authStart())
       
        switch (type) {
            case "Sign Up":
                axios.post("signup", data)
                .then( response => {
                    dispatch(sendEmail());
                })
                .catch( err => {
                    dispatch(authFail(err.response.data.message));
                })
                break;

            case "Send":
                axios.post(`forgotPassword`,data)
                .then( response => {
                    dispatch(sendEmail());
                })
                .catch( err => {
                    dispatch(authFail(err.response.data.message));
                })
                break;
            case "Verify":
                axios.patch(`validUser/${data.token}`)
                .then( response => {
                    dispatch(authSuccess(response.data.token,response.data.data.user,false));
                    //dispatch(checkAuthTimeout(response.data.expiresIn))
                })
                .catch( err => {
                    dispatch(authFail(err.response.data.message));
                })
                break;
            case "Log In":
                axios.post("login", {email:data.email,password:data.password})
                .then( response => {
                    dispatch(authSuccess(response.data.token, response.data.data.user,false));
                    //dispatch(checkAuthTimeout(response.data.expiresIn))
                })
                .catch( err => {
                    console.log(err)
                    dispatch(authFail(err.response.data.message));
                })
                break;
            case "Change":
                axios.patch(`updateMyPassword/${data.id}`, {passwordCurrent:data.current,password:data.password})
                .then( response => {
                    dispatch(authSuccess(response.data.token, response.data.data.user,true));
                    //dispatch(checkAuthTimeout(response.data.expiresIn))
                })
                .catch( err => {
                    dispatch(authFail(err.response.data.message));
                })
                break;
            default: 
        }
    }
};