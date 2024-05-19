import React from 'react'
import { useState } from 'react'
import Notification from './Notification'
import db from '../db/database.json'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../hooks/UserProvider'
import logo from '../assets/logo.png'
import Footer from './Footer'
import Layout from './Layout'

function Login() {
  const navigate = useNavigate()
  const {dataUser, setDataUser} = useUserContext()

  // Hooks para manejar los estados de los inputs y el mensaje de notificación
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('');

  // Función para cambiár el estado tan pronto se cambia el valor del input username
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  // Función para cambiár el estado tan pronto se cambia el valor del input password
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  // Función para manejar el envió del formulario. Al dar click en el botón "Acceder", se actualizará el estado de la variable message, y este mensaje se pasara al componente Notificación el cuál lo mostrará
  const handleSubmit = (e) => {
    e.preventDefault()
    const users = db.usuarios
    const userForAuth = users.filter((user) => user.username === username)
    //console.log(userForAuth)
    //console.log(userForAuth[0].password)

    if (userForAuth[0].password === password) {
      localStorage.setItem('userLogged', JSON.stringify(userForAuth[0]))
      setMessage('Ingresando...')
      setType('success')
      setDataUser(userForAuth[0])
      setTimeout(() => {
        setMessage('')
        navigate('/dashboard')
      },1000)
    } else {
      setMessage('Datos incorrectos')
      setType('error')
    }

    // userForAuth[0].password === password ? console.log("Success Login") : console.log("Login Error")
    // Se establece una cuenta atrás para que el mensaje solo se muestre por 5000 milisegundos (5 segundos) y desaparezca
    setTimeout(() => {
      setMessage('')
    },5000)
  }

  return (
    <div className='layout'>
      <main className='main'>
        <div className='login-card'>
          <div className='flex justify-center'>
            <a href="#">
              <h1>
                <img src={logo} className="w-4/5 mx-auto"></img>
              </h1>
            </a>
          </div>
          <h2 className='h2'>Inicio de sesión</h2>
          { /* En el onSubmit se pasa el evento a la función handleSubmit */ }
          <form id='login-form' className='login-form' onSubmit={(e) => handleSubmit(e)}>
            <div className='group-input'>
              <label htmlFor='username' className='label' >
                Nombre de usuario
              </label>
              { /* Con el onChange podemos verficar los cambios en el input, para esto pasamos el evento a la función handleUsername  */ }
              <input onChange={(e) => handleUsername(e)} type='text' name='username' id='username' placeholder='aprendiz' className='input' value={username} required/>
            </div> 
            <div className='group-input'>
              <label htmlFor='password' className='label'>Contraseña</label>
              <input type='password' name="password" id='password' className='input' value={password} required onChange={(e) => handlePassword(e)}/>
            </div>
            <button className='btn-send'>Acceder</button>
            { /* Al componente Notificación se le pasa la variable message como prop */ }
            <Notification message={message} type={type}/>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  ) 
}

export default Login