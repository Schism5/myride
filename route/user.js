var router  = require('express').Router();
var User = require('./../model/User');
var util = require('./../util/util');

//for inserting seed data
router.post('/save', (req, res) => {
    let user = new User(req.body.user);

    user.save().then(doc => {
        res.send(doc);
    },
    error => {
        console.log('Unable to save user', error);
        res.status(400).send(error);
    });
});

router.get('/all', (req, res) => {
    User.find().then(users => {
        res.send(util.createSuccessStatus(users));
    }, error => {
        console.log('Unable to get all users', error);
        //need to grab something meaningful from error object
        res.status(400).send(error);
    });
});

router.get('/:email', (req, res) => {
    let email = req.params.email;

    if(!email) {
        res.status(404).send(util.createFailureStatus(`Invalid email: ${email}`));
        return;
    }

    User.findOne({email}).then(user => {
        if(user) {
            res.send(util.createSuccessStatus(user));
            return;
        }

        res.status(400).send(util.createFailureStatus(`User not found for emali ${email}`));
    }).catch(error => {
        console.log('Error finding User by email');
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