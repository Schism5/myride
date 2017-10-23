var router  = require('express').Router();
var Student = require('./../model/student');
var util = require('./../util/util');

//for inserting seed data
router.post('/save', (req, res) => {
    let student = new Student(req.body.student);

    student.save().then(doc => {
        res.send(doc);
    },
    error => {
        console.log('Unable to save student', error);
        res.status(400).send(error);
    });
});

router.get('/all', (req, res) => {
    Student.find().then(students => {
        res.send(util.createSuccessStatus(students));
    }, error => {
        console.log('Unable to get all students', error);
        //need to grab something meaningful from error object
        res.status(400).send(error);
    });
});

router.get('/:tag', (req, res) => {
    let tag = req.params.tag;

    if(!tag) {
        res.status(404).send(util.createFailureStatus(`Invalid Student tag: ${tag}`));
        return;
    }

    Student.findOne({tag}).then(student => {
        if(student) {
            res.send(util.createSuccessStatus(student));
            return;
        }

        res.status(400).send(util.createFailureStatus(`Student not found for tag ${tag}`));
    }).catch(error => {
        console.log('Error finding Student by tag');
        res.status(500).send(util.createFailureStatus("Unknown error occurred"));
    });
});

// app.delete('/todos/:id', (req, res) => {
//     let id = req.params.id;
//     if(!ObjectID.isValid(id)) {
//         res.status(404).send();
//         return;
//     }

//     Todo.findByIdAndRemove(id).then(todo => {
//         if(todo) {
//             res.send(todo);
//             return;
//         }

//         res.status(404).send();
//     }).catch(error => res.status(400).send());

// });

module.exports = router;