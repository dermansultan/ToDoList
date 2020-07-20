const projectList = (() => {
    const projectListObject = JSON.parse(localStorage.getItem('projectListObject') || "{}");
    let projectCounter = 0;
  
    return { projectListObject, projectCounter}
})();

export default projectList