import * as actionTypes from "./actionTypes";
import axios from "../../axios-rooms";
import {fetchMessages} from "./message"

export const roomStart = () => {
    return {
        type: actionTypes.ROOM_START
    }
}

export const roomSuccess = (room) => {
    return {
        type: actionTypes.ROOM_SUCCESS,
        room
    }
};

export const createSuccess = (room) => {
    return {
        type: actionTypes.ROOM_CREATE_SUCCESS,
        room
    }
};

export const updateSuccess = () => {
    return {
        type: actionTypes.ROOM_UPDATE_SUCCESS
    }
};

export const clearRooms = () => {
    return {
        type: actionTypes.CLEAR_ROOMS,
    }
};

export const clearRoomError = () => {
    return {
        type: actionTypes.CLEAR_ROOM_ERROR
    }
};

export const roomFail = (error) => {
    return {
        type: actionTypes.ROOM_FAIL,
        error: error
    }
};



export const createRoom = (id,myId) => {
    return dispatch => {
        dispatch(roomStart())

        axios.post(`/`, {participants:[id,myId]})
            .then( response => {
                dispatch(createSuccess());
            })
            .catch( err => {
                console.log(err.response.data.message)
                dispatch(roomFail(err.response.data.message));
            })
        }
}

export const fetchRooms = (myId) => {
    return dispatch => {
        dispatch(roomStart())
        axios.get(`/${myId}`)
            .then( response => {
                    if(response.data.data.data.length) 
                    dispatch(fetchMessages(response.data.data.data[0]._id));
                    dispatch(roomSuccess(response.data.data.data.length ? response.data.data.data : []));    
            })
            .catch( err => {
                console.log(err)
                dispatch(roomFail(err.response.data.message));
            })
        }
}

export const addRoom = (room) => {
    return {
        type: actionTypes.ADD_ROOM,
        room
    }       
}

export const selectRoom = (roomId) => {
    return {
        type: actionTypes.SELECT_ROOM,
        roomId
    }       
}

export const deleteRoom = (id,myId) => {
    return dispatch => {
        dispatch(roomStart())

        axios.request({
            method: 'delete',
            url: `/${id}`,
          }).then( response => {
                dispatch(fetchRooms(myId));
            })
            .catch( err => {
                dispatch(roomFail(err.response.data.message));
            })
        }
}

export const updateRoomDate = (roomId) => {
    return dispatch => {
        dispatch(roomStart())

        axios.patch(`/${roomId}`,{createdAt: new Date()})
            .then( response => {
                dispatch(updateSuccess());
            })
            .catch( err => {
                dispatch(roomFail(err.response.data.message));
            })
        }
}