'use strict'

const express = require('express');

require('dotenv').config();

const cors =require('cors');

const handleMovie = require('./Module/Movie');

const handleWeather = require('./Module/Weather');

const PORT = process.env.PORT;

const server = express();
server.use(cors());
// const weather = require('./data/weather.json');


server.get('/', (request,response) => {
    response.status(200).send('Welcome to the home Route');
})

// class ForeCast{
//     constructor(a, b){
//         this.date = a;
//         this.description = b;
//     }
// }

// localhost:3005/weather?SearchQuery=
// server.get('/weather',(request,response)=>{
//   let SearchQuery = request.query.SearchQuery;
//   let NewData = weather.find(item => {
//       if (item.city_name.toLocaleLowerCase() === SearchQuery.toLocaleLowerCase()) {
//           return item;
//       }
//   })

//   let NewArray = NewData.data.map(Value => {
//       return new ForeCast(Value.valid_date, Value.weather.description);
//   })

//   response.send(NewArray);
// });


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


