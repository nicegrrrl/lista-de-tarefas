import { tasksList } from "./database.js";

const checkIfTheresAnyTask = (array) => {
  const message = document.querySelector(".noTasks");
  const messageContent = document.querySelector(".noTasks > p");
  if (array.length === 0) {
    messageContent.innerText = "☹️ Sem tarefas registradas...";

    message.classList.remove("hide");
  } else {
    messageContent.innerText = "😄 Suas tarefas";
  }
};

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
      const newArray = [...tasksList];
      localStorage.setItem("toDoList", JSON.stringify(newArray));
    } else {
      alert("Escreva uma tarefa para então adicioná-la à lista. 😊");
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

  checkIfTheresAnyTask(array);
  removeTask(array);
  return taskList;
};

const createTaskCard = (task) => {
  const taskListItem = document.createElement("li");
  const taskText = document.createElement("span");
  const deleteButton = document.createElement("button");

  taskListItem.classList.add("task__list-item");
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
      const newArray = [...array];
      localStorage.setItem("toDoList", JSON.stringify(newArray));
      renderTaskCard(array);
    });
  });
};

const analyseLocalStorageData = () => {
  const localStorageData = JSON.parse(localStorage.getItem("toDoList"));

  if (localStorageData) {
    renderTaskCard(localStorageData);
  }
};

createTask();
checkIfTheresAnyTask(tasksList);
analyseLocalStorageData();
