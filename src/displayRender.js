import taskItem from './toDoTaskItem'
import projectList from './projectsList'
import currentProject from './index'

const displayRender = (() => {
// create the project container based off of what the project object is...
    const projectContainer = document.getElementById('projectContainer');
    const completedDiv = document.createElement('div');
    completedDiv.className = 'completedDiv'; 
    const currentDiv = document.createElement('div');
    currentDiv.className = 'currentDiv'; 

function renderProjectItem(obj){

let projectDetailsWrapper = document.createElement('div');
projectDetailsWrapper.className = 'projectDetailsWrapper';
projectContainer.appendChild(projectDetailsWrapper);

let projectTitle = document.createElement('h1');
projectTitle.className = "projectTitle";
projectTitle.innerText = `${obj.projTitle}`;

let projectEditBtn = document.createElement('button');
projectEditBtn.className = "projectEditBtn";
projectEditBtn.innerText = "Edit Title";

projectDetailsWrapper.appendChild(projectTitle);
projectDetailsWrapper.appendChild(projectEditBtn);

// Completed Div Creation:
const completedDivWrapper = document.createElement('div');
completedDivWrapper.className = 'completedDivWrapper';
const completedDivTitle = document.createElement('h1');
completedDivTitle.className = 'completedTitle'
completedDivTitle.innerText = "Completed Items:"
completedDiv.className = "completedDiv";
completedDivWrapper.appendChild(completedDivTitle);
completedDiv.appendChild(completedDivWrapper);

// import icons from IMG somewhere...

// Current Div Wrapper Creation:
const currentDivWrapper = document.createElement('div');
currentDivWrapper.className = "currentDivWrapper";
const currentDivTitle = document.createElement('h1');
    currentDivTitle.className = "currentTitle";
    currentDivTitle.innerText = "Current Items:"
    currentDiv.className = "currentDiv";
    currentDivWrapper.appendChild(currentDivTitle);
    currentDiv.appendChild(currentDivWrapper);

    projectContainer.appendChild(currentDiv);
    projectContainer.appendChild(completedDiv);

}


function pushTask(taskItem, completedStatus){
 if (completedStatus){
     completedDiv.appendChild(taskItem);
 } else {
     currentDiv.appendChild(taskItem);
 }
}

//move this to another logic based module: 
function getKeyId(object, value) {
    return Object.keys(object).find(key => object[key]["id"] == value);
}

function deleteTaskDom(datasetid, taskwrapper){
// Finds the task wrapper in which the dataset ID occurs and delete the task off the dom
if (taskwrapper.dataset.taskwrapperid == datasetid){
    console.log('the task has been deleted from DOM');
    taskwrapper.remove();

} else {
    console.log('not this one chief');
}
}

//  individual dom item
function renderTaskItem(taskObj){
// to append to project container, contains list items from project 

const taskItemWrapper = document.createElement('div');
taskItemWrapper.className = "taskItemWrapper";
taskItemWrapper.dataset.taskwrapperid = `${taskObj.id}`;

let taskTitle = document.createElement('h2');
taskTitle.innerText = `${taskObj.title}`;
taskTitle.className = "taskTitle";

let taskDesc =  document.createElement('p');
taskDesc.innerText = `${taskObj.desc}`;
taskDesc.className = "taskDesc";

let taskDueDateWrapper = document.createElement('div');
taskDueDateWrapper.className = 'taskDueDateWrapper';
let taskDueDate =  document.createElement('p');
taskDueDate.innerText = `${taskObj.dueDate}`;
taskDueDate.className = "taskDueDate";
taskDueDateWrapper.appendChild(taskDueDate);

let taskPriorityWrapper = document.createElement('div');
taskPriorityWrapper.className = 'taskPriorityWrapper';
let taskPriority = document.createElement('p');
taskPriority.innerText = `${taskObj.priority}`;
taskPriority.className = "taskPriority";
taskPriorityWrapper.appendChild(taskPriority);

//Check box and three dots
let rightIconsWrapper = document.createElement('div');
rightIconsWrapper.className = 'rightIconsWrapper';

let taskCompleteBtn = document.createElement('input');
taskCompleteBtn.type = "checkbox";
taskCompleteBtn.dataset.taskid = `${taskObj.id}`;
taskCompleteBtn.className = "taskCompleteBtn";
taskCompleteBtn.addEventListener('click', () => {
    let taskKey = getKeyId(currentProject.tasksList, taskItemWrapper.dataset.taskwrapperid);
    currentProject.tasksList[`${taskKey}`].completeTaskItemToggle(currentProject.tasksList[`${taskKey}`]);
    console.log(currentProject.tasksList);
    pushTask(taskItemWrapper, currentProject.tasksList[`${taskKey}`].completed);
});
rightIconsWrapper.appendChild(taskCompleteBtn);

let taskMoreBtn = document.createElement('button');
taskMoreBtn.innerText = 'Delete'
taskMoreBtn.className = "taskMoreBtn";
taskMoreBtn.addEventListener('click', () => {
    let taskKey = getKeyId(currentProject.tasksList, taskItemWrapper.dataset.taskwrapperid);
    delete currentProject.tasksList[`${taskKey}`];
    console.log(currentProject.tasksList);
    deleteTaskDom(taskItemWrapper.dataset.taskwrapperid, taskItemWrapper);
});
rightIconsWrapper.appendChild(taskMoreBtn);


taskItemWrapper.appendChild(taskTitle);
taskItemWrapper.appendChild(taskDesc);
taskItemWrapper.appendChild(taskDueDateWrapper);
taskItemWrapper.appendChild(taskPriorityWrapper);
taskItemWrapper.appendChild(rightIconsWrapper);


// console.log(taskItemWrapper);
return taskItemWrapper;
}

// Renders tasklist property of a project object
function renderTaskList(obj){
    let tasksListObject = obj.tasksList; 
//renders projects task lists key's individual objects 
Object.keys(tasksListObject).forEach(element => {
    // item is the individuals tasks dom created wrappers
    let item = renderTaskItem(tasksListObject[element]);
    pushTask(item, tasksListObject[element].completed);
});
}

function renderProj(obj){
    // object in this case is a project
    renderProjectItem(obj);
    renderTaskList(obj);
    }

return { renderTaskList, renderTaskItem, renderProjectItem, renderProj }

})();

export default displayRender