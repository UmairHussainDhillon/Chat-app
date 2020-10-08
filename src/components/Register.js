import React, { Component } from 'react'
import Axios from 'axios'
import './styles.css'

import {
     Link,
} from "react-router-dom";
import swal from 'sweetalert';
export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      password: "",
      email: "",
      errors: {},
     data: "",
     token:localStorage.getItem("token"),
    }
    this.handleChange = this.handleChange.bind(this);
  };
  handleChange(e){         
    this.setState({ [e.target.name] : e.target.value });   
}
  
 handleValidation = () => {
  let errors = {};
  let formIsValid = true;
 //Password
 if(!this.state.password){
  formIsValid = false;
  errors["password"] = "Cannot be empty";
}


  //Email
  if(!this.state.email){
     formIsValid = false;
     errors["email"] = "Cannot be empty";
  }

  if(this.state.email && typeof this.state.email !== "undefined"){
     let lastAtPos = this.state.email.lastIndexOf('@');
     let lastDotPos = this.state.email.lastIndexOf('.');

     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
 }  
 this.setState({errors: errors});
 return formIsValid;
};


 Register = (e) => {
  e.preventDefault();
  if(this.handleValidation()){
  Axios({
    method: "POST",
    data: {
      email: this.state.email,
      password: this.state.password,
    },
    withCredentials: true,
    url: "http://localhost:4000/register",
  }).then((res) =>{
    console.log(res)
    if(res.status === 200){
      this.props.history.push("/login");
    }
    else{
      swal("There is an error")
    }
    this.setState({data: res.data})

   // this.handleResponse();

  });
  
}else{
  swal("Oops!","Form has errors.")
}
 };

  render() {

    return (
      <div >
        <div className="base-container">
          <div className="header"><b>Register</b></div>
          <div className="content">
            
            <form >
            <div className="form">
              <div className="form-group">
                <label htmlFor="email">Username</label>
                <input 
                value={this.state.value}
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  onChange={this.handleChange.bind(this)}                  />
              <span style={{color: "red"}}>{this.state.errors["email"]}</span>

              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                   type="password"
                   className="form-control"
                   name="password"
                   placeholder="Password"
                   value={this.state.value}
                   onChange={this.handleChange.bind(this)
                   }                  />
                  <span style={{color: "red"}}>{this.state.errors["password"]}</span>

              </div>
            </div>
            <div className="after">
              <p className="sign-up">
                Already have an Account?
                  <Link to="/login">Login</Link>
              </p>
            </div>
          <div className="footer">
            <button type="submit" onClick={this.Register.bind(this)} className="btn btn-primary">
              Register
            </button>
          </div>
     </form>
     </div>
     </div>
</div>
 )}};
   

