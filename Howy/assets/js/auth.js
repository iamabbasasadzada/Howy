function isAuthenticated() {
    return (localStorage.getItem("IsAdmin") == "True") || false;
}


