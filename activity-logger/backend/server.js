const express = require ('express');
const cors = require ('cors');
const mongoose = require('mongoose'); //Helps connect to MongoDB database

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //Middleware
app.use(express.json()); //Allows parsing json

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, { useNewUrlParser: true, }
);
const connection = mongoose.connection;
connection.once('open', () => { //Executes when MongoDB connection is open
    console.log("MongoDB database connection established succesfully");
})

//Importing the files into these variables:
const activitiesRouter = require('./routes/activities');
const usersRouter = require('./routes/users');

//When /activities or /users is put at the end, it will load that corresponding router
app.use('/activities', activitiesRouter);
app.use('/users', usersRouter);

app.listen(port, () => { //Executes when server is started
    console.log(`Server is running on port: ${port}`);
});