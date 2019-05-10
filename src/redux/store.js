import {createStore} from 'redux'


//redux will be used to access user info from the db across multiple components

const initialState= {
  user: {},
  userPropLists: [], 
  isLoggedIn: false
}

export const GET_SESSION ='GET_SESSION'
export const GET_USER_PROP_LISTS='GET_USER_PROP_LISTS'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const GET_SESSION_REG='GET_SESSION_REG'
export const LOGOUT="LOGOUT"


function reducer(state = initialState, action) {
  
  const {type, payload}= action

  switch(type) {


    case GET_SESSION:
    // console.log(payload.user)
    return { ...state, user: payload.user, isLoggedIn:true }

    case GET_SESSION_REG:
    console.log("register update payload", payload)
    return { ...state, user: payload, isLoggedIn:true }

    case GET_USER_PROP_LISTS:
//something is wrong here
    return {...state, userPropLists: payload}

    case UPDATE_USER_INFO:
    return {...state, user:payload}

    case 'REFRESH_SESSION':
    return {...state, user:payload}

    case LOGOUT:
    return {...state, isLoggedIn:false}


    default: 
    return state
  }


}




export default createStore(reducer)