import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({mode, setShowModal, getData, task}) => {
  const editMode = mode === "Editar" ? true : false
  const [cookies, setCookies, removeCookies] = useCookies(null);

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date().toLocaleDateString()
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tareas`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status === 200){
        setShowModal(false);
        getData()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editData = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tareas/${task.id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      if(response.status === 200){
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setData(data => ({
      ...data, 
      [name] : value
    }))

  }
  
    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>{mode} tarea</h3>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>

          <form>
            <input
              required
              maxLength={30}
              placeholder="Escribir tarea"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <br/>
            <label htmlFor="range">Selecciona el progreso</label>
            <input
              required
              id="range"
              type="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
            />
            <input className="btn" type="submit" onClick={editMode ? editData : postData} />
          </form>

        </div>
      </div>
    );
  }
  
  export default Modal;