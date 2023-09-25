import { useState } from "react";
import Modal from "./Modal.js";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(null);
 
  const signOut = () => {
    removeCookies('Email');
    removeCookies('AuthToken');
    window.location.reload();
  }

    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="create" onClick={() => setShowModal(true)}>AÑADIR</button>
          <button className="signout" onClick={signOut}>SALIR</button>
        </div>
       {showModal && <Modal mode={'Nueva'} setShowModal={setShowModal} getData={getData} />}
      </div>
    );
  }
  
  export default ListHeader;
  