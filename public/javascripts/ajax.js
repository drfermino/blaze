$('#tst').on('click', function(e) {
    e.preventDefault();

    $.ajax({
        url: '/users/list',
        method: 'GET'
    })
    .done(function(res) {
        let options;
        if (res.success) {
            if (res.users) {
                res.users.forEach(function(user){
                    options += `<option value=${user.id}>${user.name}</option>`;
                });
            }
            $('#selecUser')
                .empty()
                .append(options);
        } else {
            console.log('error...ajax');
        }
    });
});

$('#btn-search-meta').on('click', function(e) {
    e.preventDefault();
    var target = $(this);

    $.ajax({
        url: '/metadata/describe/' + $("#selectMetadata").val(),
        method: 'GET'
    })
    .done(function(res) {
        console.log(res);
        console.log(res.success);        
        if (res.success) {
            if (res.html) {
                $('#jsonCode').html(res.html);
            }
        } else {
            console.log('error...ajax');
        }

        target.resetButton();

/*        $('#btn-search-meta').html($('#btn-search-meta').attr('data-html'));
        $('#btn-search-meta').prop('disabled', false);
        $('#btn-search-meta').removeAttr('data-html');*/
    });

    // redirect
   // window.location.href = "/metadata/describe/" + $("#selectMetadata").val();
});

(function( $ ){
    $.fn.resetButton = function() {
        this.hide().html(this.attr('data-html')).fadeIn(1500);
        this.prop('disabled', false);
        this.removeAttr('data-html');
        return this;
    }; 
 })( jQuery );