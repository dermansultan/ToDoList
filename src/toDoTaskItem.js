// priority can be low, medium or high
 const taskItem = (title, desc, dueDate, priority, completed, id) => {
    
    // toggles the boolean value of the items.completed property
     function completeTaskItemToggle(obj){
        obj.completed = !obj.completed;
     }
  return { id, title, desc, dueDate, priority, completed, completeTaskItemToggle}
 };

  export default taskItem

