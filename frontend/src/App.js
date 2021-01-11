import React from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom";

import SubjectContextProvider from "./contexts/SubjectContextProvider";
import UserContextProvider from './contexts/UserContextProvider'

import Home from './pages/Home'
import Header from './components/Header'
import ThreadList from './components/ThreadComponents/ThreadList'
import ReplyList from './components/ReplyComponents/ReplyList'
import "bootstrap/dist/css/bootstrap.min.css";
import './sass/styles.scss'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SubjectContextProvider>
          <UserContextProvider>
        <Header />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:subject" component={ThreadList}/>
        <Route exact path="/:subject/:thread" component={ReplyList}/>
        </Switch>
          </UserContextProvider>
        </SubjectContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
