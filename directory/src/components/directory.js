import React, { Component } from "react";
import { Card, Navbar } from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { AlexaForBusiness } from "aws-sdk";

import EditableLabel from 'react-inline-editing';

// const brow = require("../browse");

export default class Users extends Component {
  constructor() {
    super();

    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);

    this.state = {
      data: [],
      query: "",
      firstName: "",
      Email: "",
      // LinkedIn: "https://www.linkedin.com/in/vamsikrishna-nunna/",
      // collage: "rvr&jc collage of engineering",
      filteredData: [],
      isInEditMode : false,
      fields : {}
    };
    this.MyProfile = this.MyProfile.bind(this);

  }



  _handleFocus(text) {
    console.log('Focused with text: ' + text);
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

  // updateChange(e) {
  //   // this.setState({[e.target.name]: e.target.value});
  //   this.e.target.name = e.target.value;
  //   console.log(e.target.name, e.target.value )
  // }

  handleChange = (event) => {
    const query = event.target.value;
    console.log(query, " in handle change++++++++++++");
    const mData = this.state.data.filter((val) =>
      String(val.Email + val.firstName + val.lastName)
        .toLowerCase()
        .includes(query.toLowerCase())
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
      this.state.filteredData = userdata;
      return (
        <div>
          <div className="myStyle">
            {userdata.map((i) => (
              <div>
                {/* <h2>{i.Email}</h2> */}
                {this.personalForm(i)};
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      console.log(window.location.pathname);
      console.log(link, "In else");
      const email = "hridayathineni329@gmail.com";
      const userdata = this.state.data.filter(
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
              <div className="collapse navbar-collapse justify-content-end">
              <Link className="navbar-brand" to="/edit">
                Edit
              </Link>
              </div>
            </Navbar>
            <h2>Your profile</h2>

            <Switch>
              <Route path="/Personal">{this.Personal}</Route>
              <Route path="/Educational">{this.Educational}</Route>
              <Route path="/Social">{this.Social}</Route>
              <Route path="/edit">{this.edit}</Route>
            </Switch>
          </Router>
        </div>
      );
    }
  };

  




  personalForm(i) {
    console.log(i);
    return (
      <form style={{ textAlign: "center" }}>
        <label>
          FirstName:
          <input
            type="text"
            name="name"
            value={i.firstName}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>

        <br></br>
        <label>
          LastName:
          <input
            type="text"
            name="name"
            value={i.lastName}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={i.Email}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>

        <label>
          Password:
          <input
            type="text"
            name="Password"
            value={i.Password}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          gender:
          <input
            type="text"
            name="gender"
            value={i.gender}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          DOB:
          <input
            type="date"
            name="DOB"
            value={i.DOB}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          PhoneNumber:
          <input
            type="text"
            name="PhoneNumber"
            value={i.PhoneNumber}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          FatherName:
          <input
            type="text"
            name="FatherName"
            value={i.FatherName}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          FatherEmail:
          <input
            type="text"
            name="FatherEmail"
            value={i.FatherEmail}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          FatherPh:
          <input
            type="text"
            name="FatherPh"
            value={i.FatherPh}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          MotherName:
          <input
            type="text"
            name="MotherName"
            value={i.MotherName}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          MotherEmail:
          <input
            type="text"
            name="MotherEmail"
            value={i.MotherEmail}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          MotherPh:
          <input
            type="text"
            name="MotherPh"
            value={i.MotherPh}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
        <br></br>
        <label>
          Address:
          <input
            type="text"
            name="Address"
            value={i.Address}
            onChange={this.change}
            style={{ padding: "10px", textAlign: "center" }}
          />
        </label>
      </form>
    );
  }

  Personal = () => {
    return (
      <div>
        <h1>
          <span className="font-weight-bold">Personal</span>
        </h1>
        {this.state.filteredData.map((i) => (
          <div>{this.personalForm(i)};</div>
        ))}
      </div>
    );
  };

  Educational = () => {
    return (
      <div>
        <h1>
          <span className="font-weight-bold">Educational</span>
        </h1>
        {this.state.filteredData.map((i) => (
          <div>
            <form style={{ textAlign: "center" }}>
              <label>
                GATRank:
                <input
                  type="text"
                  name="GATRank"
                  value={i.GATRank}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                GATHallNo:
                <input
                  type="text"
                  name="GATHallNo"
                  value={i.GATHallNo}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                BTechYear:
                <input
                  type="text"
                  name="BTechYear"
                  value={i.BTechYear}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                BTechCollege:
                <input
                  type="text"
                  name="BTechCollege"
                  value={i.BTechCollege}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                BTechUniversity:
                <input
                  type="text"
                  name="BTechUniversity"
                  value={i.BTechUniversity}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                BTechBranch:
                <input
                  type="text"
                  name="BTechBranch"
                  value={i.BTechBranch}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                BTechPercentage:
                <input
                  type="text"
                  name="BTechPercentage"
                  value={i.BTechPercentage}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                InterPercentage:
                <input
                  type="text"
                  name="InterPercentage"
                  value={i.InterPercentage}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                SSCPercentage:
                <input
                  type="text"
                  name="SSCPercentage"
                  value={i.SSCPercentage}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
            </form>
          </div>
        ))}
      </div>
    );
  };



  Social = () => {
    return (
      <div>
        <h1>
          <span className="font-weight-bold">Social</span>
        </h1>
        {this.state.filteredData.map((i) => (
          <div>
            <form style={{ textAlign: "center" }}>
              <label>
                LinkedIn:
                <input
                  type="text"
                  name="LinkedIn"
                  value={i.LinkedIn}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
              <label>
                GitHub:
                <input
                  type="text"
                  name="GitHub"
                  value={i.GitHub}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              <br></br>
            </form>
          </div>
        ))}
      </div>
    );
  };

  // state = {
  //   isInEditMode : false
  // }

  // changeEdit = () => {
  //   console.log("edit mode called")
  //   this.setState({
  //     isInEditMode : !this.state.isInEditMode
  //   })
  // }

   sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  _handleFocusOut(e) {
    // console.log(this.state.fields)

    // console.log(this.state.fields[0].firstName)
    // this.setState({fields[e.target.name]: e.target.value});
    this.state.fields[0][e.target.name] = e.target.value;
    // console.log(this.state.fields)
    // console.log('Left editor with text: ' + e.target.value);
}

  update = () => {
    console.log("update called")
    // console.log(this.state.gender,"+++++++++++++++++++++++++")
    // console.log(this.state.MotherPh,"+++++++++++++++++++++++++")
    // this.sleep(20000);

    const userr = this.state.fields[0];
    axios.post(`http://localhost:3001/add`, { userr })
      .then(response => { 
        console.log(response)
        })
      .catch(error => {
          console.log(error.response)
      });  
  }

  

  edit = () => {
    this.state.fields = this.state.filteredData;
    // console.log(this.state.fields, "ffffffffffffffffffffffffffffffffffffffffffffffffff")
    return (
      <div>
        <h1>
          <span className="font-weight-bold">You can edit only these fields</span>
        </h1>
        {this.state.filteredData.map((i) => (

            <div>
              <form onSubmit={this.update} style={{ textAlign: "center" }}> 
               <div onDoubleClick = {this.changeEdit}>
              <label>
                PhoneNumber:
                <input
                  type="text"
                  name="PhoneNumber"
                  onChange={this._handleFocusOut}
                  defaultValue={i.PhoneNumber}
                  style={{ padding: "10px", textAlign: "center" }}
                />
               
              </label>
              </div> 
 
              <div onDoubleClick = {this.changeEdit}>
              <label>
                MotherPh:
                <input
                  type="text"
                  name="MotherPh"
                  onChange={this._handleFocusOut}
                  defaultValue={i.MotherPh}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              </div>  

              <div onDoubleClick = {this.changeEdit}>
              <label>
                FatherPh:
                <input
                  type="text"
                  name="FatherPh"
                  onChange={this._handleFocusOut}
                  defaultValue={i.FatherPh}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              </div>  

              <div onDoubleClick = {this.changeEdit}>
              <label>
                LinkedIn:
                <input
                  type="text"
                  name="LinkedIn"
                  onChange={this._handleFocusOut}
                  defaultValue={i.LinkedIn}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              </div>  

              <div onDoubleClick = {this.changeEdit}>
              <label>
                GitHub:
                <input
                  type="text"
                  name="GitHub"
                  onChange={this._handleFocusOut}
                  defaultValue={i.GitHub}
                  style={{ padding: "10px", textAlign: "center" }}
                />
              </label>
              </div> 
              <br></br> 
              <Button type="submit">Save</Button>
              
            </form>  
            
            </div>
        ))}
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
          {this.state.data.map((i) => (
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
                      // onClick={(e) => this.UserTo(e, i.Email)}
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
              {/* <Route path="/UserTo">{this.UserTo}</Route> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
