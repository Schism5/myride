module.exports = require('mongoose').model('Student', {
    tag: {
        type: Number,
        required: true
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