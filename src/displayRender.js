import { format } from 'date-fns'
import taskItem from './toDoTaskItem'
import projectList from './projectsList'
import currentProject from './index'

const displayRender = (() => {
// create the project container based off of what the project object is...
function modalOpen(){
    console.log('the modal should open now...')
    modalOverlay.style.visibility = 'visible';
    } 

    const projectContainer = document.getElementById('projectContainer');    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modalOverlay';
    const modalContent = document.createElement('div');
    modalContent.className = 'modalContent';
    

    // click out modal reset modal content
    window.addEventListener('click', function(event) {
        if (event.target == modalOverlay) {
          modalOverlay.style.visibility = "hidden";
          modalContent.textContent = '';
        }
      });

    modalOverlay.appendChild(modalContent);
    projectContainer.appendChild(modalOverlay);
    
    const completedDiv = document.createElement('div');
    completedDiv.className = 'completedDiv'; 
    
    const currentDiv = document.createElement('div');
    currentDiv.className = 'currentDiv';

    
    const addItemBtnWrapper = document.createElement('button');
    addItemBtnWrapper.className = 'addItemBtnWrapper';
    const addItemBtn = document.createElement('i');
    addItemBtn.className = 'fas fa-plus-circle';
    addItemBtnWrapper.appendChild(addItemBtn);


    function pushTask(taskItem, completedStatus){
        if (completedStatus){
            completedDiv.appendChild(taskItem);
        } else {
            currentDiv.appendChild(taskItem);
        }
       }


function renderProjectItem(obj){

let projectDetailsWrapper = document.createElement('div');
projectDetailsWrapper.className = 'projectDetailsWrapper';
projectContainer.appendChild(projectDetailsWrapper);

let hamIcon = document.createElement('i');
hamIcon.className = 'fas fa-bars';

let emptyDiv = document.createElement('div');
emptyDiv.className = 'empty';


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
projectDetailsWrapper.appendChild(emptyDiv);
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
projectContainer.appendChild(addItemBtnWrapper);


addItemBtnWrapper.addEventListener('click', function(){
modalOpen();
modalContentTask(modalContent);

});


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

//move this to another logic based module: 
// finds the object in the list with the same id
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
case 'Medium':
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
taskItemWrapper.id = `${taskObj.id}`;
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

//Check box and Delete and Edit Icon
let rightIconsWrapper = document.createElement('div');
rightIconsWrapper.className = 'rightIconsWrapper';

// Checkmark
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

// Delete Btn
let taskMoreBtn = document.createElement('button');
taskMoreBtn.className = "taskMoreBtn";
let taskDeleteIcon = document.createElement('i');
taskDeleteIcon.className = 'far fa-trash-alt';
taskMoreBtn.appendChild(taskDeleteIcon);

taskMoreBtn.addEventListener('click', () => {
    let taskKey = getKeyId(currentProject.tasksList, taskItemWrapper.dataset.taskwrapperid);
    delete currentProject.tasksList[`${taskKey}`];
    console.log(currentProject.tasksList);
    deleteTaskDom(taskItemWrapper.dataset.taskwrapperid, taskItemWrapper);
});

//  Edit Btn
let taskEditBtn = document.createElement('button');
taskEditBtn.className = 'taskEditBtn';
let taskEditBtnIcon = document.createElement('i');
taskEditBtnIcon.className = "fas fa-pencil-alt";
taskEditBtn.appendChild(taskEditBtnIcon);
taskEditBtn.addEventListener('click', () => {
    modalOpen();
    modalContentEditTask(modalContent, getKeyId(currentProject.tasksList, taskItemWrapper.dataset.taskwrapperid));
});

// Right wrapper appends
rightIconsWrapper.appendChild(taskMoreBtn);
rightIconsWrapper.appendChild(taskEditBtn);
rightIconsWrapper.appendChild(taskCompleteBtn);

// left wrapper small details append
let leftWrapper = document.createElement('div')
leftWrapper.className = 'leftWrapper';
leftWrapper.appendChild(taskTitle);
let metaWrapper = document.createElement('div');
metaWrapper.className = 'metaWrapper';
metaWrapper.appendChild(taskPriorityWrapper);
metaWrapper.appendChild(taskDueDateWrapper);
leftWrapper.appendChild(metaWrapper);

// Append of all wrappers
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

    function modalContentTask(modalOv){
        let taskForm = document.createElement('form');
        taskForm.className = 'taskForm';
        
        //  Title    
        let taskFormTitleWrapper = document.createElement('div');
        taskFormTitleWrapper.className = 'taskFormTitleWrapper';
        let taskFormTitleLbl = document.createElement('label');
        taskFormTitleLbl.className = 'taskFormTitleLbl';
        taskFormTitleLbl.innerText = 'Task';
        let taskFormTitleIn = document.createElement('input');
        taskFormTitleIn.className = 'taskFormTitleIn';
        taskFormTitleIn.placeholder = 'Name your task';
        taskFormTitleIn.required;
        taskFormTitleWrapper.appendChild(taskFormTitleLbl);
        taskFormTitleWrapper.appendChild(taskFormTitleIn);
        
        //  Desc
        let taskFormDescWrapper = document.createElement('div');
        taskFormDescWrapper.className = 'taskFormDescWrapper';
        let taskFormDescLbl = document.createElement('label');
        taskFormDescLbl.className = 'taskFormDescLbl';
        taskFormDescLbl.innerText = 'Description';
        let taskFormDescIn = document.createElement('input');
        taskFormDescIn.className = 'taskFormDescIn';
        taskFormDescIn.placeholder = 'Describe the task';
        taskFormDescIn.required;
        taskFormDescWrapper.appendChild(taskFormDescLbl);
        taskFormDescWrapper.appendChild(taskFormDescIn);
        
        // Date Due
        let taskFormDateWrapper = document.createElement('div');
        taskFormDateWrapper.className = 'taskFormDateWrapper';
        let taskFormDateLbl = document.createElement('label');
        taskFormDateLbl.innerText = 'Date'
        taskFormDateLbl.className = 'taskFormDateLbl';
        let taskFormDateIn = document.createElement('input');
        taskFormDateIn.className = 'taskFormDateIn';
        taskFormDateIn.type = 'date';
        taskFormDateIn.required;
        taskFormDateWrapper.appendChild(taskFormDateLbl);
        taskFormDateWrapper.appendChild(taskFormDateIn);
        
        //  Priority
        let taskFormPrWrapper = document.createElement('div');
        taskFormPrWrapper.className = 'taskFormPrWrapper';
        let taskFormPrChoiceWrapper = document.createElement('div');
        taskFormPrChoiceWrapper.className = 'taskforPrChoiceWrapper';
        
        let taskFormPrLbl = document.createElement('label');
        taskFormPrLbl.innerText = 'Priority';
        
        let taskFormPrSlct = document.createElement('select');
        taskFormPrSlct.required;
        taskFormPrSlct.class = 'taskFormPrSlct';
        
        let lowOption = document.createElement('option');
        lowOption.innerText = 'Low';
        let medOption = document.createElement('option');
        medOption.innerText = 'Medium';
        let highOption = document.createElement('option');
        highOption.innerText = 'High';
        
        taskFormPrSlct.appendChild(lowOption);
        taskFormPrSlct.appendChild(medOption);
        taskFormPrSlct.appendChild(highOption);
        
        taskFormPrChoiceWrapper.appendChild(taskFormPrLbl);
        taskFormPrChoiceWrapper.appendChild(taskFormPrSlct);
        taskFormPrWrapper.appendChild(taskFormPrChoiceWrapper);
        
        
        // submit button
        let submitBtn = document.createElement('input')
        submitBtn.className = 'submitBtn';
        submitBtn.innerText = 'create';
        submitBtn.type = 'submit';
        submitBtn.addEventListener('click', () => {
            currentProject.tasksList[`task${++currentProject.taskCounter}`] = taskItem(`${taskFormTitleIn.value}`, `${taskFormDescIn.value}`, `${format(taskFormDateIn.valueAsDate.setDate(taskFormDateIn.valueAsDate.getDate() + 1), 'MMM do yyyy')}`, `${taskFormPrSlct.value}`, false, currentProject.taskCounter);
            pushTask(renderTaskItem(currentProject.tasksList[`task${currentProject.taskCounter}`]), currentProject.tasksList[`task${currentProject.taskCounter}`].completed);

            console.log(currentProject.tasksList);
            
        });
        
        modalOv.appendChild(taskFormTitleWrapper);
        modalOv.appendChild(taskFormDescWrapper);
        modalOv.appendChild(taskFormDateWrapper);
        modalOv.appendChild(taskFormPrWrapper);
        modalOv.appendChild(submitBtn);
        
        }

        function modalContentEditTask(modalOv, taskKey){
            let taskForm = document.createElement('form');
            taskForm.className = 'taskForm';
            console.log(taskKey);
            let taskObj = currentProject.tasksList[`${taskKey}`];
            
            //  Title    
            let taskFormTitleWrapper = document.createElement('div');
            taskFormTitleWrapper.className = 'taskFormTitleWrapper';
            let taskFormTitleLbl = document.createElement('label');
            taskFormTitleLbl.className = 'taskFormTitleLbl';
            taskFormTitleLbl.innerText = 'Task';
            let taskFormTitleIn = document.createElement('input');
            taskFormTitleIn.className = 'taskFormTitleIn';
            taskFormTitleIn.placeholder = `${taskObj.title}`;
            taskFormTitleWrapper.appendChild(taskFormTitleLbl);
            taskFormTitleWrapper.appendChild(taskFormTitleIn);
            
            //  Desc
            let taskFormDescWrapper = document.createElement('div');
            taskFormDescWrapper.className = 'taskFormDescWrapper';
            let taskFormDescLbl = document.createElement('label');
            taskFormDescLbl.className = 'taskFormDescLbl';
            taskFormDescLbl.innerText = 'Description';
            let taskFormDescIn = document.createElement('input');
            taskFormDescIn.className = 'taskFormDescIn';
            taskFormDescIn.placeholder = `${taskObj.desc}`;
            taskFormDescWrapper.appendChild(taskFormDescLbl);
            taskFormDescWrapper.appendChild(taskFormDescIn);
            
            // Date Due
            let taskFormDateWrapper = document.createElement('div');
            taskFormDateWrapper.className = 'taskFormDateWrapper';
            let taskFormDateLbl = document.createElement('label');
            taskFormDateLbl.innerText = 'Date'
            taskFormDateLbl.className = 'taskFormDateLbl';
            let taskFormDateIn = document.createElement('input');
            taskFormDateIn.className = 'taskFormDateIn';
            taskFormDateIn.type = 'date';
            taskFormDateIn.placeholder = `${taskObj.dueDate}`;
            taskFormDateWrapper.appendChild(taskFormDateLbl);
            taskFormDateWrapper.appendChild(taskFormDateIn);
            
            //  Priority CHANGE DEFAULT HERE 
            let taskFormPrWrapper = document.createElement('div');
            taskFormPrWrapper.className = 'taskFormPrWrapper';
            let taskFormPrChoiceWrapper = document.createElement('div');
            taskFormPrChoiceWrapper.className = 'taskforPrChoiceWrapper';
            
            let taskFormPrLbl = document.createElement('label');
            taskFormPrLbl.innerText = 'Priority';
            
            let taskFormPrSlct = document.createElement('select');
            taskFormPrSlct.class = 'taskFormPrSlct';
            
            let defOption = document.createElement('option');
            defOption.innerText = 'Select Priority'
            defOption.selected = "selected";
            defOption.disabled = "disabled";
            
            let lowOption = document.createElement('option');
            lowOption.innerText = 'Low';
            let medOption = document.createElement('option');
            medOption.innerText = 'Medium';
            let highOption = document.createElement('option');
            highOption.innerText = 'High';
            
            taskFormPrSlct.appendChild(defOption);
            taskFormPrSlct.appendChild(lowOption);
            taskFormPrSlct.appendChild(medOption);
            taskFormPrSlct.appendChild(highOption);
            
            taskFormPrChoiceWrapper.appendChild(taskFormPrLbl);
            taskFormPrChoiceWrapper.appendChild(taskFormPrSlct);
            taskFormPrWrapper.appendChild(taskFormPrChoiceWrapper);
            
            
            // submit button
            let submitBtn = document.createElement('input')
            submitBtn.className = 'submitBtn';
            submitBtn.innerText = 'create';
            submitBtn.type = 'submit';
            submitBtn.addEventListener('click', () => {
                // replaces already existing key with: 
                currentProject.tasksList[`${taskKey}`] = taskItem(`${taskFormTitleIn.value}`, `${taskFormDescIn.value}`, `${format(taskFormDateIn.valueAsDate.setDate(taskFormDateIn.valueAsDate.getDate() + 1), 'MMM do yyyy')}`, `${taskFormPrSlct.value}`, false, taskObj.id);    
                let wrapper = document.getElementById(`${taskObj.id}`); 
                console.log(wrapper);
                wrapper.querySelector('.taskTitle').innerText = `${taskFormTitleIn.value}`;
                wrapper.querySelector('.taskDesc').innerText = `${taskFormDescIn.value}`;
                wrapper.querySelector('.taskPriority').innerText = `${taskFormPrSlct.value}`;
                wrapper.querySelector('.taskDueDate').innerText = `${format(taskFormDateIn.valueAsDate.setDate(taskFormDateIn.valueAsDate.getDate() + 1), 'MMM do yyyy')}`;
            });
            
            modalOv.appendChild(taskFormTitleWrapper);
            modalOv.appendChild(taskFormDescWrapper);
            modalOv.appendChild(taskFormDateWrapper);
            modalOv.appendChild(taskFormPrWrapper);
            modalOv.appendChild(submitBtn);
            
            }

return { renderTaskList, renderTaskItem, renderProjectItem, renderProj }

})();

export default displayRender