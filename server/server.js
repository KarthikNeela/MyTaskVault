
//initialize all the required components
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express(); //initializes express
// express is used for creating and running a web server in node.js


//this acts as a middle ware to parse incoming JSON requests
app.use(bodyParser.json());

//CORS is used to establish a communication line between frontend and backend
//simply put - We enable cors so frontend can talk to backend.
app.use(cors());

//this acts a route prefix
//route prefix : a base path that is added in front of all the routes defined
app.use('/api',routes);

//start the server
const PORT =3000;
app.listen(PORT, ()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});