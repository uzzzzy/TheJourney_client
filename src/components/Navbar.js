import { Link } from 'react-router-dom'

import style from '../styles/components/Navbar.module.css'

import Logo from '../assets/logo.svg'

export default function Navbar({ setModal, user }) {
    const handleBtn = (e) => {
        console.log(e.target.id.split('-')[1])
        setModal({
            open: true,
            opt: e.target.id.split('-')[1],
        })
    }

    return (
        <nav className={style.navbar} onScroll={() => alert(window.scrollY)}>
            <div className="md:container">
                <div className={style.content}>
                    <Link to="/">
                        <img src={Logo} alt="The Journey" />
                    </Link>
                    <ul>
                        {user ? (
                            <li>
                                <img id="image" className={style.user} src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt={user?.fullName} />
                            </li>
                        ) : (
                            <>
                                <li>
                                    <button id="btn-login" className={style.login} onClick={handleBtn}>
                                        Login
                                    </button>
                                </li>

                                <li>
                                    <button id="btn-register" className={style.register} onClick={handleBtn}>
                                        Register
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
