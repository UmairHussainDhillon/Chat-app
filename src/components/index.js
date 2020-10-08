import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class index extends Component {
  render() {
    return (
      <div>
        <div className="body-container">
          <div className="base-container">
            <div className="header">
              <b>Welcome </b>
            </div>
            <div className="content">
              <form>
                <div className="footer">
                  <Link to ="/login" className="btn btn-primary ">Login</Link>
                </div>
                <br></br>
                <div className="footer">
                  <Link to="/register" className="btn btn-primary ">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
