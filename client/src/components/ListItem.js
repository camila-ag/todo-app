import Modal from "./Modal.js";
import ProgressBar from "./ProgressBar.js";
import TickIcon from "./TickIcon.js";
import { useState } from "react";

const ListItem = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tareas/${task.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200){
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }

    return (
      <li className="list-item">
        <div className="info-container">
          <TickIcon />
          <p className="task-title">{task.title}</p>
        </div>
        <div className="progress-bar">
          <ProgressBar progress={task.progress} />
        </div>
        <div className="button-container item">
          <button className="edit" onClick={() => setShowModal(true)}>Editar</button>
          <button className="delete" onClick={deleteItem}>Eliminar</button> 
        </div>

        {showModal && <Modal mode={'Editar'} setShowModal={setShowModal} getData={getData} task={task} /> }
        
      </li>
    );
  }
  
  export default ListItem;