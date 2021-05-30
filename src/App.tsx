import React from 'react';

import {BrowserRouter , Route} from 'react-router-dom';

import Login from './components/Login/Login';
import Join from './components/Join/Join';


const App = () =>(
  <BrowserRouter>
    <Route path="/" exact component={Login}/>
    <Route path="/join"  component={Join}/>
  </BrowserRouter>
)



export default App;
