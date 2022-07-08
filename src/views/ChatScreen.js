import React, { useState, useEffect, useRef } from 'react'
import { AddCircle, CreditCard, Gif, EmojiEmotions } from '@material-ui/icons'
import EncabezadoChat from '../components/EncabezadoChat';
import firebaseApp from '../firebase/credenciales';
import {getFirestore, doc, setDoc} from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)
export default function ChatScreen({ canalActivo, usuario }) {
  const [inputMensaje, setInputMensaje] = useState('');

  function enviarMensaje(e){
    e.preventDefault();
    const docuRef = doc(firestore, `canales/${canalActivo}/mensajes/${new Date().getTime()}`)

    setDoc(docuRef, {
      foto: usuario.photoURL,
      usuario: usuario.displayName,
      mensaje: inputMensaje,
      id: new Date().getTime(),
    });

    setInputMensaje("");
  }

  return (
    <div className='chat'>
      <EncabezadoChat nombreCanal={ canalActivo } />
      <div className='chat__messages'>

      </div>

      <div className='chat__input'>
        <AddCircle fontSizw='large'></AddCircle>

        <form onSubmit={enviarMensaje}>
          <input type='text'
            disabled={canalActivo ? false : true} value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder= {`Enviar mensaje a ${canalActivo || ''}`}>

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
