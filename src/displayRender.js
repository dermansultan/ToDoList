import projectList from "./projectsList";
import {
  getCurrentProject,
  changeCurrentProject,
  currentProject,
  updateLocalStorage,
} from "./index";
import {
  modalOpen,
  modalContentTask,
  modalContentEditTask,
  createNewProject,
  modalContentEditProj,
  modalContentDelProj,
} from "./modal";
import taskItem from "./toDoTaskItem";
import { format, compareAsc, parseISO } from "date-fns";
const displayRender = (() => {
  // create the project container based off of what the project object is...

  function parseTaskDate(dateString) {
    const date = dateString;
    const splitDate = date.split(" ");
    const removedSuffix = splitDate[1].substring(0, 2);
    const newDate = `${splitDate[0]} ${removedSuffix} ${splitDate[2]}`;
    console.log("newDate:", newDate);
    return new Date(Date.parse(newDate));
  }

  function projectSideClose() {
    projectModalContainer.style.width = "0";
    projectModalContent.style.opacity = "0";
    projectModalContent.style.pointerEvents = "none";
    projectModalCloseBtn.style.marginLeft = "0";
  }

  function TaskItemcompleteToggle(obj) {
    obj.completed = !obj.completed;
  }

  function filterObjArray(obj, filterType) {
    let newObjArr;
    let newTaskList = {};
    switch (filterType) {
      case "Priority":
      case "priority":
        newObjArr = Object.keys(obj.tasksList).sort(function (a, b) {
          if (obj.tasksList[a].priorityVal < obj.tasksList[b].priorityVal) {
            console.log("a was smaller");
            return -1;
          }
          if (obj.tasksList[a].priorityVal > obj.tasksList[b].priorityVal) {
            console.log("a was bigger");
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        newTaskList = {};
        for (const task of newObjArr) {
          console.log(task);
          newTaskList[task] = obj.tasksList[task];
        }
        obj.tasksList = newTaskList;
        break;
      case "dueDate":
        newObjArr = Object.keys(obj.tasksList).sort(function (a, b) {
          return compareAsc(
            parseTaskDate(obj.tasksList[a].dueDate),
            parseTaskDate(obj.tasksList[b].dueDate)
          );
        });
        newTaskList = {};
        for (const task of newObjArr) {
          console.log(task);
          newTaskList[task] = obj.tasksList[task];
        }
        obj.tasksList = newTaskList;
        break;
      case "dateCreated":
        newObjArr = Object.keys(obj.tasksList).sort(function (a, b) {
          if (obj.tasksList[a].id < obj.tasksList[b].id) {
            console.log("a was smaller");
            return -1;
          }
          if (obj.tasksList[a].id > obj.tasksList[b].id) {
            console.log("a was bigger");
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        newTaskList = {};
        for (const task of newObjArr) {
          console.log(task);
          newTaskList[task] = obj.tasksList[task];
        }
        obj.tasksList = newTaskList;
    }
  }

  function getTasksCount(obj) {
    let completedTaskCount = 0;
    let currentTaskCount = 0;
    Object.keys(obj).forEach(function (taskItem) {
      console.log(taskItem);
      if (obj[`${taskItem}`].completed == true) {
        completedTaskCount++;
        console.log(`${taskItem} is completed`);
      } else if (obj[`${taskItem}`].completed == false) {
        currentTaskCount++;
        console.log(`${taskItem} is not completed`);
      }
      console.log(completedTaskCount, currentTaskCount);
    });
    console.log(`Completed Tasks Count: ${completedTaskCount}`);
    console.log(`Current Tasks Count: ${currentTaskCount}`);

    switch (true) {
      case completedTaskCount > 0:
        completedDivWrapper.style.display = "flex";
        break;

      case completedTaskCount == 0:
        completedDivWrapper.style.display = "none";
        break;
    }

    switch (true) {
      case currentTaskCount > 0:
        currentDivWrapper.style.display = "flex";
        break;

      case currentTaskCount == 0:
        currentDivWrapper.style.display = "none";
        break;
    }

    switch (true) {
      case currentTaskCount + completedTaskCount === 0:
        emptyTaskListWrapper.style.display = "flex";
        filterContainer.style.display = "none";
        break;

      case currentTaskCount + completedTaskCount >= 1:
        emptyTaskListWrapper.style.display = "none";
        filterContainer.style.display = "flex";
        break;
    }
  }

  // Pre rendered HTML elements
  // Hamburger Nav
  let projectDetailsWrapper = document.getElementById("projectDetailsWrapper");
  projectDetailsWrapper.className = "projectDetailsWrapper";
  let hamIconWrapper = document.createElement("button");
  hamIconWrapper.className = "hamIconWrapper";
  let hamIcon = document.createElement("i");
  hamIcon.className = "fas fa-bars";
  hamIcon.id = "burger";
  hamIconWrapper.appendChild(hamIcon);
  // effects on modal
  hamIconWrapper.addEventListener("click", () => {
    projectModalContainer.style.width = "65vw";
    projectModalContent.style.opacity = "1";
    projectModalCloseBtn.style.marginLeft = "65vw";
    projectModalContent.style.pointerEvents = "auto";
  });
  // Project Title Nav
  let projectTitle = document.createElement("h1");
  projectTitle.className = "projectTitle";
  setTimeout(() => {
    if (getCurrentProject() == undefined) {
      projectTitle.innerText = "";
    } else {
      projectTitle.innerText = `${getCurrentProject().projTitle}`;
    }
  }, 100);
  let projectTitleWrapper = document.createElement("div");
  projectTitleWrapper.className = "projectTitleWrapper";
  projectTitleWrapper.appendChild(projectTitle);
  projectDetailsWrapper.appendChild(projectTitleWrapper);
  projectTitleWrapper.addEventListener("click", () => {
    console.log("click");
    modalOpen();
    modalContentEditProj(modalContent);
  });
  let emptyDiv = document.createElement("div");
  emptyDiv.className = "empty";
  projectDetailsWrapper.appendChild(hamIconWrapper);

  // Project Containers
  const projectContainer = document.getElementById("projectContainer");
  const modalsContainer = document.getElementById("modalsContainer");
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modalOverlay";
  const modalContent = document.createElement("div");
  modalContent.className = "modalContent";

  // Project tab Modal
  const projectModalContainer = document.createElement("div");
  projectModalContainer.className = "projectModalContainer";

  const projectModalContent = document.createElement("div");
  projectModalContent.className = "projectModalContent";

  const projectModalCloseBtn = document.createElement("button");
  projectModalCloseBtn.className = "projectModalCloseBtn";
  const projectModalCloseBtnIcon = document.createElement("i");
  projectModalCloseBtnIcon.className = "fas fa-times-circle";
  projectModalCloseBtn.addEventListener("click", () => {
    projectSideClose();
  });
  projectModalCloseBtn.appendChild(projectModalCloseBtnIcon);

  const projectAddBtnWrapper = document.createElement("div");
  projectAddBtnWrapper.className = "projectAddBtnWrapper";
  const projectAddBtnIcon = document.createElement("i");
  projectAddBtnIcon.className = "fas fa-folder-plus";
  projectAddBtnWrapper.addEventListener("click", () => {
    projectSideClose();
    modalOpen();
    createNewProject(modalContent);
  });

  projectAddBtnWrapper.appendChild(projectAddBtnIcon);
  projectModalContent.appendChild(projectModalCloseBtn);
  projectModalContent.appendChild(projectAddBtnWrapper);

  const projectModalContentList = document.createElement("ol");
  projectModalContentList.className = "projectModalContentList";
  projectModalContent.appendChild(projectModalContentList);

  //Appends to containers
  projectModalContainer.appendChild(projectModalContent);
  modalsContainer.appendChild(projectModalContainer);

  // Message For when there are no Projects:
  let emptyProjWrapper = document.createElement("div");
  emptyProjWrapper.className = "emptyProjWrapper";
  let emptyProjTitle = document.createElement("h2");
  let emptyProjDesc = document.createElement("p");
  emptyProjTitle.className = "emptyProjTitle";
  emptyProjDesc.className = "emptyProjDesc";
  emptyProjTitle.innerText = "There are no Projects!";
  emptyProjDesc.innerText =
    "Click the hamburger icon > then the folder button to begin creating a new project.";
  emptyProjWrapper.appendChild(emptyProjTitle);
  emptyProjWrapper.appendChild(emptyProjDesc);
  projectContainer.appendChild(emptyProjWrapper);
  emptyProjWrapper.style.display = "none";

  // Message for when there are no tasks in a project
  let emptyTaskListWrapper = document.createElement("div");
  emptyTaskListWrapper.className = "emptyTaskListWrapper";
  let emptyTaskListTitle = document.createElement("h2");
  emptyTaskListTitle.innerText = "There are no tasks!";
  emptyTaskListTitle.className = "emptyTaskListTitle";
  let emptyTaskListDesc = document.createElement("p");
  emptyTaskListDesc.innerText = "Click the add button to create a task.";
  emptyTaskListDesc.className = "emptyTaskListDesc";
  emptyTaskListWrapper.appendChild(emptyTaskListTitle);
  emptyTaskListWrapper.appendChild(emptyTaskListDesc);
  projectContainer.appendChild(emptyTaskListWrapper);
  emptyTaskListWrapper.style.display = "none";

  function renderProjListItem(obj) {
    let projItemWrapper = document.createElement("li");
    projItemWrapper.dataset.projwrapperid = `${obj.projId}`;
    projItemWrapper.className = "projItemWrapper";

    // let projectItemIcon = document.createElement("i");
    // projectItemIcon.className = "fas fa-folder";
    // projItemWrapper.appendChild(projectItemIcon);

    let projItemTitle = document.createElement("h2");
    projItemTitle.innerText = `${obj.projTitle}`;
    projItemTitle.className = "projItemTitle";
    projItemWrapper.appendChild(projItemTitle);
    projItemTitle.addEventListener("click", () => {
      console.log("clickAZ");
      projectSideClose();
      let foundProj = Object.keys(projectList.projectListObject).find(
        (key) =>
          projectList.projectListObject[key]["projId"] ==
          `${projItemWrapper.dataset.projwrapperid}`
      );
      console.log(foundProj);
      changeCurrentProject(projectList.projectListObject[`${foundProj}`]);
      console.log(currentProject);
      renderProj(currentProject);
    });

    // Delete and Edit Icon
    let projectItemEditIcon = document.createElement("i");
    let projectItemEditBtn = document.createElement("button");
    projectItemEditBtn.className = "projectItemEditBtn";
    let projectItemDelBtn = document.createElement("button");
    let projectItemDelIcon = document.createElement("i");
    projectItemDelBtn.className = "projectItemDelBtn";
    projectItemEditIcon.className = "far fa-edit projWrapEditIcon";
    projectItemDelIcon.className = "far fa-trash-alt projWrapDelIcon";

    projectItemEditBtn.appendChild(projectItemEditIcon);
    projectItemDelBtn.appendChild(projectItemDelIcon);

    projItemWrapper.appendChild(projectItemEditBtn);
    projItemWrapper.appendChild(projectItemDelBtn);

    projectItemEditBtn.addEventListener("click", () => {
      modalOpen();
      projectSideClose();
      modalContentEditProj(modalContent);
    });

    projectItemDelBtn.addEventListener("click", () => {
      // Setup a Are you sure you would like to delete the project? Modal
      modalOpen();
      projectSideClose();
      modalContentDelProj(
        modalContent,
        Object.keys(projectList.projectListObject).find(
          (key) =>
            projectList.projectListObject[key]["projId"] ==
            `${projItemWrapper.dataset.projwrapperid}`
        )
      );
      console.log("clicked");
    });

    return projItemWrapper;
  }

  function renderProjList(obj) {
    let projListObj = obj.projectListObject;
    console.log(projListObj);
    Object.keys(projListObj).forEach((element) => {
      let projItem = renderProjListItem(projListObj[element]);
      projectModalContentList.appendChild(projItem);
    });
  }

  // click out modal reset modal content
  window.addEventListener("click", function (event) {
    if (event.target == modalOverlay) {
      modalOverlay.style.visibility = "hidden";
      modalContent.textContent = "";
    }
  });

  modalOverlay.appendChild(modalContent);
  modalsContainer.appendChild(modalOverlay);

  const completedDiv = document.createElement("div");
  completedDiv.className = "completedDiv";

  const currentDiv = document.createElement("div");
  currentDiv.className = "currentDiv";

  const addItemBtnWrapper = document.createElement("button");
  addItemBtnWrapper.className = "addItemBtnWrapper";
  const addItemBtn = document.createElement("i");
  addItemBtn.className = "fas fa-plus-circle";
  addItemBtnWrapper.appendChild(addItemBtn);

  function pushTask(taskItem, completedStatus) {
    if (completedStatus) {
      taskItem.querySelector(".taskCompleteBtn").checked = true;
      completedDiv.appendChild(taskItem);
    } else {
      currentDiv.appendChild(taskItem);
    }
  }

  // Make filter options
  // watch for change on select options then run the filter.
  let filterContainer = document.createElement("div");
  let filterTitle = document.createElement("h3");
  filterTitle.className = "filterTitle";
  filterTitle.innerText = "Sort By:";

  filterContainer.className = "filterContainer";
  let filterSelect = document.createElement("select");
  filterSelect.className = "filterSelect";
  let optionFilters = document.createElement("option");
  optionFilters.innerText = "Filters";
  optionFilters.selected = true;
  optionFilters.value = "";
  optionFilters.disabled = "disabled";
  let optionPriority = document.createElement("option");
  optionPriority.value = "priority";
  optionPriority.innerText = "Priority";
  let optionDueDate = document.createElement("option");
  optionDueDate.value = "dueDate";
  optionDueDate.innerText = "Due Date";
  let optionDateCreated = document.createElement("option");
  optionDateCreated.value = "dateCreated";
  optionDateCreated.innerText = "Date Created";
  filterSelect.appendChild(optionFilters);
  filterSelect.appendChild(optionDueDate);
  filterSelect.appendChild(optionDateCreated);
  filterSelect.appendChild(optionPriority);
  filterContainer.appendChild(filterTitle);
  filterContainer.appendChild(filterSelect);
  filterSelect.addEventListener("change", () => {
    // console.log(filterSelect.value);
    switch (filterSelect.value) {
      case "dueDate":
        console.log("Pre", currentProject.tasksList);
        filterObjArray(currentProject, "dueDate");
        console.log("Post", currentProject.tasksList);
        renderProj(currentProject);
        updateLocalStorage();
        break;
      case "priority":
        console.log("Pre", currentProject.tasksList);
        filterObjArray(currentProject, "priority");
        console.log("Post", currentProject.tasksList);
        renderProj(currentProject);
        updateLocalStorage();
        break;
      case "dateCreated":
        filterObjArray(currentProject, "dateCreated");
        renderProj(currentProject);
        updateLocalStorage();
        break;
      case "":
        // do nothing brah
        break;
    }
  });
  projectContainer.appendChild(filterContainer);

  // Make Current and Completed Div Prerendered:
  // Current Div Wrapper Creation:
  const currentDivWrapper = document.createElement("div");
  currentDivWrapper.className = "currentDivWrapper";
  let currentDivIcon = document.createElement("i");
  currentDivIcon.className = "fas fa-star";
  currentDivIcon.style.color = "#46529D";
  const currentDivTitle = document.createElement("h1");
  currentDivTitle.className = "currentTitle";
  currentDivTitle.innerText = "Current Items:";
  currentDiv.className = "currentDivList";
  currentDivWrapper.appendChild(currentDivIcon);
  currentDivWrapper.appendChild(currentDivTitle);

  const completedDivWrapper = document.createElement("div");
  completedDivWrapper.className = "completedDivWrapper";
  let completedDivIcon = document.createElement("i");
  completedDivIcon.className = "fas fa-check-double";
  completedDivIcon.style.color = "#46529D";
  const completedDivTitle = document.createElement("h1");
  completedDivTitle.className = "completedTitle";
  completedDivTitle.innerText = "Completed Items:";
  completedDiv.className = "completedDivList";
  completedDivWrapper.appendChild(completedDivIcon);
  completedDivWrapper.appendChild(completedDivTitle);
  modalsContainer.appendChild(addItemBtnWrapper);

  projectDetailsWrapper.appendChild(projectTitleWrapper);
  projectDetailsWrapper.appendChild(emptyDiv);
  projectContainer.appendChild(currentDivWrapper);
  projectContainer.appendChild(currentDiv);
  projectContainer.appendChild(completedDivWrapper);
  projectContainer.appendChild(completedDiv);

  function renderProjectItem(obj) {
    document.querySelector(".projectTitle").innerText = `${obj.projTitle}`;
    addItemBtnWrapper.addEventListener("click", function () {
      modalContent.textContent = "";
      modalOpen();
      modalContentTask(modalContent);
    });
  }

  function getKeyId(object, value) {
    return Object.keys(object).find((key) => object[key]["id"] == value);
  }

  function deleteTaskDom(datasetid, taskwrapper) {
    
    if (taskwrapper.dataset.taskwrapperid == datasetid) {
      console.log("the task has been deleted from DOM");
      taskwrapper.remove();
    } else {
      console.log("not this one chief");
    }
  }

  function PrIconColor(objprop, icon) {
    switch (objprop) {
      case "Low":
        icon.style.color = "#2EBAEE";
        break;
      case "Medium":
        icon.style.color = "#00A473";
        break;
      case "High":
        icon.style.color = "#DE3804";
        break;
      default:
        icon.style.color = "#2EBAEE";
    }
    return icon;
  }

  function PrTextColor(objprop, textNode) {
    switch (objprop) {
      case "Low":
        textNode.style.color = "#2EBAEE";
        break;
      case "Medium":
        textNode.style.color = "#00A473";
        break;
      case "High":
        textNode.style.color = "#DE3804";
        break;
      default:
        textNode.style.color = "#2EBAEE";
    }
    return textNode;
  }

  function renderTaskItem(taskObj) {

    const taskItemWrapper = document.createElement("div");
    taskItemWrapper.className = "taskItemWrapper";
    taskItemWrapper.id = `${taskObj.id}`;
    taskItemWrapper.dataset.taskwrapperid = `${taskObj.id}`;

    //  Title
    let taskTitle = document.createElement("h2");
    taskTitle.innerText = `${taskObj.title}`;
    taskTitle.className = "taskTitle";
    //   Description
    let taskDesc = document.createElement("p");
    taskDesc.innerText = `${taskObj.desc}`;
    taskDesc.className = "taskDesc";
    taskDesc.classList.add("taskDescShow");
    // Due Date Container
    let taskDueDateWrapper = document.createElement("div");
    taskDueDateWrapper.className = "taskDueDateWrapper";
    // Clock Icon
    let taskDueDateIcon = document.createElement("i");
    taskDueDateIcon.className = "fas fa-clock";
    taskDueDateIcon.style.color = "#2EBAEE";
    taskDueDateWrapper.appendChild(taskDueDateIcon);

    // dueDateText
    let taskDueDate = document.createElement("p");
    taskDueDate.innerText = `${taskObj.dueDate}`;
    taskDueDate.className = "taskDueDate";
    taskDueDateWrapper.appendChild(taskDueDate);

    //  Priority Container
    let taskPriorityWrapper = document.createElement("div");
    taskPriorityWrapper.className = "taskPriorityWrapper";
    let taskPriorityIcon = document.createElement("i");
    taskPriorityIcon.className = "fas fa-exclamation-circle";
    PrIconColor(taskObj.priority, taskPriorityIcon);
    let taskPriority = document.createElement("p");
    PrTextColor(taskObj.priority, taskPriority);
    taskPriority.innerText = `${taskObj.priority}`;
    taskPriority.className = "taskPriority";
    taskPriorityWrapper.appendChild(taskPriorityIcon);
    taskPriorityWrapper.appendChild(taskPriority);

    //Check box and Delete and Edit Icon
    let rightIconsWrapper = document.createElement("div");
    rightIconsWrapper.className = "rightIconsWrapper";

    // Checkmark
    let taskCompleteBtn = document.createElement("input");
    taskCompleteBtn.type = "checkbox";
    taskCompleteBtn.dataset.taskid = `${taskObj.id}`;
    taskCompleteBtn.className = "taskCompleteBtn";
    taskCompleteBtn.addEventListener("click", () => {
      let taskKey = getKeyId(
        currentProject.tasksList,
        taskItemWrapper.dataset.taskwrapperid
      );
      let foundObj = currentProject.tasksList[`${taskKey}`];
      // console.log(typeof foundObj)
      TaskItemcompleteToggle(foundObj);
      updateLocalStorage();
      // console.log(currentProject.tasksList);
      pushTask(
        taskItemWrapper,
        currentProject.tasksList[`${taskKey}`].completed
      );
      getTasksCount(currentProject.tasksList);
    });

    // Delete Btn
    let taskMoreBtn = document.createElement("button");
    taskMoreBtn.className = "taskMoreBtn";
    let taskDeleteIcon = document.createElement("i");
    taskDeleteIcon.className = "far fa-trash-alt";
    taskMoreBtn.appendChild(taskDeleteIcon);

    taskMoreBtn.addEventListener("click", () => {
      let taskKey = getKeyId(
        currentProject.tasksList,
        taskItemWrapper.dataset.taskwrapperid
      );
      delete currentProject.tasksList[`${taskKey}`];
      console.log(currentProject.tasksList);
      updateLocalStorage();
      deleteTaskDom(taskItemWrapper.dataset.taskwrapperid, taskItemWrapper);
      getTasksCount(currentProject.tasksList);
    });

    //  Edit Btn
    let taskEditBtn = document.createElement("button");
    taskEditBtn.className = "taskEditBtn";
    let taskEditBtnIcon = document.createElement("i");
    taskEditBtnIcon.className = "fas fa-pencil-alt";
    taskEditBtn.appendChild(taskEditBtnIcon);
    taskEditBtn.addEventListener("click", () => {
      modalOpen();
      modalContentEditTask(
        modalContent,
        getKeyId(
          currentProject.tasksList,
          taskItemWrapper.dataset.taskwrapperid
        )
      );
    });

    // Right wrapper appends
    rightIconsWrapper.appendChild(taskMoreBtn);
    rightIconsWrapper.appendChild(taskEditBtn);
    rightIconsWrapper.appendChild(taskCompleteBtn);

    // left wrapper small details append
    let leftWrapper = document.createElement("div");
    leftWrapper.className = "leftWrapper";
    leftWrapper.appendChild(taskTitle);
    let metaWrapper = document.createElement("div");
    metaWrapper.className = "metaWrapper";
    leftWrapper.appendChild(taskDesc);
    metaWrapper.appendChild(taskPriorityWrapper);
    metaWrapper.appendChild(taskDueDateWrapper);
    leftWrapper.appendChild(metaWrapper);

    // Expand Button to show desc
    let expandBtn = document.createElement("button");
    let expandBtnIcon = document.createElement("i");
    expandBtn.className = "expandBtn";
    expandBtnIcon.className = "fas fa-angle-double-down";
    expandBtn.appendChild(expandBtnIcon);
    expandBtn.addEventListener("click", () => {
      switch (true) {
        case taskDesc.classList.contains("taskDesc"):
          taskDesc.classList.toggle("taskDescShow");
          break;

        case taskDesc.classList.contains("taskDescShow"):
          taskDesc.classList.toggle("taskDesc");
          break;
      }

      switch (true) {
        case expandBtnIcon.classList.contains("fa-angle-double-down"):
          expandBtnIcon.classList.remove("fa-angle-double-down");
          expandBtnIcon.classList.add("fa-angle-double-right");
          break;

        case expandBtnIcon.classList.contains("fa-angle-double-right"):
          expandBtnIcon.classList.remove("fa-angle-double-right");
          expandBtnIcon.classList.add("fa-angle-double-down");
      }
    });
    rightIconsWrapper.appendChild(expandBtn);
    // Append of all wrappers
    taskItemWrapper.appendChild(leftWrapper);
    taskItemWrapper.appendChild(rightIconsWrapper);

    return taskItemWrapper;
  }

  // Renders tasklist property of a project object

  function emptyTaskList() {
    completedDivWrapper.style.display = "none";
    currentDivWrapper.style.display = "none";
  }

  function renderTaskList(obj) {
    let tasksListObject = obj.tasksList;
    console.log("Task List Object:", tasksListObject);
    //  renders projects task lists key's individual objects
    Object.keys(tasksListObject).forEach((element) => {
      // item is the individuals tasks dom created wrappers
      let item = renderTaskItem(tasksListObject[element]);
      pushTask(item, tasksListObject[element].completed);
    });
    getTasksCount(tasksListObject);
  }

  function renderProj(obj) {
    currentDiv.textContent = "";
    completedDiv.textContent = "";
    // object in this case is a project
    if (obj == undefined) {
      projectTitle.innerText = "";
      emptyProjWrapper.style.display = "flex";
      addItemBtnWrapper.style.display = "none";
      console.log("currentProj dont exist");
      emptyTaskList();
    } else {
      addItemBtnWrapper.style.display = "flex";
      emptyProjWrapper.style.display = "none";
      projectTitle.innerText = `${getCurrentProject().projTitle}`;
      renderProjectItem(obj);
      renderTaskList(obj);
    }
  }

  return {
    modalContent,
    modalOverlay,
    projectModalContentList,
    filterSelect,
    pushTask,
    renderTaskList,
    renderTaskItem,
    renderProjectItem,
    renderProj,
    renderProjListItem,
    renderProjList,
    getTasksCount,
    PrTextColor,
    PrIconColor,
    filterObjArray,
    parseTaskDate,
  };
})();

export default displayRender;
