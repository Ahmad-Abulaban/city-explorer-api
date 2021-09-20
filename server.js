'use strict'

const express = require('express');

require('dotenv').config();

const cors =require('cors');

const PORT = process.env.PORT;

const server = express();


server.use(cors());

server.get('/', (request,response) => {
    response.status(200).send('Welcome to the home page');
})


server.get('/location',(request,response)=>{
    try {
    const weatherData = require('./data/weather.json');
    const city = request.query.city;
    const locationData= new Location(city,weatherData)
    response.status(200).json(locationData);
    } catch (error) {
        Error(error, request, response);
  }
 
});


server.get('/weather',(request,response)=>{
  try {
  const firstData = require('./data/weather.json');
  const weatherSummery=[];
  firstData.data.forEach((day)=>{
   weatherSummery.push(new Weather(day));
  });
  response.status(200).json(weatherSummery);
    } catch (error) {
        Error(error, request, response);
  }
});

function Location(city,weatherData){
    this.search_query=city;
    this.formatted_query = weatherData[0].display_name;
    this.latitude = weatherData[0].lat;
    this.longitude = weatherData[0].lon;
};

function Weather(sky){
    this.forecast = sky.weather.description;
    this.time = new Date(sky.valid_date).toDateString();
};



server.get('*', (request, response) =>{
    response.status(404).send('NOT FOUND')
});


function Error(error, request, response) {
    response.status(500).send({'Status': 500,responseText:'sorry something went wrong'});

  };

server.listen(PORT,()=> {
    console.log(`Listening on PORT ${PORT}`);
})


