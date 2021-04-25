let dataJSON = '';
let output = document.getElementById('output');
let taskList = document.querySelector('#taskList');
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let tempValue = document.querySelector('input[name="task"]').value;
    addNewItem({
        "info": tempValue,
        "status": false
    })
})
window.onload = function () {
    if (sessionStorage['tasklist'] != null) {
        dataJSON = JSON.parse(sessionStorage['tasklist']);
    } else {
        // let data = '[{"info":"Cut the Grass","status":false},{"info":"Clean Room","status":false},{"info":"Go to Gym","status":false},{"info":"Make Dinner","status":false}]';

        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = xhr.responseText;
                dataJSON = JSON.parse(data);
                buildCheckboxes(dataJSON);
            }
        }
        xhr.open("GET", 'https://sleepy-cliffs-19222.herokuapp.com/BRjpxjgm7.json', true);
        xhr.send();
    }
    buildCheckboxes(dataJSON)
}

function addNewItem(data) {
    addCheckboxes(data, dataJSON.length)
    dataJSON.push(data);
    sessionStorage['tasklist'] = JSON.stringify(dataJSON);
}

function addCheckboxes(data, key) {
    let li = document.createElement('li');
    let checkbox = document.createElement('input')
    let textInside = document.createTextNode(data.info);
    let span = document.createElement('span');
    span.innerHTML = 'x';
    span.onclick = remove;
    checkbox.type = 'checkbox';
    checkbox.value = key;
    checkbox.checked = data.status;
    checkbox.setAttribute('onchange', 'updateJSON()')
    li.appendChild(textInside)
    li.appendChild(checkbox);
    li.appendChild(span);
    document.querySelector('#taskList').appendChild(li);
}

function remove(event) {
    let index = this.previousElementSibling.value;
    taskList.innerHTML = '';
    dataJSON.splice(index, 1)
    buildCheckboxes(dataJSON)
}

function buildCheckboxes(data) {
    for (let key in data) {
        addCheckboxes(data[key], key)
    }

}

function updateJSON() {
    let key = event.target.value;
    dataJSON[key].status = event.target.checked;
    sessionStorage['tasklist'] = JSON.stringify(dataJSON);

}
