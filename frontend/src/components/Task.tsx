import React from 'react'
import TaskObject, { Priority } from '../TaskObject'

interface props {
    t:TaskObject
}

function formatDateToDDMMYYYY(inputDate: Date): string {
  const date:Date = new Date(inputDate)
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}:${month}:${year} at ${hours}:${minutes}`;
}

function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) {
    return input; 
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
}





const Task:React.FC<props> = ({t}) => {

  const getColor = ():string => {
  
  
    if (t.priority === Priority.Low) {
      return "var(--priority_low)";
    } else if (t.priority === Priority.MEDIUM) {
      return "var(--priority_medium)";
    } else if (t.priority === Priority.HIGH) {
      return "var(--priority_high)";
    }
  
    return "black";
    
  }


  return (
    <div className='task_container'>
        <div className='inner_task_container'>
        <a className='task_priority_state' style={{color: getColor()}}>{t.priority.toUpperCase()}</a>
            <h1 className='task_container_title'>{t.title}</h1>
           
            <div className='task_progress_bar'>
         
                 <div className="task_progress_bar_filled" style={{width:`${t.progress}%`}}></div>

            </div>
            
            <div className='task_container_infos'><a className='task_container_infos_state'>{capitalizeFirstLetter(t.state)}</a></div>
            

            <div className='task_container_footer'>
                <p>{"Created: " + formatDateToDDMMYYYY(t.date)}</p>
                <span className="material-symbols-rounded">comment</span>
                <span className="material-symbols-rounded">push_pin</span>
                <span className="material-symbols-rounded">more_vert</span>
            </div>
        </div>

    </div>
  )
}

export default Task;