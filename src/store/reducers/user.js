import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    users: [],
    selectedUser: {},
    pageSum: null,
    pageDisplayNum: 5,
    current: 1,
    loading: false
};

const updateUser = (state, action) => {
    return updateObject(state, { selectedUser: action.user })
};

const updatePage = (state, action) => {
    return updateObject(state, { current: action.current })
};

const fetchUsersStart = (state, action) => {
    return updateObject(state, { loading: true })
};

const fetchUsersSuccess = (state, action) => {
    return updateObject( state,{
        users: action.users,
        loading: false,
        pageSum: action.pageSum,
        current: 1
    })
};

const fetchUsersFail = (state, action) => {
    return updateObject(state,{ loading: false}) 
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state,action);          
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state,action);
        case actionTypes.UPDATE_USER: return updateUser(state,action);
        case actionTypes.UPDATE_PAGE: return updatePage(state,action);
        default: return state;
    }
}

export default reducer;