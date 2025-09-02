import React from 'react'
import { GET_USER, TOKEN_POST, TOKEN_VALIDATE_POST } from '../api'
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext()


export const UserStorage = ({ children }) => {

    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()


    const userLogout = React.useCallback(async () => {
        setData(null)
        setError(null)
        setLoading(false)
        setLogin(false)
        window.localStorage.removeItem('token')
    }, [])

    React.useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token')

            if (token) {
                try {
                    setError(null)
                    setLoading(true)

                    const { url, options } = TOKEN_VALIDATE_POST(token)
                    const response = await fetch(url, options)
                    if (!response.ok) {
                        throw new Error('Token inválido')
                    }

                    await getUser(token)

                } catch (error) {
                    setError(error.message)
                    userLogout()
                } finally {
                    setLoading(false)
                }
            }else{
                setLogin(false)
            }
        }
        autoLogin()
    }, [])



    const getUser = async (token) => {
        const { url, options } = GET_USER(token)
        const response = await fetch(url, options)
        const json = await response.json()
        setData(json)
        setLogin(true)
    }

    const userLogin = async (username, password) => {
        try {

            setError(null)
            setLoading(true)

            const { url, options } = TOKEN_POST({ username, password })
            const response = await fetch(url, options)

            if (!response.ok) {
                throw new Error("Erro: " + response.status)
            }

            const { token } = await response.json()
            window.localStorage.setItem('token', token)

            await getUser(token)

            navigate('/conta')

        } catch (error) {
            setError(error.message)
            setLogin(false)
        } finally {
            setLoading(false)
        }
    }



    return (
        <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
            {children}
        </UserContext.Provider>
    )
}
