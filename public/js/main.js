var studentsStore = {
    add: function(student) {
        this.data.push(student);
        this.ids[student.tag] = student;
    },
    remove: function(tag) {
        this.ids[tag] = null;
        this.data = this.data.filter(function(student) {
            return student.tag !== tag;
        });
    },
    get: function(tag) {
        return this.ids[tag];
    },
    data: [],
    ids: {}
};

var els = {
    warningAlert: $('#warning-alert'),
    studentTemplate: $('#student-template'),
    studentList: $('#student-list'),
    tagTextField: $('[name=tag]'),
    warningTemplate: $('#warning-template')
};

var currentSelectedStudent;
var selectedListRow;

$('#student-form').on('submit', function(evt) {
    evt.preventDefault();

    var field = els.tagTextField;
    var tag = field.val();
    
    $.ajax('/student/' + tag, {
        success: function(data) {
            var student = data.data;

            if(studentsStore.get(student.tag)) {
                return;
            }

            var html = Mustache.render(els.studentTemplate.html(), {
                firstName: student.firstName,
                lastName: student.lastName,
                tag: student.tag
            });

            els.studentList.append(html);
            studentsStore.add(student);

            $('a[data-toggle=list]:last-child button').on('click', {student: student}, function(evt) {
                currentSelectedStudent = evt.data.student;
                selectedListRow = $(this).parent();
                var template = $('#student-card-template').html();
                var html = Mustache.render(template, {
                    firstName: currentSelectedStudent.firstName,
                    lastName : currentSelectedStudent.lastName,
                    tag: currentSelectedStudent.tag,
                    time: new Date().toLocaleString()
                });

                $('body').append(html);
            });
        },
        error: function() {
            showWarning('No student found with tag ' + tag);
        },
        complete: function() {
            field.val('');
        }
    });
});

function confirmPickup() {
    var removed = selectedListRow.remove();
    if(removed) {
        studentsStore.remove(currentSelectedStudent.tag);
    }

    selectedListRow = null;
    currentSelectedStudent = null;

    $('#mymodal').modal('toggle');
    $('#mymodal').remove();
}

function cancelPickup() {
    selectedListRow = null;
    currentSelectedStudent = null;

    $('#mymodal').modal('toggle');
    $('#mymodal').remove();
}

function closeWarning() {
    els.warningAlert.css('display', 'none');
}

function showWarning(info) {
    var alert = els.warningAlert;
    var text  = alert.find('div:first-child');
    var html  = Mustache.render(els.warningTemplate.html(), {text: info});
    
    text.html(html);
    alert.css('display', 'block');

    setTimeout(function() {
        els.warningAlert.css('display', 'none');
    }, 5000);
}
