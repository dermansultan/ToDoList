const projectList = (() => {
    // Object which stores all project objects 
    const projectListObject = {};
    // Unique ID set for individual projects
    let projectCounter = 0;
    // The current Project Object in use by user
    
    // function currentProject(obj){
    //     return obj[Object.keys(obj)[0]];
    // }  

    // variable move to index

    
    // let currentProjectTaskList = currentProject.tasksList;
    
    return { projectListObject, projectCounter}
})();

export default projectList