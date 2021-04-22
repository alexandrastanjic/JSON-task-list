let data =
	'[{"info":"CutGrass","status":false},{"info":"CleanRoom","status":false},{"info":"Gotogym","status":false},{"info":"MakeDinner","status":false}]';

let dataJSON = JSON.parse(data);

let output = document.getElementById('output');
let taskList = document.querySelector('#taskList');
for (let key in dataJSON) {
	console.log(key, dataJSON[key]);
	let status = dataJSON[key].status ? 'checked' : '';
	let html = '<li>' + dataJSON[key].info + '<input type = "checkbox" value = "' + key + '" ' + status + '>  </li>';
	taskList.innerHTML += html;
}

addEvents();

function addEvents() {
	let checkBoxes = document.querySelectorAll('#taskList input[type = "checkbox"]');
	for (let index in checkBoxes) {
		checkBoxes[index].onchange = updateJSON;
	}
	console.log(checkBoxes);
}

function updateJSON() {
	let key = event.target.value;
	console.log(key, event.target.checked);
	dataJSON[key].status = event.target.checked;
}
