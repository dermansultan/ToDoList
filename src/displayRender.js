import projectList from "./projectsList";
import { getCurrentProject, changeCurrentProject, currentProject, updateLocalStorage } from "./index";
import { modalOpen, modalContentTask, modalContentEditTask, createNewProject, modalContentEditProj, pushEditedProject} from "./modal"
const displayRender = (() => {
  // create the project container based off of what the project object is...

  function TaskItemcompleteToggle(obj){
    obj.completed = !obj.completed;
 }

  // Pre rendered HTML elements
  // Hamburger Nav 
  let projectDetailsWrapper = document.getElementById('projectDetailsWrapper');
  projectDetailsWrapper.className = "projectDetailsWrapper";
  let hamIconWrapper = document.createElement("button");
  hamIconWrapper.className = "hamIconWrapper";
  let hamIcon = document.createElement("i");
  hamIcon.className = "fas fa-bars";
  hamIcon.id = "burger";
  hamIconWrapper.appendChild(hamIcon);
  // effects on modal
  hamIconWrapper.addEventListener("click", () => {
    projectModalContainer.style.width = "50vw";
    projectModalContent.style.opacity = "1";
    projectModalCloseBtn.style.marginLeft = "50vw";
    projectModalContent.style.pointerEvents = "auto";
  });
// Project Title Nav
  let projectTitle = document.createElement("h1");
  projectTitle.className = "projectTitle";
  setTimeout(() => {
    projectTitle.innerText = `${getCurrentProject().projTitle}`;
  }, 100);
  let projectTitleWrapper = document.createElement("div");
  projectTitleWrapper.className = "projectTitleWrapper";
  projectTitleWrapper.appendChild(projectTitle);
  projectDetailsWrapper.appendChild(projectTitleWrapper);
  projectTitleWrapper.addEventListener('click', () => {
    console.log('click');
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
    projectModalContainer.style.width = "0";
    projectModalContent.style.opacity = "0";
    projectModalContent.style.pointerEvents = "none";
    projectModalCloseBtn.style.marginLeft = "0";
  });
  projectModalCloseBtn.appendChild(projectModalCloseBtnIcon);

  const projectAddBtnWrapper = document.createElement("div");
  projectAddBtnWrapper.className = "projectAddBtnWrapper";
  const projectAddBtnIcon = document.createElement("i");
  projectAddBtnIcon.className = "fas fa-folder-plus";
  projectAddBtnWrapper.addEventListener('click', () => {
    projectModalContainer.style.width = "0";
    projectModalContent.style.opacity = "0";
    projectModalContent.style.pointerEvents = "none";
    projectModalCloseBtn.style.marginLeft = "0";
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

  function renderProjListItem(obj) {
    let projItemWrapper = document.createElement("li");
    projItemWrapper.dataset.projwrapperid = `${obj.projId}`;
    projItemWrapper.className = "projItemWrapper";
    projItemWrapper.addEventListener("click", () => {
      console.log("clickAZ");
      projectModalContainer.style.width = "0";
      projectModalContent.style.opacity = "0";
      projectModalContent.style.pointerEvents = "none";
      projectModalCloseBtn.style.marginLeft = "0";
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

    let projectItemIcon = document.createElement("i");
    projectItemIcon.className = "fas fa-folder";
    projItemWrapper.appendChild(projectItemIcon);

    let projItemTitle = document.createElement("h2");
    projItemTitle.innerText = `${obj.projTitle}`;
    projItemTitle.className = "projItemTitle";
    projItemWrapper.appendChild(projItemTitle);

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
      completedDiv.appendChild(taskItem);
    } else {
      currentDiv.appendChild(taskItem);
    }
  }


  function renderProjectItem(obj) {

    document.querySelector('.projectTitle').innerText = `${obj.projTitle}`;

    // Completed Div Creation:
    const completedDivWrapper = document.createElement("div");
    completedDivWrapper.className = "completedDivWrapper";
    let completedDivIcon = document.createElement("i");
    completedDivIcon.className = "fas fa-check-double";
    completedDivIcon.style.color = "#46529D";
    const completedDivTitle = document.createElement("h1");
    completedDivTitle.className = "completedTitle";
    completedDivTitle.innerText = "Completed Items:";
    completedDiv.className = "completedDiv";
    completedDivWrapper.appendChild(completedDivIcon);
    completedDivWrapper.appendChild(completedDivTitle);
    completedDiv.appendChild(completedDivWrapper);
    modalsContainer.appendChild(addItemBtnWrapper);

    addItemBtnWrapper.addEventListener("click", function () {
      modalContent.textContent = '';
      modalOpen();
      modalContentTask(modalContent);
    });

    // Current Div Wrapper Creation:
    const currentDivWrapper = document.createElement("div");
    currentDivWrapper.className = "currentDivWrapper";
    let currentDivIcon = document.createElement("i");
    currentDivIcon.className = "fas fa-star";
    currentDivIcon.style.color = "#46529D";
    const currentDivTitle = document.createElement("h1");
    currentDivTitle.className = "currentTitle";
    currentDivTitle.innerText = "Current Items:";
    currentDiv.className = "currentDiv";
    currentDivWrapper.appendChild(currentDivIcon);
    currentDivWrapper.appendChild(currentDivTitle);
    currentDiv.appendChild(currentDivWrapper);

    projectDetailsWrapper.appendChild(projectTitleWrapper);
    projectDetailsWrapper.appendChild(emptyDiv);
    projectContainer.appendChild(currentDiv);
    projectContainer.appendChild(completedDiv);
  }

  //move this to another logic based module:
  // finds the object in the list with the same id
  function getKeyId(object, value) {
    return Object.keys(object).find((key) => object[key]["id"] == value);
  }

  function deleteTaskDom(datasetid, taskwrapper) {
    // Finds the task wrapper in which the dataset ID occurs and delete the task off the dom
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

  //  individual dom item
  function renderTaskItem(taskObj) {
    // to append to project container, contains list items from project

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
      let foundObj = currentProject.tasksList[`${taskKey}`]
      console.log(typeof foundObj)
      TaskItemcompleteToggle(foundObj);
      updateLocalStorage();
      console.log(currentProject.tasksList);
      pushTask(
        taskItemWrapper,
        currentProject.tasksList[`${taskKey}`].completed
      );
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
    let expandBtn = document.createElement('button');
    let expandBtnIcon = document.createElement('i');
    expandBtn.className = 'expandBtn';
    expandBtnIcon.className = 'fas fa-angle-double-down';
    expandBtn.appendChild(expandBtnIcon);
    expandBtn.addEventListener('click', () =>{
      if (taskDesc.style.display === 'none'){
        taskDesc.style.display = 'flex';
      } else {
        taskDesc.style.display = 'none';
      }
      if (expandBtnIcon.classList.contains('fa-angle-double-down')){
        expandBtnIcon.classList.remove('fa-angle-double-down');
        expandBtnIcon.classList.add('fa-angle-double-right');
      } else {
        expandBtnIcon.classList.remove('fa-angle-double-right');
        expandBtnIcon.classList.add('fa-angle-double-down');
      }
    });
    rightIconsWrapper.appendChild(expandBtn);
    // Append of all wrappers
    taskItemWrapper.appendChild(leftWrapper);
    taskItemWrapper.appendChild(rightIconsWrapper);
 
    return taskItemWrapper;
  }

  // Renders tasklist property of a project object
  function renderTaskList(obj) {
    let tasksListObject = obj.tasksList;
    //renders projects task lists key's individual objects
    Object.keys(tasksListObject).forEach((element) => {
      // item is the individuals tasks dom created wrappers
      let item = renderTaskItem(tasksListObject[element]);
      pushTask(item, tasksListObject[element].completed);
    });
  }

  function renderProj(obj) {
    currentDiv.textContent = '';
    completedDiv.textContent = '';
    // object in this case is a project
    renderProjectItem(obj); // ham duplication
    renderTaskList(obj);
  }

  return {
    modalContent,
    modalOverlay,
    projectModalContentList,
    pushTask,
    renderTaskList,
    renderTaskItem,
    renderProjectItem,
    renderProj,
    renderProjListItem,
    renderProjList,
  };
})();

export default displayRender;
