import React from 'react';
import './App.css';
import ListUpload from './components/ListUpload'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import routes from './routes'
import {HashRouter} from 'react-router-dom'


function App() {



  return (
    <div>
<HashRouter >
{routes}
</HashRouter>

    </div>
  );
}

export default App;
