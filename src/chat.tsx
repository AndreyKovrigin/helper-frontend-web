import React, {FormEvent, useEffect, useRef, useState} from "react";
import './chat.css';
import {randomInt} from "node:crypto";
import {BACKEND_LINK} from "./backend";

interface ChatProps {
  account: [string, string]
}

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<any>();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

interface Message {
  text: string;
  isUser: boolean;
  isError: boolean;
}

export const Chat: React.FC<ChatProps> = ({account}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [sendingDisabled, setSendingDisabled] = useState(false)

  const send = (e: FormEvent) => {
    e.preventDefault()
    if(inputText !== "") {
      setSendingDisabled(true)
      let newMessage = {text: inputText, isUser: true, isError: false}
      addMessage(newMessage)
      fetch(BACKEND_LINK + "/message", {
        method: "POST",
        body: JSON.stringify({
          "login": account[0],
          "password": account[1],
          "message": inputText
        })
      }).then(async (response) => {
        addMessage({
          text: (await response.json())["response"],
          isUser: false,
          isError: false
        })
        setSendingDisabled(false)
      }).catch(e => {
        newMessage.isError = true
        setSendingDisabled(false)
      })
      setInputText("")
    }
  }

  const addMessage = (message: Message) => {
    setMessages(messages.concat([message]))
  }

  return <div className="chat-container">
    <div className="messages-container" id="messages-container">
      {
        messages.map(({text, isUser, isError}) => {
          return <div className={(isUser ? "message-container-user" : "message-container-assistant") + (isError ? " error" : "")}>
            <div className="message">
              {text}
            </div>
          </div>
        })
      }
      <AlwaysScrollToBottom/>
    </div>
    <form className="form-send" onSubmit={send}>
      <input type="text" value={inputText}
             onChange={event => setInputText(event.target.value)}/>
      <input type="submit" value="Send" disabled={sendingDisabled}/>
    </form>
  </div>
}