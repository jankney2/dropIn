import React from 'react';
import './App.css';

import routes from './routes'
import {HashRouter, Route} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar';
import store from './redux/store'

function App() {


let reduxState=store.getState()

if(reduxState.isLoggedIn){

  return (


<div>

<HashRouter >
<NavBar/>

{routes}


</HashRouter>

    </div>
  );

  }
  
  return (
    <div>
<HashRouter >
<NavBar/>

 <Home />


</HashRouter>


    </div>
  )

}

export default App;
