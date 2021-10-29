const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//Handles get request
router.route('/').get((req, res) => {
    // Finds all exercise
  Exercise.find()
    .then(exercises => res.json(exercises)) //Returns all exercise in json format
    .catch(err => res.status(400).json('Error: ' + err));
});

//Handles post request
router.route('/add').post((req, res) => {

    //Stores new info in variables 
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

    //Creates new exercise entry   
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

//   Saves new exercise in the database
  newExercise.save()
  .then(() => res.json('Exercise added!')) //Returns message saying "exercise added"
  .catch(err => res.status(400).json('Error: ' + err)); //Returns error message
});

//Gets info for a specific ID
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id) //Finds the specific ID
    .then(exercise => res.json(exercise)) //Return entry as json 
    .catch(err => res.status(400).json('Error: ' + err)); //Else return error
});

//Deletes entry with a specified ID
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id) //Deletes entry
    .then(() => res.json('Exercise deleted.')) //Returns "Exercise deleted""
    .catch(err => res.status(400).json('Error: ' + err));
});

//Updates entry with the specified ID
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id) //Find the entry
    .then(exercise => { //Update the variables
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      //Save the entry
      exercise.save()
        .then(() => res.json('Exercise updated!')) //Returns message "Exercise updated!"
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;