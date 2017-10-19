const EventEmitter = require('events');

 class RoomManager extends EventEmitter {
    constructor(config) {
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

        // if(config) {
        //     for(var key in config) {
        //         this._rooms[key] = {
        //             user: config[key],
        //             students: config[key]
        //         };
        //     }
        // }
    }

    getRoom(roomId) {
        return this._rooms[roomId];
    }

    getUsersByRoom(roomId) {
        return this._rooms[roomId].users;
    }

    getStudentsByRoom(roomId) {
        return this._rooms[roomId].students;
    }

    createRoom(roomId, users, students) {
        this._rooms[roomId] = {
            users: {},
            students: {}
        };

        let room = this.getRoom(roomId);

        if(users) {
            users.forEach(user => {
                this[user.email] = user;
            }, room.users);
        }

        if(students) {
            students.forEach(student => {
                this[student.tag] = student;
            }, room.students);
        }

        this.emit('createroom', room);
        return room;
    }

    removeStudent(roomId, tag) {
        let students = this.getRoom(roomId).students,
            key, student;

        for(key in students) {
            if(key === tag) {
                student = students[key];
                delete students[key];
                break;
            }
        }

        this.emit('removestudent', student);
        return student;
    }

    removeRoom(roomId) {
        let room = this.getRoom(roomId);
        delete this._rooms[roomId];
        this.emit('removeroom', room);
    }
 }

//var Stash = function(config) {
    //const emitter = new EventEmitter();
    //let cache = {};

    // if(config) {
    //     for(var key in config) {
    //         cache[key] = {
    //             value: config[key]
    //         };
    //     }
    // }

    // var stash = {};

    // stash.getStash = () => {
    //     let normalCache = {};
    //     for(var key in cache) {
    //         normalCache[key] = cache[key].value;
    //     }

    //     return normalCache;
    // };

    // stash.get = key => cache[key].value;

    // stash.set = function(key, value) {
    //     cache[key] = {value:value};
    //     emitter.emit('set', key, value);
    // };

    // stash.clear = function() {
    //     cache = {};
    // };

    // stash.remove = function(key) {
    //     delete cache[key];
    // };

    // emitter.on('set', function(key, value) {
    //     console.log(key, value);
    // });

    //return stash;
//};

module.exports = Stash;

var stash = new Stash({
    name: "Scott",
    age: 29
});
stash.on('set', (key, value) => {
    console.log(key, value);
});
stash.set('first', 1);
console.log(stash);
console.log(stash.get('first'));

//stash.clear();
//console.log(stash);