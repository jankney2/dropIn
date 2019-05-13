import {createStore} from 'redux'


//redux will be used to access user info from the db across multiple components

const initialState= {
  user: {},
  userPropLists: [], 

}

export const GET_SESSION ='GET_SESSION'
export const GET_USER_PROP_LISTS='GET_USER_PROP_LISTS'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const GET_SESSION_REG='GET_SESSION_REG'
export const LOGOUT="LOGOUT"
export const LOGIN= 'LOGIN'
export const REG_LOGIN='REG_LOGIN'


function reducer(state = initialState, action) {
  
  const {type, payload}= action

  switch(type) {


    case GET_SESSION:
    // console.log("Payload", payload.user)
    return { ...state, user: payload.user}

    case GET_SESSION_REG:
    console.log("register update payload", payload)
    return { ...state, user: payload }

    case GET_USER_PROP_LISTS:
//something is wrong here
    return {...state, userPropLists: payload}

    case UPDATE_USER_INFO:
    return {...state, user:payload}

    case 'REFRESH_SESSION':
    return {...state, user:payload}

    case LOGOUT:
    return {...state, user:{}}

    case LOGIN: 
    return {...state}

    case REG_LOGIN:
    return {...state, user:payload}



    default: 
    return state
  }


}




export default createStore(reducer)