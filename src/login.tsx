import React, {FormEvent, useState} from "react";
import './login.css';

interface LoginProps {
  setAccount: (account: [string, string]) => void;
}

export const Login: React.FC<LoginProps> = ({setAccount}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const tryLogin = (e: FormEvent) => {
    e.preventDefault()
    if(username !== "")
      setAccount([username, password])
  }

  return <div>
    <form onSubmit={tryLogin} className="login-form">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username}
             onChange={event => setUsername(event.target.value)}/>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password}
             onChange={event => setPassword(event.target.value)}/>
      <input type="submit" value="Login"/>
    </form>
  </div>
}