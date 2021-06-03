const form = document.querySelector('#tasl-form');
const task = document.querySelector('#task');
const tasklist = document.querySelector('.collection');
const filter = document.querySelector('#filter');


loadEventListeners();


function loadEventListeners() {
//    on clicking add task
    form.addEventListener(`submit`, addnewTask);

}

function addnewTask(event) {
    event.preventDefault();
    if (task.value === '') {
        alert(" add a task ");
    }else {
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