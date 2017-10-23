$('#student-form').on('submit', function(evt) {
    evt.preventDefault();

    var field = $('[name=tag]');
    var tag = field.val();
    
    $.ajax('/student/' + tag, {
        success: function(data) {
            var student = data.data;
            var template = $('#student-template').html();
            var html = Mustache.render(template, {
                firstName: student.firstName,
                lastName: student.lastName,
                tag: student.tag
            });

            $('#student-list').append(html);

            $('a[data-toggle=list]:last-child button').on('click', function() {
                alert('need to add stuff here');
            });
        },
        error: function() {
            var alert = $('#warning-alert');
            var text  = alert.find('div:first-child');
            var html  = Mustache.render($('#alert-template').html(), {
                text: 'No student found with tag ' + tag
            });
            
            text.html(html);
            alert.css('display', 'block');
        },
        complete: function() {
            field.val('');
        }
    });
});

function closeAlert() {
    $('#warning-alert').css('display', 'none');
}
