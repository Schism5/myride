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

$('#student-form').on('submit', function(evt) {
    evt.preventDefault();

    var field = els.tagTextField;
    var tag = field.val();
    
    $.ajax('/student/' + tag, {
        success: function(data) {
            var student = data.data;

            if(studentsStore.ids[student.tag]) {
                return;
            }

            var template = els.studentTemplate.html();
            var html = Mustache.render(template, {
                firstName: student.firstName,
                lastName: student.lastName,
                tag: student.tag
            });

            els.studentList.append(html);

            studentsStore.add(student);

            $('a[data-toggle=list]:last-child button').on('click', {tag: student.tag}, function(evt) {
                var removed = $(this).parent().remove();
                if(removed) {
                    studentsStore.remove(evt.data.tag);
                }
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
        alert.css('display', 'none');
    }, 5000);
}
