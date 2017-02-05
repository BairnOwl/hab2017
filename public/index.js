/**
 * Created by bairnowl on 2/4/17.
 */


window.addEventListener('load', function(){
    $('#form').on('submit', sendMessage);
}, false);

function sendMessage(e) {
    // prevent the page from redirecting
    e.preventDefault();

    // get the parameters
    var username = $('#username');
    var password = $('#password');
    var post_string = "username=" + username + "&password=" + password;
    
    
    // send it to the server
    var req = new XMLHttpRequest();
    req.server.open(this.method, this.url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.open('POST', '/create/user', true);
    req.send(post_string);
}