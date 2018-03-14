const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

// Post to the collection of courses
app.post('/api/courses', (req, res) => {
   const { error } = validateCourse(req.body); 
   if(error){
     res.status(400).send(result.error.details[0].message);
     return; 
   }
   const course = {
     id: courses.length + 1,
     name: req.body.name, 
   };
   courses.push(course);
   res.send(course);
 
 });
 

//Logic for updating a course

app.put('/api/courses/:id', (req, res) =>{
  const course = courses.find( c => c.id === parseInt(req.params.id));
   if (!course) res.status(404).send('The course with the given id was not found');

  //const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); 
  if(error){

    res.status(400).send(error.details[0].message);
    return; 
  }

  //Update the course
  course.name = req.body.name;
  //Return the updated course to the client
  res.send(course);
});

//Function for validate course input
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema)
}


//Handiling HTTP GET REQUESTS
//Now I have 2 enpdpoins:

//One to get one course
app.get('/api/courses/:id', (req, res) =>{
  const course = courses.find( c => c.id === parseInt(req.params.id) );

  if(!course) res.status(404).send('The course with the given id was not found');

  res.send(course);
});


//One to get all the courses
app.get('/api/courses', (req, res) =>{
  res.send(courses);
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


