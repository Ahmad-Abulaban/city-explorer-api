'use strict'

const express = require('express');

require('dotenv').config();

const cors =require('cors');

const handleMovie = require('./Module/Movie');

const handleWeather = require('./Module/Weather');

const PORT = process.env.PORT;

const server = express();
server.use(cors());

server.get('/', (request,response) => {
    response.status(200).send('Welcome to the home Route');
})

// localhost:3005/movie?searchQuery=
server.get('/movie', handleMovie);

// localhost:3005/weather?city=
server.get('/weather', handleWeather);

server.get('*', (request, response) =>{
    response.status(404).send('NOT FOUND')
});

server.listen(PORT,()=> {
    console.log(`Listening on PORT ${PORT}`);
})


