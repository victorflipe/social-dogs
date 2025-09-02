import React from 'react'
import { UserContext } from '../../UserContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { login } = React.useContext(UserContext)
    if (login === true) {
        return children
    } else if (login === false) {
        return <Navigate to="/login" />
    }
    return <></>
    // return login ? children : <Navigate to="/login"/> //</Navigate>: <></>

    //   return login ? children : <Navigate to="/login"/>
}

export default ProtectedRoutes