import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercises extends Component {

    constructor (props){
        super(props);

        // Making sure 'this' is not undefined
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value //Change username to the value set in the text box
        })
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeDuration(e) {
        this.setState({
          duration: e.target.value
        })
      }
    
      onChangeDate(date) {
        this.setState({
          date: date
        })
      }

    onSubmit(e){ //When submit button is clicked, do this
        e.preventDefault(); //Prevent default behavior and do the action below instead

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)
        
        // Send the info to the backend
        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data)); //Console log the result

        window.location = '/'; //Take the user back to the home page after submitting
    } 

    componentDidMount(){ //Called before page loads
        axios.get('http://localhost:5000/users/') //Where to retreieve info from
        .then(response => {
          if (response.data.length > 0) { //Check if there is at least 1 user
            this.setState({
              users: response.data.map(user => user.username), //Return every username  in the array
              username: response.data[0].username  //First element is the username
            }) 
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    

    render() {
        return (
            <div>
            <h3>Create New Exercise Log</h3>
            {/* Call when submit button is clicked */}
            <form onSubmit={this.onSubmit}> 

            {/* Dropdown menu */}
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        //   For each user in the array, return key and value
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    // Called when changing the description
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                    {/* Shows a calendar */}
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}