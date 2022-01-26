import React from 'react';
import {Button} from '@mui/material'
import { auth, provider } from '../../firebase.js'
import './Login.css'
import {actionTypes} from '../../reducer'
import {useStateValue} from '../../stateProvider'

function Login() {
    const [{}, dispatch] = useStateValue();
    
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                payload: result.user,
            })
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/300px-WhatsApp.svg.png" alt="Whatsapp Logo" />
                <div className="login_text">
                    Sign into Whatsapp Clone
                </div>
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
