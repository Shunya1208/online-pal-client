import * as actionTypes from "./actionTypes";
import axios from "../../axios-users";

export const updateSelectedUser = (user) => {
    return {
        type: actionTypes.UPDATE_USER,
        user: user
    }
}

export const updatePage = (page) => {
    return {
        type: actionTypes.UPDATE_PAGE,
        current: page
    }
}

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    };
};

export const fetchUsersSuccess = (users,pageSum) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users,
        pageSum
    };
};

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    }
};

export const fetchUsers = (formObj,pageDisplayNum) => {
    return dispatch => {
        dispatch(fetchUsersStart());

        let queryString = ``;
        for( const key in formObj) {
            if(formObj[key]){
                switch(key){
                    case "minAge":
                    queryString += `&birth[lte]=${formObj[key]}`;
                    break;

                    case "maxAge":
                    queryString += `&birth[gt]=${formObj[key]}`
                    break;

                    default:
                    queryString += `&${key}=${formObj[key]}`
                }
            }
        }
        queryString = `?${queryString.substring(1)}`
        axios.get(`${queryString}`)
            .then( response =>{
                dispatch(fetchUsersSuccess(response.data.data.data, Math.ceil(response.data.data.data.length / pageDisplayNum)));            
            })
            .catch( err => {
                dispatch(fetchUsersFail(err))
            })
    }
}