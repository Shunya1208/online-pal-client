import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
        rooms: [],
        selectedRoom: null,
        error: null,
        loading: false,
};

const roomStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const roomSuccess = (state,action) => {
    return updateObject( state, {
        rooms: action.room,
        selectedRoom: action.room.length ? action.room[0]._id : null,
        error: null, 
        loading: false
    })
}

const updateSuccess = (state,action) => {
    return updateObject( state, {
        error: null, 
        loading: false
    })
}

const addRoom = (state,action) => {

    const rooms = state.rooms.length ? state.rooms.concat([action.room]) : [action.room]

    return updateObject( state, {
        rooms
    })
}

const selectRoom = (state,action) => {

    return updateObject( state, {
        selectedRoom: action.roomId
    })
}

const rommFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    })
};

const clearRooms = (state, action) => {
    return updateObject( state, {
        rooms: []
    })
};

const clearError = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false
    })
};

const createSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false
    })
};



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ROOM_CREATE_SUCCESS: return createSuccess(state, action);
        case actionTypes.ADD_ROOM: return addRoom(state, action);
        case actionTypes.SELECT_ROOM: return selectRoom(state, action);
        case actionTypes.ROOM_START: return roomStart(state, action);
        case actionTypes.ROOM_SUCCESS: return roomSuccess(state, action);
        case actionTypes.ROOM_FAIL: return rommFail(state, action);
        case actionTypes.CLEAR_ROOMS: return clearRooms(state, action);
        case actionTypes.ROOM_UPDATE_SUCCESS: return updateSuccess(state, action);
        case actionTypes.CLEAR_ROOM_ERROR: return clearError(state, action);
        default: return state;
    }
}

export default reducer;