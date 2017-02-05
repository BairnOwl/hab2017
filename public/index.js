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
    var username = $('#username').val();
    var password = $('#password').val();
    var post_string = "username=" + username + "&password=" + password;
    
    console.log(post_string);
    // send it to the server
    var req = new XMLHttpRequest();
    console.log(req);

    req.open('POST', '/create/user', true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.onreadystatechange = function(e) {
        if (req.readyState == 4 && req.status == 200){
            response = JSON.parse(req.responseText);
            
        }
    };

    req.send(post_string);
}