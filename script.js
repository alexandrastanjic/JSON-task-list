
  let data = '{"tasks":{"Cut Grass":true,"Clean Room":false,"Go to Gym":true,"Make Dinner":false}}';

  let dataJSON = JSON.parse(data);

  let output = document.getElementById('output');
  let taskList = document.querySelector('#taskList');

  for (let key in dataJSON.tasks) {
    console.log(key, dataJSON.tasks[key])
    let status =  !dataJSON.tasks[key] ? '' : 'checked'
    let html = '<li>'+ key + '<input type = "checkbox" value = "'+key+'" '+ status +'>  </li>';
    taskList.innerHTML += html;
    
  }

  addEvents();

  function addEvents(){
    let checkBoxes = document.querySelectorAll('#taskList input[type = "checkbox"]');
   for(let index in checkBoxes) {
     checkBoxes[index].onchange = updateJSON;
   }
   console.log(checkBoxes);
  }

  function updateJSON() {
    let key = event.target.value;
    console.log(key, event.target.checked)
    dataJSON.tasks[key] = event.target.checked
  }

  console.log(dataJSON) 