import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { ExpandMore, Add, Mic, Settings, Headset } from '@material-ui/icons'
import CanalEnSideBar from '../components/CanalEnSideBar'
import firebaseApp from '../firebase/credenciales'
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore'
const firestore = getFirestore(firebaseApp)

export default function SideBar({ usuarioGlobal }) {
  const [listaCanales, setListaCanales] = useState([])

  async function getCanales() {
    const canalesArr = []
    const collectionRef = collection(firestore, 'canales')
    const canalesCifrados = await getDocs(collectionRef)
    canalesCifrados.forEach(canalCifrado => {
      canalesArr.push(canalCifrado.data())
    })

    setListaCanales(canalesArr)
  }

  function agregarCanal() {
    const nombreCanal = prompt('Cual es el nombre del nuevo canal?')
    if (nombreCanal) {
      const docuRef = doc(firestore, `canales/${nombreCanal}`)
      setDoc(docuRef, {
        id: new Date().getTime(),
        nombre: nombreCanal
      })
      getCanales();
    }
  }

  useEffect(() => {
    getCanales()
  }, [])
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <h2>DISCORD CLONE PARRA</h2>
        <ExpandMore></ExpandMore>
      </div>

      <div className='sidebar__channels'>
        <div className='sidebar__channelsHeader'>
          <div className='sidebar__header'>
            <ExpandMore></ExpandMore>
            <h4>text channels</h4>
          </div>

          <Add className='sidebar__addChannel' onClick={agregarCanal}></Add>
        </div>

        <div className='sidebar__channelsList'>
          {
            listaCanales ? listaCanales.map(canal => {
              return (
                <CanalEnSideBar nombre={canal.nombre} id={canal.id} key={canal.id} />
              )
            })
              : null
          }
        </div>
      </div>

      <div className='sidebar__profile'>
        <Avatar src={usuarioGlobal.photoURL} />
        <div className='sidebar__profileInfo'>
          <h4>{usuarioGlobal.displayName}</h4>
          <p>{usuarioGlobal.uid.substring(0, 4)}</p>
        </div>
      </div>
    </div>
  )
}
