import React from 'react'
import {Button} from '@material-ui/core'
import firebaseApp from '../firebase/credenciales'
import {getAuth, GoogleAuthProvider, signInWithRedirect} from 'firebase/auth'

const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();
export default function login() {

    function loginConGoogle(){
        signInWithRedirect(auth, gProvider)
    }
  return (
    <div className='login'>
        <div className='login_logo'>
            <img src="https://i.imgur.com/ijXyjMM.png"  alt=""/>
        </div>
        <Button onClick={loginConGoogle}>Acceder con google</Button>
    </div>
  )
}
