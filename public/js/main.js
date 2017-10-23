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
        },
        error: function() {
            $('#warning-alert').css('display', 'block');
        },
        complete: function() {
            field.val('');
        }
    });
});

function closeAlert() {
    $('#warning-alert').css('display', 'none');
}