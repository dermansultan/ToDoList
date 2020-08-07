const projectList = (() => {
    let projectListObject = JSON.parse(localStorage.getItem('projectListObject')) || null;
    let projectCounter = 0;
  
    return { projectListObject, projectCounter}
})();

export default projectList