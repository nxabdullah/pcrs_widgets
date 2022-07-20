const API_URL = "http://localhost:8000" // End with a Fwd Slash

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

function get_option_html(option) {
    s = "<label class='checkbox'>"
    s += "<input class='checkbox' type='checkbox' name='options' id='"
    s += "id_" + option.id + "'";
    s += "'value='" + option.pk + "'";
    s += "> " + option.text;
    s += " </label>"
    return s;
}

function render_problem(id) {
    problem = get_json(id)

    // add title
    title = document.querySelector("#title-multiple_choice-" + id);
    title.innerHTML = problem.name;

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





// Dom
render_problem(2);
render_problem(1)