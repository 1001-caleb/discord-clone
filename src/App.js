import React, { useState } from "react";

import Login from "./views/Login";
import SideBar from "./views/SideBar";
import ChatScreen from "./views/ChatScreen";

import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    // revisar si se inició o cerró sesión
    if (usuarioFirebase) {
      setUsuarioGlobal(usuarioFirebase)
      console.log('sesion iniciada')
    } else {
      setUsuarioGlobal(null);
    }
  })

  return (
    <div>
      {usuarioGlobal ? (
        <>
          {" "}
          <SideBar usuarioGlobal={usuarioGlobal}/> <ChatScreen />{" "} </>)
        : (
          <Login />
        )}

    </div>
  );
}

export default App;
