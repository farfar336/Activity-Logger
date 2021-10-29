import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Props hold the variables for each entry
const Activity = props => (
  <tr>
    <td>{props.activity.username}</td>
    <td>{props.activity.description}</td>
    <td>{props.activity.duration}</td>
    <td>{props.activity.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.activity._id}>edit</Link> | <a href="#" onClick={() => { props.deleteActivity(props.activity._id) }}>delete</a>
    </td>
  </tr>
)

export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);
    
        this.deleteActivity = this.deleteActivity.bind(this)
    
        this.state = {activities: []};
      }

      componentDidMount() {
        axios.get('http://localhost:5000/activities/') //Where to retrieve info from
          .then(response => {
            this.setState({ activities: response.data }) //Get all the fields
          })
          .catch((error) => {
            console.log(error);
          })
      }

      deleteActivity(id) {
        axios.delete('http://localhost:5000/activities/'+id)
          .then(response => { console.log(response.data)}); //console log the result
    
          // Delete the activity displayed to the user
        this.setState({
          activities: this.state.activities.filter(el => el._id !== id) //Return that entry if that entry is not the deleted entry
        })
      }

      activityList() {
        return this.state.activities.map(currentactivity => {
          return <Activity activity={currentactivity} deleteActivity={this.deleteActivity} key={currentactivity._id}/>;
        })
      }

    render() {
      return (
        <div>
          <h3>Logged Activities</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.activityList() }
            </tbody>
          </table>
        </div>
      )
    }
}