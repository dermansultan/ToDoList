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
    projectFormTitle.innerText = 'Project Title';
    let projectFormTitleIn = document.createElement('input');
    projectFormTitleIn.placeholder = 'New Title';
    projectFormTitleIn.value = `${currentProject.projTitle}`;
    let projectFormSubmitBtn = document.createElement('button');
    projectFormSubmitBtn.innerText = 'Change Title'
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
        lowOption.value = 1;
        let medOption = document.createElement("option");
        medOption.innerText = "Medium";
        medOption.value = 2;
        let highOption = document.createElement("option");
        highOption.innerText = "High";
        highOption.value = 3;
    
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
            `${taskFormPrSlct.options[taskFormPrSlct.selectedIndex].text}`,
            taskFormPrSlct.value,
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
          displayRender.getTasksCount(currentProject.tasksList);
          displayRender.filterObjArray(currentProject, `${displayRender.filterSelect.options[displayRender.filterSelect.selectedIndex].text}`);
          displayRender.renderProj(currentProject);
          updateLocalStorage();
        });
    
        taskForm.appendChild(taskFormTitleWrapper);
        taskForm.appendChild(taskFormDescWrapper);
        taskForm.appendChild(taskFormDateWrapper);
        taskForm.appendChild(taskFormPrWrapper);
        taskForm.appendChild(submitBtn);
        modalOv.appendChild(taskForm);
      }

    function modalContentDelProj(modalOv, foundProj){
      console.log(foundProj);
      let deleteProjContainer = document.createElement('div');
      deleteProjContainer.className = 'deleteProjContainer';

      let deleteProjTitle = document.createElement('label')
      deleteProjTitle.innerText = 'Are you sure you would like to delete this project?';
      deleteProjTitle.className = 'deleteProjTitle';
      deleteProjContainer.appendChild(deleteProjTitle);

      let buttonsWrapper = document.createElement('div');
      buttonsWrapper.className = 'buttonsWrapper';

      let yesBtn = document.createElement('input');
      yesBtn.className = 'yesBtn';
      yesBtn.type = 'button';
      yesBtn.value = 'Yes';
      yesBtn.addEventListener('click', () =>{
        console.log('yes was clicked');
        delete projectList.projectListObject[`${foundProj}`];
        updateLocalStorage();
        changeCurrentProject(projectList.projectListObject[Object.keys(projectList.projectListObject)[0]]);
        displayRender.renderProj(currentProject);
        displayRender.projectModalContentList.innerText = '';
        displayRender.renderProjList(projectList);
        modalClose();
        
        console.log ('The Project List is:', projectList.projectListObject);
        console.log('The current project is', currentProject);
      });

      let noBtn = document.createElement('input');
      noBtn.className = 'noBtn';
      noBtn.type = 'button';
      noBtn.value = 'No';
      noBtn.addEventListener('click', () =>{
        modalClose();
      });

      buttonsWrapper.appendChild(yesBtn);
      buttonsWrapper.appendChild(noBtn);
      deleteProjContainer.appendChild(buttonsWrapper);

      modalOv.appendChild(deleteProjContainer);

    }

  // Editing a task
  function modalContentEditTask(modalOv, taskKey) {
    let taskForm = document.createElement("form");
    taskForm.className = "taskForm";
    console.log(taskKey);
    let taskObj = currentProject.tasksList[`${taskKey}`];

    //  Title
    let taskFormTitleLbl = document.createElement("label");
    taskFormTitleLbl.className = "taskFormTitleLbl";
    taskFormTitleLbl.innerText = "Task";
    let taskFormTitleIn = document.createElement("input");
    taskFormTitleIn.className = "taskFormTitleIn";
    taskFormTitleIn.value = `${taskObj.title}`;
    taskForm.appendChild(taskFormTitleLbl);
    taskForm.appendChild(taskFormTitleIn);

    //  Desc

    let taskFormDescLbl = document.createElement("label");
    taskFormDescLbl.className = "taskFormDescLbl";
    taskFormDescLbl.innerText = "Description";
    let taskFormDescIn = document.createElement("input");
    taskFormDescIn.className = "taskFormDescIn";
    taskFormDescIn.value = `${taskObj.desc}`;
    taskForm.appendChild(taskFormDescLbl);
    taskForm.appendChild(taskFormDescIn);

    // Date Due

    let taskFormDateLbl = document.createElement("label");
    taskFormDateLbl.innerText = "Date";
    taskFormDateLbl.className = "taskFormDateLbl";
    let taskFormDateIn = document.createElement("input");
    taskFormDateIn.className = "taskFormDateIn";
    taskFormDateIn.type = "date";
    let today = new Date();
    taskFormDateIn.value = today.toISOString().substr(0, 10);
    taskForm.appendChild(taskFormDateLbl);
    taskForm.appendChild(taskFormDateIn);

    //  Priority


    let taskFormPrLbl = document.createElement("label");
    taskFormPrLbl.innerText = "Priority";

    let taskFormPrSlct = document.createElement("select");
    taskFormPrSlct.required = true;
    taskFormPrSlct.class = "taskFormPrSlct";

    let defOption = document.createElement("option");
    defOption.innerText = "Select Priority";
    defOption.value = '';
    defOption.selected = "selected";
    defOption.disabled = true;
    defOption.required = true;

    let lowOption = document.createElement("option");
    lowOption.innerText = "Low";
    lowOption.value = 1;
    let medOption = document.createElement("option");
    medOption.innerText = "Medium";
    medOption.value = 2;
    let highOption = document.createElement("option");
    highOption.innerText = "High";
    highOption.value = 3;

    taskFormPrSlct.appendChild(defOption);
    taskFormPrSlct.appendChild(lowOption);
    taskFormPrSlct.appendChild(medOption);
    taskFormPrSlct.appendChild(highOption);

    taskForm.appendChild(taskFormPrLbl);
    taskForm.appendChild(taskFormPrSlct);


    // submit button
    let submitBtn = document.createElement("input");
    submitBtn.className = "submitBtn";
    submitBtn.type = "submit";
    taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
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
        `${taskFormPrSlct.options[taskFormPrSlct.selectedIndex].text}`,
        taskFormPrSlct.value,
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
      ).innerText = `${taskFormPrSlct.options[taskFormPrSlct.selectedIndex].text}`;
      displayRender.PrIconColor(`${taskFormPrSlct.options[taskFormPrSlct.selectedIndex].text}`, wrapper.querySelector(".fa-exclamation-circle") );
      displayRender.PrTextColor(`${taskFormPrSlct.options[taskFormPrSlct.selectedIndex].text}`, wrapper.querySelector(
        ".taskPriority"));
      // change color of priority object as well.
      wrapper.querySelector(".taskDueDate").innerText = `${format(
        taskFormDateIn.valueAsDate.setDate(
          taskFormDateIn.valueAsDate.getDate() + 1
        ),
        "MMM do yyyy"
      )}`;
      modalClose();
      updateLocalStorage();
      displayRender.filterObjArray(currentProject, `${displayRender.filterSelect.options[displayRender.filterSelect.selectedIndex].text}`);
      displayRender.renderProj(currentProject);
      updateLocalStorage();
    });
    taskForm.appendChild(submitBtn);
    modalOv.appendChild(taskForm);

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


  export { modalOpen, modalContentTask, modalContentEditTask, createNewProject, pushProject, modalContentEditProj, modalContentDelProj}