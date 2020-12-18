import React from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom";

import SubjectContextProvider from "./contexts/SubjectContextProvider";

import Home from './pages/Home'
import Header from './components/Header'
import ThreadList from './components/ThreadList'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SubjectContextProvider>
        <Header />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:subject" component={ThreadList}/>
        </Switch>
        </SubjectContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
