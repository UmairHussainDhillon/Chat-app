import React, { Component } from 'react'
import Axios from 'axios'
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


 login = (e) => {
  e.preventDefault();
  if(this.handleValidation()){
  Axios({
    method: "POST",
    data: {
      email: this.state.email,
      password: this.state.password,
    },
    withCredentials: true,
    url: "http://localhost:4000/login",
  }).then((res) =>{
    console.log(res)
    if(res.data.status === 200){
      localStorage.setItem('token',res.data.token)
      this.props.handleResponse(res.data);
      this.props.history.push("/users/dashboard");
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
        <div >
          <div ><b>Login</b></div>
          <div >
            <form >
            <div className="form ">
              <div className="form-group">
                <label htmlFor="email">Email</label>
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
         
              
              <button type="submit" onClick={this.login.bind(this)} className="btn btn-primary">
              Login
            </button>
              <p>  Not a User?
                  <Link to="/register">Sign up</Link>
              </p>          
        
     </form>
     </div>
     </div>
</div>
 )}};
   

