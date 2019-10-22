/*$(function() {
    var win;
    var checkConnect;
    var $connect = $(".connect");
    $connect.click(function() {
        win = window.open('/oauth2/auth', 'Authentication',  'height=600,width=500,left='+x+',top='+y+',modal=yes,alwaysRaised=yes');
    });

    checkConnect = setInterval(function() {
        if (!win || !win.closed) return;
        clearInterval(checkConnect);
        window.location.reload();
    }, 100);
});*/

const buttons = document.getElementsByClassName('connect');
var win;
var checkConnect;

for(var button of buttons){
    button.addEventListener('click', function(){
        var x = screen.width/2 - 500/2;
        var y = screen.height/2 - 600/2;
        win = window.open('/oauth2/auth', '_blank', 'height=600,width=500,left='+x+',top='+y+',modal=yes,alwaysRaised=yes');

        checkConnect = setInterval(function() {
            console.log(win.closed);
            if (!win || !win.closed) return;
            clearInterval(checkConnect);
            console.log(win.closed);
            console.log(window.location);           
            window.location.reload();
        }, 1000);
    });
}

/*checkConnect = setInterval(function() {
    if (!win || !win.closed) return;
    clearInterval(checkConnect);
    window.location.reload();
}, 100);
*/
