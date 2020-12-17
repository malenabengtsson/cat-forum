import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
     <Home/>
    </div>
  );
}

export default App;
