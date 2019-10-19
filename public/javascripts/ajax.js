$(document).ready(function(){
    $('#tst').on('click', function(e) {
        e.preventDefault();

        $.ajax({
            url: '/profiles/list/users',
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

                    $('#inputUser')
                        .empty()
                        .append(options);
                } else {
                    console.log('error...ajax');
                }
            });
    });
}); 