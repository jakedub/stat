const path = require('path');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const routes = require("./routes");
const models = require('./models');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(routes);

//Add Activity for Testing
// models.Activity.create({
//   name: 'Flight of Stairs',
//   performance: 10,
//   date: 2016/10/01
// }).then(function(){
//   return models.Activity.findAll();
// }).then(function(activity){
//   console.log(activity.map(function(activity){
//     return activity.name;
//   }));
// });



app.listen(3000, function(){
  console.log("Listening yet?");
})
