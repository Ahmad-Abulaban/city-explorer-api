'use strict'

const express = require('express');

require('dotenv').config();

const cors =require('cors');

const PORT = process.env.PORT;

const server = express();
server.use(cors());
const weather = require('./data/weather.json');


server.get('/', (request,response) => {
    response.status(200).send('Welcome to the home Route');
})

class ForeCast{
    constructor(a, b){
        this.date = a;
        this.description = b;
    }
}

// server.get('/location',(request,response)=>{
//     try {
//     const weatherData = require('./data/weather.json');
//     const city = request.query.city;
//     const locationData= new Location(city,weatherData)
//     response.status(200).json(locationData);
//     } catch (error) {
//         Error(error, request, response);
//   }
 
// });

// localhost:3005/weather?SearchQuery=
server.get('/weather',(request,response)=>{
//   try {
  let SearchQuery = request.query.SearchQuery;
  let NewData = weather.find(item => {
      if (item.city_name.toLocaleLowerCase() === SearchQuery.toLocaleLowerCase()) {
          return item;
      }
  })

  let NewArray = NewData.data.map(Value => {
      return new ForeCast(Value.valid_date, Value.weather.description);
  })

  response.send(NewArray);
//   firstData.data.forEach((day)=>{
//    weatherSummery.push(new Weather(day));
//   });
//   response.status(200).json(weatherSummery);
//     } catch (error) {
//         Error(error, request, response);
//   }
});

// function Location(city,weatherData){
//     this.search_query=city;
//     this.formatted_query = weatherData[0].display_name;
//     this.latitude = weatherData[0].lat;
//     this.longitude = weatherData[0].lon;
// };

// function Weather(sky){
//     this.forecast = sky.weather.description;
//     this.time = new Date(sky.valid_date).toDateString();
// };



server.get('*', (request, response) =>{
    response.status(404).send('NOT FOUND')
});


// function Error(error, request, response) {
//     response.status(500).send({'Status': 500,responseText:'sorry something went wrong'});

//   };

server.listen(PORT,()=> {
    console.log(`Listening on PORT ${PORT}`);
})


