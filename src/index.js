import taskItem from './toDoTaskItem'
import projectList from './projectsList'
import projectItem from './projectItem'
import displayRender from './displayRender'
import './style.css';
import '@fortawesome/fontawesome-free/js/all.js'

const project1 = projectItem('Default Project', {}, projectList.projectCounter++);
const project2 = projectItem('Default Project2', {}, projectList.projectCounter++);
projectList.projectListObject["proj1"] = project1;
projectList.projectListObject["proj2"] = project2;
//project1
const item1 = taskItem('Make dinner', `yum`, '01/01/2020', 'Low', false, ++project1.taskCounter);
const item2 = taskItem('Take out Garbage', 'take it out boy', 'TBA', 'Medium', false, ++project1.taskCounter);
const item3 = taskItem('Use the washroom', 'never forget to', 'TBA', 'High', false, ++project1.taskCounter); 
const item4 = taskItem('Play Modern Warfare', 'also buy vbuc', 'TBA', 'Low', false, ++project1.taskCounter);

//project2
const item6 = taskItem('Test6', 'test desc', 'TBA', 'high', false, project2.taskCounter++);
const item7 = taskItem('Test7', 'test desc', 'TBA', 'high', false, project2.taskCounter++);
const item8 = taskItem('Test8', 'test desc', 'TBA', 'high', true, project2.taskCounter++);


project1.tasksList.task1 = item1;
project1.tasksList.task2 = item2;
project1.tasksList.task3 = item3;
project1.tasksList.task4 = item4;

// project2.tasklist items
project2.tasksList.task1 = item6;
project2.tasksList.task2 = item7;
project2.tasksList.task3 = item8;

// displayRender.renderProj(projectList.currentProjectTaskList);



export let currentProject = projectList.projectListObject[Object.keys(projectList.projectListObject)[0]];

// export function getCurrentProject(){
//     return currentProject
// }

export function changeCurrentProject(obj){ 
    currentProject = obj; 
}
// let currentProject = projectList.projectListObject[Object.keys(projectList.projectListObject)[0]];


// Give user a default Project
displayRender.renderProj(currentProject);
displayRender.renderProjList(projectList);
// console.log(currentProject);
console.log(currentProject.tasksList);

