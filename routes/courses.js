const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
];

//One to get all the courses
router.get('/', (req, res) =>{
  res.send(courses);
 });
 
// Post to the collection of courses
router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);

});

//Logic for updating a course
router.put('/:id', (req, res) =>{
 const course = courses.find( c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given id was not found');

 const { error } = validateCourse(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 course.name = req.body.name;
  res.send(course);
});

router.delete('/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if (!course) return res.status(404).send('The course with the given ID was not found');

 const index = courses.indexOf(course);
 courses.splice(index, 1);

 res.send(course);
});

//Handiling HTTP GET REQUESTS
//Now I have 2 enpdpoins:

//One to get one course
router.get('/:id', (req, res) =>{
 const course = courses.find( c => c.id === parseInt(req.params.id) );

 if(!course) return res.status(404).send('The course with the given id was not found');

 res.send(course);
});

//Function for validate course input
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
 
  return Joi.validate(course, schema)
 }

module.exports = router;