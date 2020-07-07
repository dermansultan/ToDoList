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
    
    const addItemBtn = document.createElement('i');
    addItemBtn.className = 'fas fa-plus-circle';



function renderProjectItem(obj){

let projectDetailsWrapper = document.createElement('div');
projectDetailsWrapper.className = 'projectDetailsWrapper';
projectContainer.appendChild(projectDetailsWrapper);

let hamIcon = document.createElement('i');
hamIcon.className = 'fas fa-bars';


let projectTitle = document.createElement('h1');
projectTitle.className = "projectTitle";
projectTitle.innerText = `${obj.projTitle}`;

let projectEditBtn = document.createElement('button');
let projectEditIcon = document.createElement('i');
projectEditIcon.className = 'far fa-edit';
projectEditBtn.className = "projectEditBtn";

let projectTitleWrapper = document.createElement('div');
projectTitleWrapper.className = 'projectTitleWrapper';

projectEditBtn.appendChild(projectEditIcon);
projectTitleWrapper.appendChild(projectTitle);
projectTitleWrapper.appendChild(projectEditBtn);

projectDetailsWrapper.appendChild(hamIcon);
projectDetailsWrapper.appendChild(projectTitleWrapper);
// Completed Div Creation:
const completedDivWrapper = document.createElement('div');
completedDivWrapper.className = 'completedDivWrapper';
let completedDivIcon = document.createElement('i');
completedDivIcon.className = 'fas fa-check-double';
completedDivIcon.style.color ='#46529D';
const completedDivTitle = document.createElement('h1');
completedDivTitle.className = 'completedTitle'
completedDivTitle.innerText = "Completed Items:"
completedDiv.className = "completedDiv";
completedDivWrapper.appendChild(completedDivIcon);
completedDivWrapper.appendChild(completedDivTitle);
completedDiv.appendChild(completedDivWrapper);
projectContainer.appendChild(addItemBtn);


// Current Div Wrapper Creation:
const currentDivWrapper = document.createElement('div');
currentDivWrapper.className = "currentDivWrapper";
let currentDivIcon = document.createElement('i');
currentDivIcon.className = 'fas fa-star';
currentDivIcon.style.color ='#46529D'
const currentDivTitle = document.createElement('h1');
    currentDivTitle.className = "currentTitle";
    currentDivTitle.innerText = "Current Items:"
    currentDiv.className = "currentDiv";
    currentDivWrapper.appendChild(currentDivIcon);
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

function PrIconColor(objprop, icon){
    switch (objprop){
case 'Low':
    icon.style.color = '#2EBAEE';
    break;
case 'Med':
    icon.style.color = '#00A473';
    break;
case 'High':
    icon.style.color = '#DE3804';
    break;
    default:
        icon.style.color = '#2EBAEE';
    }
    return icon; 
}

//  individual dom item
function renderTaskItem(taskObj){
// to append to project container, contains list items from project 

const taskItemWrapper = document.createElement('div');
taskItemWrapper.className = "taskItemWrapper";
taskItemWrapper.dataset.taskwrapperid = `${taskObj.id}`;

//  Title
let taskTitle = document.createElement('h2');
taskTitle.innerText = `${taskObj.title}`;
taskTitle.className = "taskTitle";
//   Description
let taskDesc =  document.createElement('p');
taskDesc.innerText = `${taskObj.desc}`;
taskDesc.className = "taskDesc";
// Due Date Container 
let taskDueDateWrapper = document.createElement('div');
taskDueDateWrapper.className = 'taskDueDateWrapper';
// Clock Icon
let taskDueDateIcon = document.createElement('i');
taskDueDateIcon.className = 'fas fa-clock';
taskDueDateIcon.style.color = '#2EBAEE';
taskDueDateWrapper.appendChild(taskDueDateIcon);


// dueDateText
let taskDueDate =  document.createElement('p');
taskDueDate.innerText = `${taskObj.dueDate}`;
taskDueDate.className = "taskDueDate";
taskDueDateWrapper.appendChild(taskDueDate);

//  Priority Container
let taskPriorityWrapper = document.createElement('div');
taskPriorityWrapper.className = 'taskPriorityWrapper';
let taskPriorityIcon = document.createElement('i');
taskPriorityIcon.className = 'fas fa-exclamation-circle';
PrIconColor(taskObj.priority, taskPriorityIcon);
let taskPriority = document.createElement('p');
taskPriority.innerText = `${taskObj.priority}`;
taskPriority.className = "taskPriority";
taskPriorityWrapper.appendChild(taskPriorityIcon);
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
rightIconsWrapper.appendChild(taskCompleteBtn);

let leftWrapper = document.createElement('div')
leftWrapper.className = 'leftWrapper';
leftWrapper.appendChild(taskTitle);

let metaWrapper = document.createElement('div');
metaWrapper.className = 'metaWrapper';
metaWrapper.appendChild(taskPriorityWrapper);
metaWrapper.appendChild(taskDueDateWrapper);
leftWrapper.appendChild(metaWrapper);


taskItemWrapper.appendChild(leftWrapper);
taskItemWrapper.appendChild(taskDesc);
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