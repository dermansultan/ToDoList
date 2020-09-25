const projectList = (() => {
  let projectListObject =
    JSON.parse(localStorage.getItem("projectListObject")) || null;
  let projectCounter =
    JSON.parse(localStorage.getItem("projectCounter")) || null;

  return { projectListObject, projectCounter };
})();

export default projectList;
