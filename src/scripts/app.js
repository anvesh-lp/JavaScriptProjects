const form = document.querySelector('#tasl-form');
const task = document.querySelector('#task');
const tasklist = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearbutton = document.querySelector('.clear-tasks');


loadEventListeners();


function loadEventListeners() {
//    on clicking add task
    form.addEventListener(`submit`, addnewTask);
//    Delete task
    tasklist.addEventListener('click', deleteTask);
//    clear all tasks
    clearbutton.addEventListener('click', clearTasks);
//    filter results
    filter.addEventListener('keyup', filteResult);

}

// Delete a task
function deleteTask(event) {
    console.log(event.target);
    if (event.target.parentElement.classList.contains("delete-item")) {
        if (confirm("are you sure?"))
            event.target.parentElement.parentElement.remove();
    }
}

//filter results
function filteResult(event) {

    const search = filter.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function find(x) {
        if (x.firstChild.textContent.toLowerCase().includes(search)) {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    })
    console.log(search);
}

//Clear tasks
function clearTasks(e) {
    console.log(e.target);
    //one way
    // tasklist.innerHTML='';
//    faster way
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
}


function addnewTask(event) {
    event.preventDefault();
    if (task.value === '') {
        alert(" add a task ");
    } else {
        // create element
        const listelement = document.createElement('li');
        // add class
        listelement.classList.add('collection-item');
        //Appending node to child
        listelement.appendChild(document.createTextNode(task.value));
        const anchor = document.createElement('a');
        anchor.className = 'delete-item secondary-content';
        anchor.innerHTML = '<i class="fas fa-trash-alt"></i>';
        listelement.appendChild(anchor);
        tasklist.appendChild(listelement);
        task.value = '';
    }
}