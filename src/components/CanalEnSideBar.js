import React from 'react'

export default function CanalEnSideBar({nombre, id}) {
  return (
    <div className='sidebarChannel' key={id}>
        <h4><span className='sidebarChannel__hash'>#</span>{nombre}</h4>
        
    </div>
  )
}
