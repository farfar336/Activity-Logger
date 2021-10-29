import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  // props is used to pass data from one component to another
  constructor(props) {
    super(props);

    // Making sure 'this' is not undefined
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Default state is username that is blank
    this.state = {
      username: ''
    }
  }

  // When the text in the text field changes, update the username
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  // When submit button is pressed, send info to the backend, and then clear the field
  onSubmit(e) {
    // Prevent default behavior from happening
    e.preventDefault();

    // Assigns the text entered to be the username to be send over
    const user = {
      username: this.state.username
    }

    console.log(user);

    // Sends information to the backend
    axios.post('http://localhost:5000/users/add', user) //Location to where to send info
      .then(res => console.log(res.data)); //Console the result

    //   Clear the field after submitting
    this.setState({
      username: ''
    })
  }

  // Frontend
  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required //Must enter usernmae
                className="form-control" //For styling
                value={this.state.username} //Sets the value of the text field to be the username
                onChange={this.onChangeUsername} //When text field is changed, update the username
                />
          </div>
          <div className="form-group">
            {/* Submit button */}
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}