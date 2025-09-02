import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import IconFotos from '../../Assets/feed.svg?react'
import IconEstatisticas from '../../Assets/estatisticas.svg?react'
import IconAdicionarFoto from '../../Assets/adicionar.svg?react'
import IconSair from '../../Assets/sair.svg?react'
import styles from './UserHeaderNav.module.css'
import useMedia from '../../Hooks/useMedia'

const UserHeaderNav = () => {

    // const { mobile, setMobile } = React.useState(null)
    const { userLogout } = React.useContext(UserContext)
    const mobile = useMedia('(max-width: 40rem)')
    const [mobileMenu, setMobileMenu] = React.useState(false)

    const { pathname } = useLocation();
    React.useEffect(() => {
        setMobileMenu(false);
    }, [pathname])

    const navigate = useNavigate()


    const handleLogout = () => {
        userLogout()
        navigate('/login')
    }

    return (
        <>

            {mobile && (
                <button
                    aria-label="Menu"
                    className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
                    onClick={() => setMobileMenu(!mobileMenu)}>
                </button>
            )}

            <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
                <NavLink to="/conta" end> <IconFotos /> {mobile && "Minhas Fotos"} </NavLink>
                <NavLink to="/conta/estatisticas"><IconEstatisticas /> {mobile && "Estatísticas"}</NavLink>
                <NavLink to="/conta/postar"><IconAdicionarFoto /> {mobile && "Adicionar Foto"}</NavLink>
                <button onClick={handleLogout}><IconSair /> {mobile && "Sair"}</button>
            </nav>
        </>
    )
}

export default UserHeaderNav