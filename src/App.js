import React from 'react';
import './App.css';


import routes from './routes'
import {HashRouter} from 'react-router-dom'
import NavBar from './components/NavBar';

function App() {



  return (


<div>

<HashRouter >
<NavBar/>

{routes}


</HashRouter>

    </div>
  );


}

export default App;
