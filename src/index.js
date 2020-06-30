// import { format, compareAsc } from 'date-fns';
import taskItem from './toDoTaskItem'
import projectItem from './projectItem'
import displayRender from './displayRender'

const item1 = taskItem(1, 'Make the Eat', `I will die if I don't!`, 'sometime', 'priority high', false);
const item2 = taskItem(2, 'Take out Garbage', 'take it out boy', 'tba', 'high', false);

const project1 = projectItem(1, 'Default Project', [item1, item2], []);
const projectArray = [project1];

// item1.completeTaskItemToggle(item1);
displayRender.renderCompletedTaskItems(project1);

console.log(project1)