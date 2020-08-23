import taskItem from './toDoTaskItem'
import projectList from './projectsList'
import projectItem from './projectItem'
import displayRender from './displayRender'
import './style.css'
// import 'line-awesome/dist/font-awesome-line-awesome/css/all.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

export let currentProject;

function createDefaultProject(){
const project1 = projectItem('Default Project', {}, projectList.projectCounter++);
projectList.projectListObject["proj1"] = project1;

//project1
const item1 = taskItem('This is a task', `Great you learned how to view task descriptions.`, '01/01/2020', 'Low', 1, false, ++project1.taskCounter);
const item2 = taskItem('This is a task', `Great you learned how to view task descriptions.`, '01/01/2020', 'High', 3, false, ++project1.taskCounter);
const item3 = taskItem('This is a task', `Great you learned how to view task descriptions.`, '01/01/2020', 'Medium', 2, false, ++project1.taskCounter);
project1.tasksList.task1 = item1;
project1.tasksList.task2 = item2;
project1.tasksList.task3 = item3;

}

if (projectList.projectListObject == null){
    console.log('Project List Object Doesnt Exist');
    projectList.projectListObject = {};
    projectList.projectCounter = 0;
    createDefaultProject();
    changeCurrentProject(projectList.projectListObject["proj1"]);
    updateLocalStorage();

} else {
    if (Object.keys(projectList.projectListObject).length == 0 || Object.keys(JSON.parse(localStorage.getItem('projectListObject')) || {} ).length == 0)
    {
        currentProject = undefined;
        } else {
            currentProject =  JSON.parse(localStorage.getItem('currentProject')) || projectList.projectListObject[Object.keys(projectList.projectListObject)[0]];
        }
}


export function getCurrentProject(){
    return currentProject
}

export function changeCurrentProject(obj){ 
    currentProject = obj; 
    localStorage.setItem('currentProject', JSON.stringify(currentProject)); 
}


export function updateLocalStorage(){
    localStorage.setItem('projectListObject', JSON.stringify(projectList.projectListObject));
    localStorage.setItem('currentProject', JSON.stringify(currentProject));
    localStorage.setItem('projectCounter', JSON.stringify(projectList.projectCounter));
}

// Give user a default Project
displayRender.renderProj(getCurrentProject());
displayRender.renderProjList(projectList);
