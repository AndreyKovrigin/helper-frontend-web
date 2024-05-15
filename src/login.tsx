import React, {FormEvent, useState} from "react";
import './login.css';
import {BACKEND_LINK} from "./backend";

interface LoginProps {
  setAccount: (account: [string, string]) => void;
}

export const Login: React.FC<LoginProps> = ({setAccount}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const tryLogin = async (e: FormEvent) => {
    e.preventDefault()
    if(username !== "") {
      await fetch(BACKEND_LINK + "/register", {
        method: "POST",
        body: JSON.stringify({
          "login": username,
          "password": password,
        })
      })
      setAccount([username, password])
    }
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