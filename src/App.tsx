import React, {useState} from 'react';
import './App.css';
import {Login} from "./login";
import {Chat} from "./chat";

function App() {

  const [account, setAccount] = useState<[string, string]>(["", ""])
  
  return (
    <div className="App">
      <header className="App-header">
        {
          account[0] === "" ?
            <Login setAccount={setAccount}/> :
            <Chat account={account}/>
        }
      </header>
    </div>
  );
}

export default App;
