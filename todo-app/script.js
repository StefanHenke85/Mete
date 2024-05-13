let list = document.getElementById("list");
let todos = []; // Array zum Speichern der Todos

// Funktion zum Erzeugen eines Listenelements mit der Aufgabe, Checkbox und Löschen-Button
function addTask(task, completed, id) {
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  let span = document.createElement("span");
  span.textContent = task;
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);

  list.appendChild(li);

  // Speichere die Todo im Array
  todos.push({ id: id, task: task, completed: completed, element: li });

  // Füge einen Event-Listener hinzu, um den Zustand der Checkbox zu aktualisieren
  checkbox.addEventListener("change", function () {
    updateTodoStatus(id, checkbox.checked);
  });

  // Füge einen Event-Listener hinzu, um die Todo zu löschen
  deleteButton.addEventListener("click", function () {
    deleteTodo(id);
  });
}

function getTodos() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((array) =>
      array.forEach((taskObject) => {
        addTask(taskObject.title, taskObject.completed, taskObject.id);
      })
    );
}

function updateTodoStatus(id, completed) {
  // Suche die entsprechende Todo im Array
  let todo = todos.find((todo) => todo.id === id);
  // Aktualisiere den Zustand
  todo.completed = completed;
  // Hier kannst du den aktualisierten Zustand an deine Backend-API senden, um ihn zu speichern
  console.log("Todo aktualisiert:", todo);
}

function deleteTodo(id) {
  // Suche die entsprechende Todo im Array
  let todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    // Entferne die Todo aus dem Array
    todos.splice(todoIndex, 1);
    // Entferne das Listenelement aus dem DOM
    list.removeChild(todos[todoIndex].element);
    // Hier kannst du den Löschvorgang an deine Backend-API senden, um die Todo dauerhaft zu löschen
    console.log("Todo gelöscht:", id);
  }
}

getTodos();
