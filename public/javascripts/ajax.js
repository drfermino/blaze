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