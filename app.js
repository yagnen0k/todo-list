// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("DOMContentLoaded", getCompleteds);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// filterOption.addEventListener("")
// FUNCTIONS
function addTodo(event) {
  event.preventDefault();
  if (todoInput.value) {
    // prevent form submiting

    // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // trashButton
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // CLEAR TODO INPUT
    todoInput.value = "";
  } else {
    alert("bos birakma amk");
  }
}
function deleteCheck(e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", function (e) {
      todo.remove();
    });
  }
  // check mark
  else if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");

    if (todo.classList.contains("completed")) {
      saveCompleted(todo);
    } else {
      removeCompleted(todo);
    }
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK -- DO I ALREADY HAVE THING IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // trashButton
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
  });
}
function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  removeCompleted(todo);
}

function checkCompleteds() {
  let completeds;
  if (localStorage.getItem("completeds") === null) {
    completeds = [];
  } else {
    completeds = JSON.parse(localStorage.getItem("completeds"));
  }
  return completeds;
}

function getCompleteds() {
  completeds = checkCompleteds();
  completeds.forEach(function (completed) {
    let todos = todoList.childNodes;
    todos.forEach(function (todo) {
      if (todo.querySelector(".todo-item").innerText === completed) {
        todo.classList.add("completed");
      }
    });
  });
}
function saveCompleted(todo) {
  completeds = checkCompleteds();
  completeds.push(todo.querySelector(".todo-item").innerText);
  localStorage.setItem("completeds", JSON.stringify(completeds));
}
function removeCompleted(todo) {
  completeds = checkCompleteds();
  const completedIndex = completeds.indexOf(todo.children[0].innerText);
  completeds.splice(completedIndex, 1);
  localStorage.setItem("completeds", JSON.stringify(completeds));
}
