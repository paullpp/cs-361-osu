// global varialbe declarations
var logged_in = 0;
var user = '';
var content_view;
var liftersURL = 'http://localhost:8000/api/v1/meetdata'
var postURL = 'http://localhost:8000/api/v1/addlifter'
var microURL = 'http://localhost:3000/meet/statistics'


// global document variable declarations
var login_button = document.getElementById("login");
var login_window = document.getElementById("login-window");
var entry_button = document.getElementById("add_entry_button");
var entry_window = document.getElementById("entry-window");
var close_login = document.getElementById("window-login");
var close_x = document.getElementById("window-close");
var username = document.getElementById("username-input");
var password = document.getElementById("password-input");
var content = document.getElementById("content");
var default_view = document.getElementById("default_view");
//var content_view = document.getElementById("content_view");
var content_parent = document.getElementById("content");
var login_list = document.getElementsByClassName("login-button");
var lifter_name = document.getElementById("name-input");
var weightclass = document.getElementById("weightclass-input");
var bench_1 = document.getElementById("bench-1-input");
var bench_2 = document.getElementById("bench-2-input");
var bench_3 = document.getElementById("bench-3-input");
var squat_1 = document.getElementById("squat-1-input");
var squat_2 = document.getElementById("squat-2-input");
var squat_3 = document.getElementById("squat-3-input");
var deadlift_1 = document.getElementById("deadlift-1-input");
var deadlift_2 = document.getElementById("deadlift-2-input");
var deadlift_3 = document.getElementById("deadlift-3-input");
var total = document.getElementById("total-input");
var close_entry = document.getElementById("window-add");
var stats = document.getElementById("stats");
var close_x_entry = document.getElementById("entry-window-close");
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
    var new_content = document.createElement('table');
    var header_list = ['name', 'weightclass', 'bench_1', 'bench_2', 'bench_3', 'squat_1', 'squat_2', 'squat_3', 'deadlift_1', 'deadlift_2', 'deadlift_3', 'total']
    content_parent.appendChild(new_content);
    new_content.setAttribute('id', 'meettable');
    var new_row = document.createElement('tr');
    new_content.appendChild(new_row);
    new_row.setAttribute('id', 'header_row');
    for (var i = 0; i < header_list.length; i++) {
        var new_headers = document.createElement('th');
        new_row.appendChild(new_headers);
        new_headers.setAttribute('class', 'table_headers');
        new_headers.textContent = header_list[i];
    }
    content_view = document.getElementById("content_view");
    content_parent.style.display = 'block';

    fill_table();
}

function delete_table() {
    var meettable = document.getElementById('meettable');
    for (var i = 0; i < meettable.children; i++) {
        meettable.children[i].remove();
    }
    meettable.remove();
};

function add_entry(data) {
    var meettable = document.getElementById('meettable');
    var new_entry = document.createElement('tr');
    meettable.appendChild(new_entry);

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['name'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['weightclass'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['bench_1'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['bench_2'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['bench_3'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['squat_1'];
    
    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['squat_2'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['squat_3'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['deadlift_1'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['deadlift_2'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['deadlift_3'];

    var new_cell = document.createElement('td');
    new_entry.appendChild(new_cell);
    new_cell.textContent = data['total'];
}

function fill_table() {
    //GET request to meetdata endpoint
    fetch(liftersURL)
    .then(response => response.json())
    .then(data => {
        for (var i = 0; i < data.length; i++) {
            add_entry(data[i]);
        };
    });
    get_stats();
    console.log("fill table called");
}

function jsonify(data) {
    jsonret = {};
    jsonret["name"] = data[0];
    jsonret["weightclass"] = data[1];
    jsonret["bench_1"] = data[2];
    jsonret["bench_2"] = data[3];
    jsonret["bench_3"] = data[4];
    jsonret["squat_1"] = data[5];
    jsonret["squat_2"] = data[6];
    jsonret["squat_3"] = data[7];
    jsonret["deadlift_1"] = data[8];
    jsonret["deadlift_2"] = data[9];
    jsonret["deadlift_3"] = data[10];
    jsonret["total"] = data[11];

    return jsonret
}

async function add_lifter(data) {
    //POST request to add_lifter endpoint
    await fetch(postURL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonify(data))
    });
    delete_table();
    add_content();
    console.log("add_lifter called with this: ", JSON.stringify(jsonify(data)));
}

function get_stats() {
    fetch(microURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        stats.textContent = "Name:  " + data[0].name + "  Bench AVG:  " + data[0].benchAvg + "  Squat AVG:  " + data[0].squatAvg + "  DL AVG:  " + data[0].deadliftAvg;
    });
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

function hide_entry_window() {
    entry_window.style.display = 'none';
    document.body.style.backgroundColor = 'white';
    // clear window input fields
    lifter_name.value = '';
    weightclass.value = '';
    bench_1.value = '';
    bench_2.value = '';
    bench_3.value = '';
    squat_1.value = '';
    squat_2.value = '';
    squat_3.value = '';
    deadlift_1.value = '';
    deadlift_2.value = '';
    deadlift_3.value = '';
    total.value = '';
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
    login_button.value = "Log In";
    content.style.display = 'none'
    //remove_content();
    delete_table();
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
    logged_in = 0;
    console.log("Log In Window - 'X' button pressed");
})

username.addEventListener('change', function () {
    user = event.currentTarget.value;
})

entry_button.addEventListener('click', function() {
    entry_window.style.display = 'block';
    document.body.style.backgroundColor = 'gray';
})

close_entry.addEventListener('click', function() {
    var lifter_data = [lifter_name.value, weightclass.value, bench_1.value, bench_2.value, bench_3.value, squat_1.value, squat_2.value, squat_3.value, deadlift_1.value, deadlift_2.value, deadlift_3.value, total.value];
    add_lifter(lifter_data);
    hide_entry_window();
    console.log("Entry Window - 'Add' button pressed");
})

close_x_entry.addEventListener('click', function() {
    hide_entry_window();
    console.log("Entry Window - 'X' button pressed");
})