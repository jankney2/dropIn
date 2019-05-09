import React from 'react';
import './App.css';
import ListUpload from './components/ListUpload'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
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
