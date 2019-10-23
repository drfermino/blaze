const jsonViewer = new JSONViewer();
document.querySelector("#json").appendChild(jsonViewer.getContainer());
jsonViewer.showJSON({json: "example"}, null, 0);

$('#btn-list-users').on('click', function(e) {
    e.preventDefault();
    var target = $(this);
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
        target.resetButton();
    });
});

$('#btn-search-meta').on('click', function(e) {
    var jsonObj = {};
    
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
                //$('#jsonCode').html(res.html);
                jsonObj = JSON.parse(res.html);
                jsonViewer.showJSON(jsonObj, null, 0);
                $('#browser').jsonbrowser(res.html);
            }
        } else {
            console.log('error...ajax');
        }
        target.resetButton();
    });
});

(function( $ ){
    $.fn.resetButton = function() {
        this.animate({width: this.attr('data-width')}, 300).html(this.attr('data-html'));
        this.prop('disabled', false);
        this.removeAttr('data-html');
        this.removeAttr('data-width');
        return this;
    }; 
 })( jQuery );