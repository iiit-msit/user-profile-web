import React, { Component } from "react";
import { Card, Navbar, Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

// const brow = require("../browse");

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      query: "",
      firstName: "",
      Email: "",
      // LinkedIn: "https://www.linkedin.com/in/vamsikrishna-nunna/",
      // collage: "rvr&jc collage of engineering",
      filteredData: [],
    };
    this.MyProfile = this.MyProfile.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios
      .get("http://localhost:3001/getadd")
      .then(function (response) {
        console.log(response.data.Items, "        qwerty");
        self.setState({
          data: response.data.Items,
          filteredData: response.data.Items,
        });
        console.log(self.state.data, "   ghjkl");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const query = event.target.value;
    console.log(query, " in handle change++++++++++++");
    const mData = this.state.data.filter((val) =>
      String(val.Email).toLowerCase().includes(query.toLowerCase())
    );
    console.log(mData);
    this.setState({
      filteredData: mData,
    });
  };

  MyProfile = () => {
    console.log(window.location.pathname);

    var link = window.location.pathname.split("/");
    console.log(link);
    if (link.length > 2) {
      var link1 = link[2];
      console.log(link1, "%%%%%%%%%%%%%");
      const userdata = this.state.filteredData.filter(
        (val) => String(val.Email) === link1
      );
      return (
        <div>
          <div className="myStyle">
            {userdata.map((i) => (
              <div>
                <h2>{i.Email}</h2>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      console.log(window.location.pathname);
      console.log(link, "In else");
      const email = "hriday@gmail.com";
      const userdata = this.state.filteredData.filter(
        (val) => String(val.Email) === email
      );
      this.state.filteredData = userdata;
      return (
        <div>
          <Router>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary justify-content">
              <Link className="navbar-brand" to="/Personal">
                Personal
              </Link>
              <Link className="navbar-brand" to="/Educational">
                Educational
              </Link>
              <Link className="navbar-brand" to="/Social">
                Social
              </Link>
            </Navbar>
            <h2>Your profile</h2>

            <Switch>
              <Route path="/Personal">{this.Personal}</Route>
              <Route path="/Educational">{this.Educational}</Route>
              <Route path="/Social">{this.Social}</Route>
            </Switch>
          </Router>
        </div>
      );
    }
  };

  Personal = () => {
    return (
      <div>
        <h2>Personal</h2>
        <Button onClick={this.Edit}>Edit</Button>
        {this.state.filteredData.map((i) => (
          <div>
            <p>{i.firstName}</p>
            <p>{i.lastName}</p>
            <p>{i.Email}</p>
          </div>
        ))}
        {/* <form style={{ textAlign: "center" }}>
          <label>
            name:
            <input
              type="text"
              name="name"
              value={this.firstName}
              onChange={this.change}
              style={{ padding: "10px", textAlign: "center" }}
            />
          </label>
          <br></br>
          <label>
            email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.change}
              style={{ padding: "10px", textAlign: "center" }}
            />
          </label>
        </form> */}
      </div>
    );
  };

  Educational = () => {
    return (
      <div>
        <h2>Educational</h2>
        <Button onClick={this.Edit}>Edit</Button>
        {this.state.filteredData.map((i) => (
          <div>
            <p>{i.firstName}</p>
            <p>{i.lastName}</p>
            <p>{i.Email}</p>
          </div>
        ))}
        {/* <form style={{ textAlign: "center" }}>
          <label>
            collage:
            <input
              type="text"
              name="collage"
              value={this.state.collage}
              onChange={this.change}
              style={{ padding: "10px", textAlign: "center" }}
            />
          </label>
        </form> */}
      </div>
    );
  };

  change = (e) => {
    console.log(e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  Social = () => {
    return (
      <div>
        <h2>Social</h2>
        <Button onClick={this.Edit}>Edit</Button>

        <form style={{ textAlign: "center" }}>
          <label>
            LinkedIn:
            <input
              type="text"
              name="LinkedIn"
              value={this.state.LinkedIn}
              onChange={this.change}
              style={{ padding: "10px", textAlign: "center" }}
            />
          </label>
        </form>
      </div>
    );
  };

  List = () => {
    return (
      <div className="myStyle">
        <form>
          <input
            type="text"
            placeholder="Search for..."
            value={this.data}
            onChange={this.handleChange}
          />
        </form>
        <div className="myStyle">
          {this.state.filteredData.map((i) => (
            <div>
              <Card
                style={{
                  width: "18rem",
                  borderRadius: 10,
                  borderColor: "red",
                  background: "lightgrey",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <p>{i.firstName}</p>
                    <p>{i.lastName}</p>
                    <p>{i.Email}</p>
                    <a
                      href={"/UserTo/" + i.Email}
                      onClick={(e) => this.UserTo(e, i.Email)}
                      className="btn btn-primary"
                    >
                      View
                    </a>
                  </Card.Title>
                </Card.Body>
              </Card>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary justify-content">
              <Link className="navbar-brand" to="/">
                My Profile
              </Link>
              <Link className="navbar-brand" to="/List">
                Users
              </Link>
              <div className="collapse navbar-collapse justify-content-end">
                <a className="btn btn-primary" type="submit" href="/Profile">
                  Logout
                </a>
              </div>
            </Navbar>
            <Switch>
              <Route path="/List">{this.List}</Route>
              <Route path="/">{this.MyProfile}</Route>
              <Route path="/UserTo">{this.UserTo}</Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
