var router  = require('express').Router();

var Student = require('./../model/student');

//for inserting seed data
router.post('', (req, res) => {
    let student = new Student(req.body.student);

    student.save().then(doc => {
        res.send(doc);
    },
    error => {
        console.log('Unable to save student', error);
        res.status(400).send(error);
    });
});

// app.get('/todos', (req, res) => {
//     Todo.find().then(todos => {
//         res.send({todos});
//     }, error => {
//         console.log('Unable to get all todos', error);
//         res.status(400).send(error);
//     });
// });

router.get('/:tag', (req, res) => {
    let tag = req.params.tag;

    if(!tag) {
        res.status(404).send({
            success: false,
            student: null,
            message: `Invalid Student tag: ${tag}`
        });
        return;
    }

    Student.findOne({tag}).then(student => {
        if(student) {
            res.send({
                success: true,
                student,
                message: "Success"
            });
            return;
        }

        res.status(400).send({
            success: false,
            student: null,
            message: `Student not found for tag ${tag}`
        });
    }).catch(error => {
        console.log('Error finding Student by tag');
        res.status(500).send({
            success: false,
            student: null,
            message: "Unknown error occurred"
        });
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