$(document).ready(function() {
    if(!isAuthenticated()) {
        window.location.href = "/403.html";
    }
})