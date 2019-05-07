import {createStore} from 'redux'


//redux will be used to access user info from the db across multiple components

const initialState= {
  user: {},
  userPropLists: []

}

export const GET_SESSION ='GET_SESSION'
export const GET_USER_PROP_LISTS='GET_USER_PROP_LISTS'


function reducer(state = initialState, action) {
  
  const {type, payload}= action

  switch(type) {


    case GET_SESSION:

    return { ...state, user: payload.user  }

    case GET_USER_PROP_LISTS:
//something is wrong here
    return {...state, userPropLists: payload}

    default: 
    return state
  }


}




export default createStore(reducer)