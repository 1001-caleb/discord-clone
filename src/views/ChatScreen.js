import React, { useState, useEffect, useRef } from 'react'
import { AddCircle, CreditCard, Gif, EmojiEmotions } from '@material-ui/icons'
import EncabezadoChat from '../components/EncabezadoChat';
import firebaseApp from '../firebase/credenciales';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore'
import Mensaje from '../components/Mensaje';

const firestore = getFirestore(firebaseApp)
export default function ChatScreen({ canalActivo, usuario }) {
  const [inputMensaje, setInputMensaje] = useState('');
  const [listaMensajes, setListaMensajes] = useState([]);
  const anchor = useRef();

  function enviarMensaje(e) {
    e.preventDefault();
    const docuRef = doc(firestore, `canales/${canalActivo}/mensajes/${new Date().getTime()}`)

    setDoc(docuRef, {
      foto: usuario.photoURL,
      usuario: usuario.displayName,
      mensaje: inputMensaje,
      id: new Date().getTime(),
    });

    setInputMensaje("");
    getListaMensajes();
    anchor.current.scrollIntoView({ behavior: "smooth" });
  }

  async function getListaMensajes() {
    const mensajesArr = []
    const coleccionRef = collection(firestore, `canales/${canalActivo}/mensajes`);
    const mensajesCifrados = await getDocs(coleccionRef);
    mensajesCifrados.forEach(mensaje => {
      mensajesArr.push(mensaje.data());
    });

    setListaMensajes([...mensajesArr])
  }

  useEffect(() => {
    getListaMensajes();
  }, [canalActivo]);

  return (
    <div className='chat'>
      <EncabezadoChat nombreCanal={canalActivo} />
      <div className='chat__messages'>
        {
          listaMensajes ?  
            listaMensajes.map(mensaje =>{
              return (
                <Mensaje mensajeFirebase={mensaje}/>
              )
            })
          : null
        }
          <div ref={anchor} style={{ marginBottom: "75px" }}></div>
      </div>

      <div className='chat__input'>
        <AddCircle fontSizw='large'></AddCircle>

        <form onSubmit={enviarMensaje}>
          <input type='text'
            disabled={canalActivo ? false : true} value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder={`Enviar mensaje a ${canalActivo || ''}`}>

          </input>
          <button disabled={canalActivo ? false : true} className='chat__inputButton' type='submit'>Enviar mensaje</button>
        </form>


        <div className='chat__inputIcons'>
          <CreditCard fontSize='large' />
          <Gif fontSize='large' />
          <EmojiEmotions fontSize='large' />
        </div>
      </div>
    </div>
  )
}
