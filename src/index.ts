// 1. DEFINE TYPES
// Defines the structure for a single todo item.
interface Todo {
    text: string;
    done: boolean;
}

// 2. GET DOM ELEMENTS & INITIALIZE STATE
// This array will hold the state of our application.
let todos: Todo[] = [];

// Get references to all the HTML elements we need.
const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const addTodoBtn = document.getElementById('addTodoBtn') as HTMLButtonElement;
const todoList = document.getElementById('todoList') as HTMLUListElement;
const toast = document.getElementById('toast') as HTMLDivElement;

// 3. DEFINE FUNCTIONS

/**
 * Renders the entire list of todos to the DOM.
 * It clears the list first and then rebuilds it from the `todos` array.
 */
function renderTodos(): void {
    
    if (!todoList) return;
    
    todoList.innerHTML = ''; 

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'p-4 bg-gray-50 border rounded-lg flex items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200';
        li.textContent = todo.text;

        if (todo.done) {
            li.classList.add('done');
        }

        li.addEventListener('click', () => {
            toggleDone(index);
        });

        todoList.appendChild(li);
    });
}


function addTodo(): void {
    
    if (!todoInput) return;

    const newTodoText = todoInput.value.trim();
    if (newTodoText !== '') {
        todos.push({ text: newTodoText, done: false });
        todoInput.value = ''; 
        renderTodos();
    }
}


function toggleDone(index: number): void {
    const todo = todos[index];
   
    if (todo) {
        todo.done = !todo.done;
        if (todo.done) {
            showToast("Task marked as done!");
        }
        renderTodos();
    }
}


function showToast(message: string): void {
   
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('opacity-0');

    setTimeout(() => {
        toast.classList.add('opacity-0');
    }, 2000);
}


if (todoInput && addTodoBtn && todoList) {
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });


    renderTodos();
} else {

    console.error("Initialization failed: Could not find one or more required HTML elements.");
}
