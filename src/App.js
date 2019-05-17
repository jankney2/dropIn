import React from 'react';
import './App.css';


import routes from './routes'
import {HashRouter} from 'react-router-dom'
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {



  return (


<div>

<HashRouter >
<NavBar/>

{routes}

<Footer />
</HashRouter>

    </div>
  );


}

export default App;
