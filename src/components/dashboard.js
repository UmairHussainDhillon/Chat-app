import React from "react";
import "./Dashboard.css";
import io  from 'socket.io-client';
import axios from "axios";


import  { useState, useEffect } from "react";
const ENDPOINT = "http://localhost:4000";
var reciever;
function ApiData() {
  const [response, setResponse] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState("");
  const [text, setText] = useState("");
  const [chat, setChat] = useState("");




  useEffect(() => {
    axios
    .get("http://localhost:4000/users", {
    })
    .then((response) => {
      setUsers(response.data)
      console.log(response.data)      
    }).catch(err => {
      // THROW INSERTING USER ERROR'S
      if (err){ 
     console.log(err)}

  });
  axios
  .get("http://localhost:4000/messages", {
  })
  .then((response) => {
    setChat(response.data)
    console.log(response.data)      
  }).catch(err => {
    // THROW INSERTING USER ERROR'S
    if (err){ 
   console.log(err)}

});
  
  }, []);
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("FromAPI", data => {
      console.log('Data from api')
      setResponse(data);
    });
    socket.on("new_message", function (data) {
      setText(data)
    }); 
  }, []);
   
    return (
      <div>
        <div className="container-fluid h-100">
          <div className="row justify-content-center h-100">
                      {/* Starts Side Contacts */}
            <div className="col-md-4 col-xl-3 chat">
              <div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                  <div className="input-group">
                  <h1 >Chat App</h1>
                  </div>
                </div>
                <List list={users} />

                <div className="card-footer" />
              </div>
            </div>
            {/* Ends Side Contacts */}

            {/* Starts Chat Contacts */}
            <div className="col-md-8 col-xl-6 chat">
              <div className="card">
                <div className="card-header msg_head">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img
                        alt="User"
                        src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                        className="rounded-circle user_img"
                      />
                      <span className="online_icon" />
                    </div>
                    <div className="user_info">
          <span>  {reciever}</span>
                      <p>Online</p>
                    </div>
                    <div className="video_cam">
                      <span>
                        <i className="fas fa-video" />
                      </span>
                      <span>
                        <i className="fas fa-phone" />
                      </span>
                    </div>
                  </div>
                  <span id="action_menu_btn">
                    <i className="fas fa-ellipsis-v" />
                  </span>
                
                </div>
                <div className="card-body msg_card_body">
                 
                  <div className="d-flex justify-content-end mb-4">
                 <MessageList list={chat} />
                  </div>
                  {/* Message Ends here */}
                 
                 </div>
                <div className="card-footer">
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text attach_btn">
                        <i className="fas fa-paperclip" />
                      </span>
                    </div>
                    <textarea 
                      className="form-control type_msg"
                      placeholder="Type your message..."
                      defaultValue={""}
                      onChange={(event)=>{
                        setMsg(event.currentTarget.value)
                      }}
                    />
                    <div className="input-group-append">
                      <button  onClick={(event)=>{
                         var socket = io();
                            socket.emit("send_message", {
                              sender: "Umair",
                              receiver: reciever,
                              message: msg

                            });
                          
      
                          
                                              
                          }
                      
                        }
                       className="input-group-text send_btn">
                        <i className="fas fa-location-arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
function List({ list }) {
  if (!list) {
    return null;
  }

  return (
    <div className="card-body contacts_body">
    <ui className="contacts">
        
        {list.map((item) => (
      <Item key={item.user_id} item={item} />
        ))}
      </ui>

</div> 
  
  );
} 

function Item({ item }) {
  return (
       
                    <li  id={item.user_id} className="active" >
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            alt="User"
                            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                            className="rounded-circle user_img"
                          />
                          <span className="online_icon" />
                        </div>
                        <div className="user_info">
                         <span id={item.user_id} onClick={onItemClickHandler} > {item.name}</span>
                          <p>online</p>
                        </div>
           
                      </div>
                    </li>
                    
                
  );
}
function onItemClickHandler  (event) {
  reciever=event.currentTarget.innerHTML;
 

  console.log( reciever);
 
}

function MessageList({ list }) {
  if (!list) {
    return null;
  }

  return (
    <div >
        
        {list.map((item) => (
      <ChatMessage key={item.message_id} item={item} />
        ))}

</div> 
  
  );
} 

function ChatMessage({ item }) {
  return (
      <div>
    
    <div className="msg_cotainer d-flex justify-content-start mb-4">
     <span> {item.message}</span>
      <span className="msg_time">8:40 AM, Today</span>
    </div>
    </div> 
                    
                
  );
}

  export default ApiData;

