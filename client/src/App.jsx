import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import ChatList from "./components/ChatList";
import ChatBox from "./components/ChatBox";

import "./App.css";

function App() {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_KEY, {
      cluster: import.meta.env.VITE_CLUSTER,
      encrypted: true,
    });

    const channel = pusher.subscribe("chat");

    channel.bind("message", (data) => {
      setChats((prevChats) => {
        return [...prevChats, data];
      });
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handlesubmit = async (e) => {
    if (e.key == "Enter") {
      const payload = {
        message: text,
      };
      await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
    } else {
    }
  };

  console.log("after :" + chats);

  const handletext = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React-Pusher Chat</h1>
        </header>
        <section>
          <ul>
            <div>
              <div className="row show-grid">
                <div className="col-xs-12">
                  <div className="chatMessage">
                    {chats.map((chat) => {
                      console.log(chat.message);
                      return (
                        <div className="box" key={uuidv4()}>
                          <p className="text-black">{chat.message}</p>
                        </div>
                      );
                    })}
                    <div className="imageHolder"></div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <div>
            <div className="row">
              <div className="col-xs-12">
                <div className="chat">
                  <div className="col-xs-5 col-xs-offset-3">
                    <input
                      type="text"
                      value={text}
                      placeholder="chat here..."
                      className="form-control"
                      onChange={handletext}
                      onKeyDown={handlesubmit}
                    />
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
              <h4 className="greetings">Hello</h4>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
