const API_URL = "http://localhost:8000"
var session_id = ''
var user_name = ''

// TODO: Create new session if session expires on the server side.
// LocalStorage is persistent unless the user clears cache.
// Good support for this, even internet explorer 8 supports it,
// so theres no need to worry ;)
if (typeof(Storage) !== "undefined") {
    if (!localStorage.getItem('session_id')) {
        session = establish_pseudo_session();
        localStorage.setItem('session_id', session.session_id);
        console.log("Setting your first session id!")
    } else {
        session_id = localStorage.getItem('session_id');
        console.log("Loading your previous session id!")
    }
} else {
    // In this case, session will disappear after browser refresh.
    // (Very rare case)
    console.log("Web storage not supported")
}

function establish_pseudo_session() {
    const Http = new XMLHttpRequest();
    const url = API_URL + "/anonymous_submissions/get_session_id";
    Http.open("get", url, false);
    Http.withCredentials = true;
    Http.send();

    if (Http.status === 200) {
        session = JSON.parse(Http.responseText);
        return session
    }

}

// This function should really be in a new file, mc_load.js
function get_json(id) {
    const Http = new XMLHttpRequest();
    const url = API_URL + "/problems/multiple_choice/" + String(id) + "/get_json"
    Http.open("get", url, false);
    Http.withCredentials = true;
    Http.send();

    if (Http.status === 200) {
        return JSON.parse(Http.responseText);
    }
    return null;
}

// Don't need this anymore, but we can keep it for now.
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function get_option_html(option) {
    s = "<label class='checkbox'>"
    s += "<input class='checkbox' type='checkbox' name='options' id='"
    s += "id_" + option.id + "'";
    s += "value='" + option.pk + "'";
    s += "> " + option.text;
    s += " </label>"
    return s;
}


function render_problem(id) {
    problem = get_json(id)


    loginstat = document.querySelector("#login-status-multiple-choice-" + id);

    // Doesn't really make sense to warn them until we figure out sync
    //loginstat.innerHTML = "<strong>Warning:</strong> You are not logged in. Would you like to login and save your progress? <br> <strong>Debug:</strong> The username is: " + problem.user;

    // add title
    title = document.querySelector("#title-multiple_choice-" + id);
    title.innerHTML = problem.name;

    // add description
    desc = document.querySelector("#description-multiple_choice-" + id);
    desc.innerHTML = problem.description;

    // add all options
    options = problem.answer_options;
    for (i = 0; i < options.length; i++){
        document.querySelector("#multiple_choice-" + id +  " #div_id_options")
            .innerHTML += get_option_html(options[i]) + "<br><br>";
    }

    // add score
    document.querySelector("#score-multiple_choice-" + id)
        .innerHTML = "0 / " + problem.max_score;
}


// Demo. Ideally, you'd want to have a list and loop over it.
render_problem(2);
render_problem(1);
