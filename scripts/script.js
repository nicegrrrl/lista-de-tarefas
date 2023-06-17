import { tasksList } from "./database.js";

const createTask = () => {
  const inputTask = document.querySelector(".input__task");
  const submitButton = document.querySelector(".submit__button");

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let task = {
      name: inputTask.value,
    };

    if (inputTask.value !== "") {
      tasksList.push(task);
    } else {
      alert("Escreva uma tarefa para então adicioná-la à lista.");
    }

    inputTask.value = "";

    renderTaskCard(tasksList);
  });
};

const renderTaskCard = (array) => {
  const taskList = document.querySelector(".task__list");

  taskList.innerHTML = "";

  array.forEach((item) => {
    const task = createTaskCard(item);
    taskList.append(task);
  });

  removeTask(array);
  return taskList;
};

const createTaskCard = (task) => {
  const taskListItem = document.createElement("li");
  const taskText = document.createElement("span");
  const deleteButton = document.createElement("button");

  taskText.classList.add("task__name");
  deleteButton.classList.add("delete__button");

  taskText.innerText = task.name;
  deleteButton.innerText = "Apagar";

  taskListItem.append(taskText, deleteButton);

  return taskListItem;
};

const removeTask = (array) => {
  const deleteButtons = document.querySelectorAll(".delete__button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const respectiveTaskName = event.target.previousSibling.innerText;
      const index = array.findIndex((item) => item.name === respectiveTaskName);
      console.log(index);
      array.splice(index, 1);
      renderTaskCard(array);
    });
  });
};

createTask();
