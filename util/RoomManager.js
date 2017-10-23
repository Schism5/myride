const EventEmitter = require('events');

 class RoomManager extends EventEmitter {
    constructor() {
        super();
        this._rooms = {};

        //structure:
        // _rooms : {
        //     roomName1: {
        //         users: {

        //         },
        //         students: {

        //         }
        //     },
        //     roomName2: {
        //         users: {

        //         },
        //         students: {
                    
        //         }
        //     }
        //}
    }

    getRoom(roomId) {
        return this._rooms[roomId];
    }

    getAllUsersInRoom(roomId) {
        return Object.values(this._rooms[roomId].users);
    }

    getAllStudentsInRoom(roomId) {
        return Object.values(this._rooms[roomId].students);
    }

    createRoom(roomId, users, students) {
        this._rooms[roomId] = {
            users: {},
            students: {}
        };

        let room = this.getRoom(roomId);

        if(users) {
            users.forEach(user => {
                room.users[user.email] = user;
            });
        }

        if(students) {
            students.forEach(student => {
                room.students[student.tag] = student;
            });
        }

        this.emit('createroom', room);
        return room;
    }

    addUserToRoom(roomId, user) {
        this._rooms[roomId].users[user.email] = user;
        this.emit('adduser', user);
    }

    addStudentToRoom(roomId, student) {
        this._rooms[roomId].students[student.tag] = student;
        this.emit('addstudent', student);
    }

    removeUser(roomId, email) {
        let users = this.getRoom(roomId).users,
            user  = users[email];

        delete users[email];
        this.emit('removeuser', user);

        return user;
    }

    removeStudent(roomId, tag) {
        let students = this.getRoom(roomId).students,
            student  = students[tag];

        delete students[tag];
        this.emit('removestudent', student);

        return student;
    }

    removeRoom(roomId) {
        let room = this.getRoom(roomId);
        delete this._rooms[roomId];
        this.emit('removeroom', room);
    }
 }

module.exports = RoomManager;

var manager = new RoomManager();
manager.createRoom('1', 
    [{
        name:'scott',
        email:'s@email.com'
    }, {
        name:'jade',
        email:'j@email.com'
    }],
    [{
        tag:'one'
    },{ 
        tag:'two'
    }]
);

function log(o) {
    console.log(JSON.stringify(o, null, 2));
}

//manager.addStudentToRoom('1', {tag:'three'});
//manager.removeStudent('1', 'two');
//manager.createRoom('2');
//manager.addUserToRoom('1', {name:'oliver', email:'o@email.com'});
//manager.removeUser('1', 'j@email.com');
//manager.removeRoom('1');
//log(manager.getAllUsersInRoom('1'));