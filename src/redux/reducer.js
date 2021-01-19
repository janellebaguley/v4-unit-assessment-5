const initialState = {
    username: {},
    profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER',
      LOGOUT_USER = 'LOGOUT_USER';

export function updateUser(username, profile_pic){
    return {
        type: UPDATE_USER,
        payload: username, profile_pic
    }
}

export function logout(){
    return {
        type: LOGOUT_USER,
        payload: {}
    }
}


export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_USER:
            return {...state, username: payload, profile_pic: payload};
        case LOGOUT_USER: 
            return {...state, username: payload};
        default:
            return state;
    }
}