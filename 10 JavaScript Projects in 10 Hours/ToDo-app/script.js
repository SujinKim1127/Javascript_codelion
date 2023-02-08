const input = document.getElementById('input');
const form = document.getElementById('form');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos){
    todos.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo();

})

function addTodo(todo) {
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
        const todoText = input.value;
    }
    if(todoText){
        const todoEl = document.createElement('li');
        if(todo && todo.completed){
            todosEl.classList.add('completed');
        }
        todoEl.innerText = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');

            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) =>{
            e.preventDefault();

            todoEl.remove();

            updateLS();
        })
        
        todosUL.appendChild(todoEl); 

        input.value="";

        updateLS();
    }

}

// update Local Stroage
function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todos.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    });

    localStorage.setItem("todos", JSON.stringify(todos))
}