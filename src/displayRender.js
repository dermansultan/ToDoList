const displayRender = (() => {
// dom events occurences
const projectContainer = document.getElementById('projectContainer');

function renderCompletedTaskItems(obj){

projectContainer.innerHTML = '';

let currentTasksArray = obj.currentTasks;

currentTasksArray.forEach(element => {
    console.log(`${element.title}`);
});

}

return { renderCompletedTaskItems }

})();

export default displayRender