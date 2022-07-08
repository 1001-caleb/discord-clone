import React, { useState, useEffect, useRef } from 'react'
import { AddCircle, CreditCard, Gif, EmojiEmotions } from '@material-ui/icons'
import EncabezadoChat from '../components/EncabezadoChat';

export default function ChatScreen({ canalActivo }) {
  const [inputMensaje, setInputMensaje] = useState('');

  return (
    <div className='chat'>
      <EncabezadoChat nombreCanal={ canalActivo } />
      <div className='chat__messages'>

      </div>

      <div className='chat__input'>
        <AddCircle fontSizw='large'></AddCircle>
        <form>
          <input type='text'
            disabled value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder='Enviar mensaje a '>

          </input>
          <button disabled className='chat__inputButton' type='submit'>Enviar mensaje</button>
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
