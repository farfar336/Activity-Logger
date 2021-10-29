const router = require('express').Router();
let User = require('../models/user.model'); //Mongoose model

//Handles get requests
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users)) //Returns the users in json format
    .catch(err => res.status(400).json('Error: ' + err)); //Catch errors
});

//Handles post requests
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  //Save the new user in the database
  newUser.save()
    .then(() => res.json('User added!')) //Returns "User added" text
    .catch(err => res.status(400).json('Error: ' + err)); //Returns error message
});

module.exports = router;