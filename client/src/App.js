import ListHeader from "./components/ListHeader.js";
import ListItem from "./components/ListItem.js";
import Auth from "./components/Auth.js";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tareas/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app" style={{backgroundColor: authToken ? '#1D1C1F' : 'transparent'}}>
      {!authToken && <Auth/>}

      {authToken && 
        <>
        <ListHeader listName={'Lista de tareas'} getData={getData} />
        <p className="hola">Hola de nuevo!</p>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </>
      }
      
    </div>
  );
}

export default App;
