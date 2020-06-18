import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import { Card, Navbar, Button, Form, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";




export default class Users extends Component {
  
  constructor () {
		super();
    		this.state = {
			data:[],
			query: "",
      name:'',
			filteredData:[]
		}
    this.MyProfile = this.MyProfile.bind(this)
	}

  componentDidMount () {
    fetch('https://reactnative.dev/movies.json')
    .then((Response)=>Response.json())
    .then((findresponse)=>{
      this.setState({
        data:findresponse.movies,
        filteredData: findresponse.movies,
      })
    })
  }

  handleChange = event => {
  	const query = event.target.value;
  	console.log(query)
  	const mData = this.state.data.filter(val => String(val.title).toLowerCase().includes(query.toLowerCase()));
  	console.log(mData)
  	this.setState({
  		filteredData: mData
  	})

  	
  };

  UserTo = () => {
    // const id = this.data-value
    // console.log(id)
    // const arr = this.state.data.filter(val => String(val.title).toLowerCase() === String(id).toLowerCase());
    // this.state.filteredData = arr
    // console.log(this.state.filteredData)

    return (
      <div>
          <div className="myStyle">{this.state.filteredData.map(i => 
            <div>
              <h2>{i.title}</h2>
            </div>  
          )}</div> 
      </div>
    )
    }

  MyProfile = () => {
      console.log(window.location.pathname)

      var link = ((window.location.pathname).split("/"));
      console.log(link)
      if (link.length > 2) {
        var link1 = link[2].split("_").join(" ")
        console.log(link1, "%%%%%%%%%%%%%")
        const userdata = this.state.filteredData.filter(val => String(val.title) === link1);
        return (
      <div>
          <div className="myStyle">{userdata.map(i => 
            <div>
              <h2>{i.title}</h2>
            </div>  
          )}</div> 
      </div>
    )
      }  else {
        console.log(window.location.pathname)
        console.log(link, "In else")
        return <h2>Your profile</h2>
      }
  }  

  List = () => {
    return (
      <div className="myStyle">
        <form>
          <input
            type = "text"
            placeholder="Search for..."
            value={this.data}
            onChange={this.handleChange}
          />
        </form>
        <div className="myStyle">{this.state.filteredData.map(i => 
          <div>
            <Card style={{ width: '18rem', borderRadius: 10, borderColor: 'red', background: 'lightgrey'}}>
          <Card.Body>
              <Card.Title>
                <p>{i.title}</p>
                <a href = {"/UserTo/"+i.title.split(" ").join("_")} onClick={(e) => this.UserTo(e, i.title)} className = "btn btn-primary">View</a>
              </Card.Title>
          </Card.Body>
        </Card>
        <br />
      </div>  
          )}</div>
      </div>
    )  
  }


  render() {
    return (

    <div>

      <Router>
        <div>
          <Navbar className ="navbar navbar-expand-lg navbar-dark bg-primary justify-content">
                <Link className="navbar-brand" to="/">My Profile</Link>
                <Link className="navbar-brand" to="/List">Users</Link>
                <div className="collapse navbar-collapse justify-content-end">
                <a className="btn btn-primary" type="submit" href = "/Profile">Logout</a>
            </div>  

          </Navbar>
          <Switch>
            <Route path="/List">
              {this.List}
            </Route>
            <Route path="/">
              {this.MyProfile}
            </Route>
            <Route path="/UserTo">
              {this.UserTo}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>  
    );
  }
}