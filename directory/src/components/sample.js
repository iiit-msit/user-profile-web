import React, { Component } from "react";
import { Card, Navbar } from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

export default class Sample extends Component {
  responseGoogle = (response) => {
    console.log(response.Qt.Au);
    const emaildata = response.Qt.Au;
    axios
      .post(`http://localhost:3001/email`, { emaildata })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <GoogleLogin
        clientId="431699204705-3a34hp1kd4v6942adchvn6ot0lmm9lu9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        // onSuccess={sayHello}
      />
    );
  }
}
