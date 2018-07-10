$(document).ready(function() {

    window.writeToDatabase = function(output) {
        $.ajax({
            url: 'cards/playtest',
            type: 'POST',
            data: 'combinedOutput=' + output,
            headers: {
              'X-Transaction': 'POST Example',
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                console.log('success');
            },
            error: function(e) {
                console.log(e)
            }
        });
    }

});
