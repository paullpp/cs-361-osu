// global varialbe declarations
var logged_in = 0;
var user = '';
var content_view;


// global document variable declarations
var login_button = document.getElementById("login");
var login_window = document.getElementById("login-window");
var close_login = document.getElementById("window-login");
var close_x = document.getElementById("window-close");
var username = document.getElementById("username-input");
var password = document.getElementById("password-input");
var content = document.getElementById("content");
var default_view = document.getElementById("default_view");
//var content_view = document.getElementById("content_view");
var content_parent = document.getElementById("content");
var login_list = document.getElementsByClassName("login-button");

// functions 

function change_to_logout() {
    login_button.remove();
    var logout = document.createElement('button');
    login_list[0].appendChild(logout);
    logout.textContent = 'Log Out';
    logout.setAttribute('id', 'login');
    logout.setAttribute('type', 'button');

    login_button = document.getElementById("login");
}

function change_to_login() {
    login_button.remove();
    var login = document.createElement('button');
    login_list[0].appendChild(login);
    login.textContent = 'Log In';
    login.setAttribute('id', 'login');
    login.setAttribute('type', 'button');

    login_button = document.getElementById("login");
}

function add_content() {
    var new_content = document.createElement('div');
    content_parent.appendChild(new_content);
    new_content.setAttribute('id', 'content_view');
    //new_content.classList.add('hidden');
    new_content.textContent = `${user}, content will come soon!`;
    content_view = document.getElementById("content_view");
    content_parent.style.display = 'block';
}

function remove_content() {
    content_parent.style.display = 'none';
    content_view.remove();

    user = '';
}

function hide_window() {
    login_window.style.display = 'none';
    document.body.style.backgroundColor = 'white';
    // clear window input fields
    username.value = '';
    password.value = '';
}

function login_true() {
    logged_in = 1;
    console.log("User ", user, " logged in");
    default_view.style.display = 'none';
    login_button.value = "Log Out";

    add_content();
    change_to_logout();
}

function login_false() {
    logged_in = 0;
    console.log("User ", user, " logged out");
    default_view.style.display = 'block';

    remove_content();
    change_to_login();
}

// event listeners

window.addEventListener('load', function() {
    default_view.style.display = 'block';
})

login_list[0].addEventListener('click', function() {
    if (logged_in == 1) {
        login_false();
    }
    else {
        login_window.style.display = 'block';
        document.body.style.backgroundColor = 'gray';
    }
})

close_login.addEventListener('click', function() {
    hide_window();
    console.log("Log In Window - 'Log In' button pressed");
    login_true();
})

close_x.addEventListener('click', function() {
    hide_window();
    console.log("Log In Window - 'X' button pressed");
})

username.addEventListener('change', function () {
    user = event.currentTarget.value;
})