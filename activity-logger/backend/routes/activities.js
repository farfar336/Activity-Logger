const router = require('express').Router();
let Activity = require('../models/activity.model');

//Handles get request
router.route('/').get((req, res) => {
    // Finds all activity
  Activity.find()
    .then(activities => res.json(activities)) //Returns all activity in json format
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handles post request
router.route('/add').post((req, res) => {

    //Stores new info in variables 
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

    //Creates new activity entry   
  const newActivities = new Activity({
    username,
    description,
    duration,
    date,
  });

//   Saves new activity in the database
  newActivities.save()
  .then(() => res.json('Activity added!')) //Returns message saying "activity added"
  .catch(err => res.status(400).json('Error: ' + err)); //Returns error message
});

//Gets info for a specific ID
router.route('/:id').get((req, res) => {
  Activity.findById(req.params.id) //Finds the specific ID
    .then(activity => res.json(activity)) //Return entry as json 
    .catch(err => res.status(400).json('Error: ' + err)); //Else return error
});

//Deletes entry with a specified ID
router.route('/:id').delete((req, res) => {
  Activity.findByIdAndDelete(req.params.id) //Deletes entry
    .then(() => res.json('Activity deleted.')) //Returns "Activity deleted""
    .catch(err => res.status(400).json('Error: ' + err));
});

//Updates entry with the specified ID
router.route('/update/:id').post((req, res) => {
  Activity.findById(req.params.id) //Find the entry
    .then(activity => { //Update the variables
      activity.username = req.body.username;
      activity.description = req.body.description;
      activity.duration = Number(req.body.duration);
      activity.date = Date.parse(req.body.date);

      //Save the entry
      activity.save()
        .then(() => res.json('Activity updated!')) //Returns message "Activity updated!"
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;