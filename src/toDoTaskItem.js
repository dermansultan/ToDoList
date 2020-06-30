
 const taskItem = (id, title, desc, dueDate, priority, completed) => {
    
    // toggles the boolean value of the items.completed property
     function completeTaskItemToggle(obj){
        obj.completed = !completed;
     }
  return { id, title, desc, dueDate, priority, completed, completeTaskItemToggle}
 };

  export default taskItem

