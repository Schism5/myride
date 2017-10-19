module.exports = require('mongoose').model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    schoolDistrict: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    schoolName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});