import React from 'react'
import UserHeaderNav from './UserHeaderNav'
import styles from './UserHeader.module.css'
import { useLocation } from 'react-router-dom'

const UserHeader = () => {

    const [title, setTitle] = React.useState('')
    const location = useLocation()

    React.useEffect(() => {
        setTitle(location.pathname)
        let title = location.pathname.split('/')[2]

        switch (title) {
            case 'postar': setTitle('Poste sua foto')
                break;
            case 'estatisticas':
                setTitle('Estatísticas')
                break;
            default:
                setTitle('Minha Conta')
                break;
        }

    }, [location])

    return (
        <header className={styles.header}>
            <h1 className='title'>{title}</h1>
            <UserHeaderNav />
        </header>
    )
}

export default UserHeader