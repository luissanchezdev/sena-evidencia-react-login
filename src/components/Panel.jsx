import { useUserContext } from "../hooks/UserProvider"
import { useNavigate } from "react-router-dom"

import Header from "./ui/Header"
import ProtectedRoute from "./ProtectedRoute"

function Panel() {

  const { dataUser } = useUserContext()
  const navigate = useNavigate()
  const userLogged = JSON.parse(localStorage.getItem('userLogged'))
  //console.log({ userLogged })
  return (
    <>
      <ProtectedRoute isAllowed={userLogged} redirectTo={'/'}>
        <div>
          <Header />
          <div className='flex justify-center items-center uppercase h-screen text-2xl bg-gray-100'>
            <h2>Bienvenido {dataUser.username}</h2>
          </div>
        </div>
      </ProtectedRoute>      
    </>
  )
}

export default Panel