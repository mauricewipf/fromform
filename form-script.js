$(function() {
    $('#contact-form').submit(function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        console.log($(this).serialize());
        $.ajax({
            url: '/email',
            data: $(this).serialize(),
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                // console.log(data);
            }
        });
    });
});
