import { getCurrentProject, changeCurrentProject, currentProject, updateLocalStorage } from "./index";
import projectList from "./projectsList";
import projectItem from "./projectItem";
import taskItem from "./toDoTaskItem";
import displayRender from './displayRender'
import { format } from "date-fns";

function modalClose() {
  displayRender.modalOverlay.style.visibility = "hidden";
  displayRender.modalContent.textContent = "";
}

function modalOpen() {
    console.log("the modal should open now...");
    displayRender.modalOverlay.style.visibility = "visible";
  }

  function modalContentEditProj(modalOv){
let editProjForm = document.createElement('form');
editProjForm.className = 'editProjForm';
let projectFormTitle = document.createElement('label');
    projectFormTitle.className = 'projectFormTitle';
    projectFormTitle.innerText = 'Project Title'
    let projectFormTitleIn = document.createElement('input');
    projectFormTitleIn.className = 'projectFormTitleIn';
    let projectFormSubmitBtn = document.createElement('button');
    projectFormSubmitBtn.innerText = 'Create Project'
    projectFormSubmitBtn.className = 'projectFormSubmitBtn';
    editProjForm.addEventListener('submit', (event) => {
      event.preventDefault();
      currentProject.projTitle = `${projectFormTitleIn.value}`;
      console.log(currentProject);
      updateLocalStorage();
      modalClose();
      // Update List of Projects to change name as well. 
      displayRender.renderProj(currentProject);
      displayRender.projectModalContentList.innerText = '';
      displayRender.renderProjList(projectList);
    });    
    editProjForm.appendChild(projectFormTitle);
    editProjForm.appendChild(projectFormTitleIn);
    editProjForm.appendChild(projectFormSubmitBtn);
    modalOv.appendChild(editProjForm);
  }

    // Creating a task
    function modalContentTask(modalOv) {
        let taskForm = document.createElement("form");
        taskForm.className = "taskForm";
    
        //  Title
        let taskFormTitleWrapper = document.createElement("div");
        taskFormTitleWrapper.className = "taskFormTitleWrapper";
        let taskFormTitleLbl = document.createElement("label");
        taskFormTitleLbl.className = "taskFormTitleLbl";
        taskFormTitleLbl.innerText = "Task";
        let taskFormTitleIn = document.createElement("input");
        taskFormTitleIn.className = "taskFormTitleIn";
        taskFormTitleIn.placeholder = "Name your task";
        taskFormTitleIn.required = true;
        taskFormTitleWrapper.appendChild(taskFormTitleLbl);
        taskFormTitleWrapper.appendChild(taskFormTitleIn);
    
        //  Desc
        let taskFormDescWrapper = document.createElement("div");
        taskFormDescWrapper.className = "taskFormDescWrapper";
        let taskFormDescLbl = document.createElement("label");
        taskFormDescLbl.className = "taskFormDescLbl";
        taskFormDescLbl.innerText = "Description";
        let taskFormDescIn = document.createElement("input");
        taskFormDescIn.className = "taskFormDescIn";
        taskFormDescIn.placeholder = "Describe the task";
        taskFormDescIn.required = true;
        taskFormDescWrapper.appendChild(taskFormDescLbl);
        taskFormDescWrapper.appendChild(taskFormDescIn);
    
        // Date Due
        let taskFormDateWrapper = document.createElement("div");
        taskFormDateWrapper.className = "taskFormDateWrapper";
        let taskFormDateLbl = document.createElement("label");
        taskFormDateLbl.innerText = "Date";
        taskFormDateLbl.className = "taskFormDateLbl";
        let taskFormDateIn = document.createElement("input");
        taskFormDateIn.className = "taskFormDateIn";
        let today = new Date();
        taskFormDateIn.value = today.toISOString().substr(0, 10);
        taskFormDateIn.type = "date";
        taskFormDateIn.required = true;
        taskFormDateWrapper.appendChild(taskFormDateLbl);
        taskFormDateWrapper.appendChild(taskFormDateIn);
    
        //  Priority
        let taskFormPrWrapper = document.createElement("div");
        taskFormPrWrapper.className = "taskFormPrWrapper";
        let taskFormPrChoiceWrapper = document.createElement("div");
        taskFormPrChoiceWrapper.className = "taskforPrChoiceWrapper";
    
        let taskFormPrLbl = document.createElement("label");
        taskFormPrLbl.innerText = "Priority";
    
        let taskFormPrSlct = document.createElement("select");
        taskFormPrSlct.required = true;
        taskFormPrSlct.class = "taskFormPrSlct";
    
        let lowOption = document.createElement("option");
        lowOption.innerText = "Low";
        let medOption = document.createElement("option");
        medOption.innerText = "Medium";
        let highOption = document.createElement("option");
        highOption.innerText = "High";
    
        taskFormPrSlct.appendChild(lowOption);
        taskFormPrSlct.appendChild(medOption);
        taskFormPrSlct.appendChild(highOption);
    
        taskFormPrChoiceWrapper.appendChild(taskFormPrLbl);
        taskFormPrChoiceWrapper.appendChild(taskFormPrSlct);
        taskFormPrWrapper.appendChild(taskFormPrChoiceWrapper);
    
        // submit button
        let submitBtn = document.createElement("input");
        submitBtn.type = "submit";
        submitBtn.className = "submitBtn";
        submitBtn.innerText = "create";
        taskForm.addEventListener("submit", (event) => {
          event.preventDefault();
          currentProject.tasksList[
            `task${++currentProject.taskCounter}`
          ] = taskItem(
            `${taskFormTitleIn.value}`,
            `${taskFormDescIn.value}`,
            `${format(
              taskFormDateIn.valueAsDate.setDate(
                taskFormDateIn.valueAsDate.getDate() + 1
              ),
              "MMM do yyyy"
            )}`,
            `${taskFormPrSlct.value}`,
            false,
            currentProject.taskCounter
          );
          displayRender.pushTask(
            displayRender.renderTaskItem(
              currentProject.tasksList[`task${currentProject.taskCounter}`]
            ),
            currentProject.tasksList[`task${currentProject.taskCounter}`].completed
          );
          console.log(currentProject.tasksList);
          updateLocalStorage();
          modalClose();
        });
    
        taskForm.appendChild(taskFormTitleWrapper);
        taskForm.appendChild(taskFormDescWrapper);
        taskForm.appendChild(taskFormDateWrapper);
        taskForm.appendChild(taskFormPrWrapper);
        taskForm.appendChild(submitBtn);
        modalOv.appendChild(taskForm);
      }

  // Editing a task
  function modalContentEditTask(modalOv, taskKey) {
    let taskForm = document.createElement("form");
    taskForm.className = "taskForm";
    console.log(taskKey);
    let taskObj = currentProject.tasksList[`${taskKey}`];

    //  Title
    let taskFormTitleWrapper = document.createElement("div");
    taskFormTitleWrapper.className = "taskFormTitleWrapper";
    let taskFormTitleLbl = document.createElement("label");
    taskFormTitleLbl.className = "taskFormTitleLbl";
    taskFormTitleLbl.innerText = "Task";
    let taskFormTitleIn = document.createElement("input");
    taskFormTitleIn.className = "taskFormTitleIn";
    taskFormTitleIn.value = `${taskObj.title}`;
    taskFormTitleWrapper.appendChild(taskFormTitleLbl);
    taskFormTitleWrapper.appendChild(taskFormTitleIn);

    //  Desc
    let taskFormDescWrapper = document.createElement("div");
    taskFormDescWrapper.className = "taskFormDescWrapper";
    let taskFormDescLbl = document.createElement("label");
    taskFormDescLbl.className = "taskFormDescLbl";
    taskFormDescLbl.innerText = "Description";
    let taskFormDescIn = document.createElement("input");
    taskFormDescIn.className = "taskFormDescIn";
    taskFormDescIn.value = `${taskObj.desc}`;
    taskFormDescWrapper.appendChild(taskFormDescLbl);
    taskFormDescWrapper.appendChild(taskFormDescIn);

    // Date Due
    let taskFormDateWrapper = document.createElement("div");
    taskFormDateWrapper.className = "taskFormDateWrapper";
    let taskFormDateLbl = document.createElement("label");
    taskFormDateLbl.innerText = "Date";
    taskFormDateLbl.className = "taskFormDateLbl";
    let taskFormDateIn = document.createElement("input");
    taskFormDateIn.className = "taskFormDateIn";
    taskFormDateIn.type = "date";
    let today = new Date();
    taskFormDateIn.value = today.toISOString().substr(0, 10);
    taskFormDateWrapper.appendChild(taskFormDateLbl);
    taskFormDateWrapper.appendChild(taskFormDateIn);

    //  Priority
    let taskFormPrWrapper = document.createElement("div");
    taskFormPrWrapper.className = "taskFormPrWrapper";
    let taskFormPrChoiceWrapper = document.createElement("div");
    taskFormPrChoiceWrapper.className = "taskforPrChoiceWrapper";

    let taskFormPrLbl = document.createElement("label");
    taskFormPrLbl.innerText = "Priority";

    let taskFormPrSlct = document.createElement("select");
    taskFormPrSlct.class = "taskFormPrSlct";

    let defOption = document.createElement("option");
    defOption.innerText = "Select Priority";
    defOption.selected = "selected";
    defOption.disabled = "disabled";

    let lowOption = document.createElement("option");
    lowOption.innerText = "Low";
    let medOption = document.createElement("option");
    medOption.innerText = "Medium";
    let highOption = document.createElement("option");
    highOption.innerText = "High";

    taskFormPrSlct.appendChild(defOption);
    taskFormPrSlct.appendChild(lowOption);
    taskFormPrSlct.appendChild(medOption);
    taskFormPrSlct.appendChild(highOption);

    taskFormPrChoiceWrapper.appendChild(taskFormPrLbl);
    taskFormPrChoiceWrapper.appendChild(taskFormPrSlct);
    taskFormPrWrapper.appendChild(taskFormPrChoiceWrapper);

    // submit button
    let submitBtn = document.createElement("input");
    submitBtn.className = "submitBtn";
    submitBtn.innerText = "create";
    submitBtn.type = "submit";
    submitBtn.addEventListener("click", () => {
      // replaces already existing key with:
      currentProject.tasksList[`${taskKey}`] = taskItem(
        `${taskFormTitleIn.value}`,
        `${taskFormDescIn.value}`,
        `${format(
          taskFormDateIn.valueAsDate.setDate(
            taskFormDateIn.valueAsDate.getDate() + 1
          ),
          "MMM do yyyy"
        )}`,
        `${taskFormPrSlct.value}`,
        false,
        taskObj.id
      );
      let wrapper = document.getElementById(`${taskObj.id}`);
      console.log(wrapper);
      wrapper.querySelector(
        ".taskTitle"
      ).innerText = `${taskFormTitleIn.value}`;
      wrapper.querySelector(".taskDesc").innerText = `${taskFormDescIn.value}`;
      wrapper.querySelector(
        ".taskPriority"
      ).innerText = `${taskFormPrSlct.value}`;
      wrapper.querySelector(".taskDueDate").innerText = `${format(
        taskFormDateIn.valueAsDate.setDate(
          taskFormDateIn.valueAsDate.getDate() + 1
        ),
        "MMM do yyyy"
      )}`;
      modalClose();
    });

    modalOv.appendChild(taskFormTitleWrapper);
    modalOv.appendChild(taskFormDescWrapper);
    modalOv.appendChild(taskFormDateWrapper);
    modalOv.appendChild(taskFormPrWrapper);
    modalOv.appendChild(submitBtn);
    updateLocalStorage();

  }
  // Creating a new project
  function createNewProject(modalOv){
    let newProjectForm = document.createElement('form');
    newProjectForm.className = 'newProjectForm';
    let projectFormTitle = document.createElement('label');
    projectFormTitle.className = 'projectFormTitle';
    projectFormTitle.innerText = 'Project Title'
    let projectFormTitleIn = document.createElement('input');
    projectFormTitleIn.className = 'projectFormTitleIn';
    let projectFormSubmitBtn = document.createElement('button');
    projectFormSubmitBtn.innerText = 'Create Project'
    projectFormSubmitBtn.className = 'projectFormSubmitBtn';
    newProjectForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(projectList.projectCounter);
      console.log(projectList);
      let projectWrapped = projectList.projectListObject[`proj${++projectList.projectCounter}`] = projectItem(`${projectFormTitleIn.value}`, {}, projectList.projectCounter);
      pushProject(displayRender.renderProjListItem(projectWrapped));
      updateLocalStorage();
      console.log(projectList.projectListObject);
      changeCurrentProject(projectWrapped);
      displayRender.renderProj(currentProject);
      modalClose();
    });    
    newProjectForm.appendChild(projectFormTitle);
    newProjectForm.appendChild(projectFormTitleIn);
    newProjectForm.appendChild(projectFormSubmitBtn);
    modalOv.appendChild(newProjectForm);
  }

  function pushProject(projLi){
    console.log(projLi)
    displayRender.projectModalContentList.appendChild(projLi);
  }

  function projectModalClose(container){
    container.style.width = "0";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    container.style.marginLeft = "0";
  }

  function projectModalOpen(container){
    container.style.width = "50vw";
    container.style.opacity = "1";
    container.style.marginLeft = "50vw";
    container.style.pointerEvents = "auto";
  }

  export { modalOpen, modalContentTask, modalContentEditTask, createNewProject, pushProject, projectModalClose, projectModalOpen, modalContentEditProj}