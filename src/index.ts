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
    // Guard clause: If the list element doesn't exist, stop.
    if (!todoList) return;
    
    todoList.innerHTML = ''; // Clear the list to prevent duplicates

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

/**
 * Adds a new todo item to the `todos` array based on the input field's value.
 */
function addTodo(): void {
    // Guard clause: If the input element doesn't exist, stop.
    if (!todoInput) return;

    const newTodoText = todoInput.value.trim();
    if (newTodoText !== '') {
        todos.push({ text: newTodoText, done: false });
        todoInput.value = ''; // Clear the input field
        renderTodos();
    }
}

/**
 * Toggles the 'done' status of a todo item at a specific index.
 * @param index The array index of the todo to modify.
 */
function toggleDone(index: number): void {
    const todo = todos[index];
    // Guard clause: If the todo at the index doesn't exist, stop.
    if (todo) {
        todo.done = !todo.done;
        if (todo.done) {
            showToast("Task marked as done!");
        }
        renderTodos();
    }
}

/**
 * Displays a toast notification for a short period.
 * @param message The text to display in the toast.
 */
function showToast(message: string): void {
    // Guard clause: If the toast element doesn't exist, stop.
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('opacity-0');

    setTimeout(() => {
        toast.classList.add('opacity-0');
    }, 2000);
}

// 4. ATTACH EVENT LISTENERS AND RUN
// This is the main entry point. We check if all essential elements were found.
// If they were, we attach the event listeners and perform the initial render.
if (todoInput && addTodoBtn && todoList) {
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    // Perform the first render to show the initial (empty) state.
    renderTodos();
} else {
    // If an element is missing, log an error to the console for debugging.
    console.error("Initialization failed: Could not find one or more required HTML elements.");
}
