const express = require('express');
const app = express();

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.get('/', (req, res) =>{
  res.send('Hello world');
});

app.get('/api/courses', (req, res) =>{
  res.send([1 , 2, 3]);
});

// /api/courses/1

//read one param
app.get('/api/courses/:id', (req, res) =>{
  res.send(req.params.id);
});

//Handiling HTTP GET REQUESTS
//Now I have 2 enpdpoins:

//One to get all the courses
app.get('/api/courses', (req, res) =>{
  res.send([1 , 2, 3]);
});

//One to get one course
app.get('/api/courses/:id', (req, res) =>{
 res.send(req.query)
});


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


