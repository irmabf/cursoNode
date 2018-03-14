const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

app.get('/', (req, res) =>{
  res.send('Hello world');
});


//Handiling HTTP GET REQUESTS
//Now I have 2 enpdpoins:

//One to get all the courses
app.get('/api/courses', (req, res) =>{
  res.send(courses);
});

//One to get one course
app.get('/api/courses/:id', (req, res) =>{
  const course = courses.find( c => c.id === parseInt(req.params.id) );

  if(!course) res.status(404).send('The course with the given id was not found');

  res.send(course);
});

// post to the collection of courses
app.post('/api/courses', (req, res) => {
  //adding some input validation logic for the client
  if(!req.body.name || req.body.name.length < 3 ){
    //400, bad request 
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name, 
  };

  courses.push(course);

  res.send(course);

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


