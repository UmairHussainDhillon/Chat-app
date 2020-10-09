import React, { Component } from "react";
import axios from "axios";
//import "./Createtimetable.css";

export default class Viewusers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: "",
    };
  }

  handlePost = (e) => {
    axios
      .get("http://localhost:4000/users", {
      })
      .then((response) => {
        this.setState({ users: response.data });
      
      }).catch(err => {
        // THROW INSERTING USER ERROR'S
        if (err){ 
       console.log(err)}

    });
      
  };

  render() {
    return (
      <div>
        <div className="row p-5 ">
          <h1>Current Teachers</h1>
          <button onClick={this.handlePost.bind(this)}>View Teachers</button>
        <div>
          <List list={this.state.users} />
        </div>
      </div>
      </div>

    );
  }
}
function List({ list }) {
  if (!list) {
    return null;
  }

  return (
    <div >
      <p >Current Teachers In IT Department are ...</p>
      <ul>
        
        {list.map((item) => (
          <Item key={item.user_id} item={item} />
          
        ))}

      </ul>

</div> 
  
  );
} 

function Item({ item }) {
  return (
    <div>
        <div className="card-body contacts_body">
                  <ui className="contacts">
                    <li  id={item.user_id} className="active">
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
                         <span>{item.name}</span>
                          <p>online</p>
                        </div>
                      </div>
                    </li>
                    </ui></div>
      </div>
  );
}
