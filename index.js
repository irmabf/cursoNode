const Joi = require('joi');
const morgan  = require('morgan');
const helmet = require('helmet');

const courses =require('./routes/courses');
const home = require('./routes/home');

const express = require('express');
const app = express();


const logger = require('./middleware/logger');


app.set('view engine', 'pug');
app.set('views', './views'); //Default

app.use(express.json());

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);

const port = process.env.PORT || 3000;

app.listen(port, () =>console.log(`Listening on port ${port}`));


//Read multiple params
/*
app.get('/api/posts/:year/:month',(req, res) =>{
  res.send(req.params);
});
*/
/*
app.get('/api/posts/:year/:month',(req, res) =>{
  res.send(req.query);
});
*/
