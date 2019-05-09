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

function reducer(state = initialState, action) {
  
  const {type, payload}= action

  switch(type) {


    case GET_SESSION:

    return { ...state, user: payload.user, isLoggedIn:true }

    case GET_USER_PROP_LISTS:
//something is wrong here
    return {...state, userPropLists: payload}

    case UPDATE_USER_INFO:
    return {...state, user:payload}

    default: 
    return state
  }


}




export default createStore(reducer)