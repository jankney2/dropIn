import {createStore} from 'redux'


//redux will be used to access user info from the db across multiple components

const initialState= {
  user: {},
  userPropLists: []

}

export const GET_SESSION ='GET_SESSION'



function reducer(state = initialState, action) {
  
  const {type, payload}= action

  switch(type) {


    case GET_SESSION:

    return { ...state, user: payload.user  }


    default: 
    return state
  }


}




export default createStore(reducer)