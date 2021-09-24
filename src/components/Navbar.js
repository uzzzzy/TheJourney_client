import { Link, useHistory } from 'react-router-dom'

import style from '../styles/components/Navbar.module.css'

import Logo from '../assets/logo.svg'

import IconUser from '../assets/navbar/profile.svg'
import IconWrite from '../assets/navbar/write.svg'
import IconBookmark from '../assets/navbar/bookmark.svg'
import IconLogout from '../assets/navbar/logout.svg'

import { useEffect, useState } from 'react'

export default function Navbar({ user, setModal }) {
    const [offset, setOffset] = useState(0)
    const [shadow, setShadow] = useState()
    const [dropdown, setDropdown] = useState(false)

    let history = useHistory()

    useEffect(() => {
        if (!user)
            window.onscroll = () => {
                let y = window.pageYOffset / window.innerHeight
                if (offset < 0.18 || y < offset) setOffset(y < 0.15 ? y : 0.18)
            }

        if (offset > 0 || user) {
            setShadow('shadow-lg')
        } else {
            setShadow()
        }
    }, [offset, user])

    const handleBtn = (e) => {
        setDropdown(false)
        const btn = e.target.id.split('-')[1]
        console.log(btn)
        switch (btn) {
            case 'register':
            case 'login':
            case 'logout':
                setModal({
                    open: true,
                    opt: btn,
                })
                break
            case 'dropdown':
                setDropdown(!dropdown)
                break
            default:
                history.push(`/${btn}`)
        }
    }

    return (
        <nav className={`flex justify-center item-center w-full fixed ${shadow}`} style={{ backgroundColor: `rgb(32, 118, 155, ${offset * 5})` }}>
            <div className="container">
                <div className="flex justify-center md:justify-between items-center w-full h-full">
                    <Link to="/">
                        <img src={Logo} alt="The Journey" />
                    </Link>
                    <ul className="hidden md:flex items-center justify-center">
                        {user ? (
                            <>
                                {dropdown && (
                                    <li>
                                        <div className={style.dropdown}>
                                            <ul>
                                                <li id="btn-profile" onClick={handleBtn}>
                                                    <img src={IconUser} className={style.dropdownIcon} alt="Add Product" />
                                                    <span id="btn-profile">My Profile</span>
                                                </li>
                                                <li id="btn-write" onClick={handleBtn}>
                                                    <img src={IconWrite} className={style.dropdownIcon} alt="Add Product" />
                                                    <span id="btn-write">New Journey</span>
                                                </li>
                                                <li id="btn-bookmark" onClick={handleBtn}>
                                                    <img src={IconBookmark} className={style.dropdownIcon} alt="Add Product" />
                                                    <span id="btn-bookmark">Bookmark</span>
                                                </li>
                                                <hr />
                                                <li id="btn-logout" onClick={handleBtn}>
                                                    <img src={IconLogout} className={style.dropdownIcon} alt="Logout" />
                                                    <span id="btn-logout">Logout</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                )}
                                <li className="hover:shadow-lg rounded-full">
                                    <img id="btn-dropdown" className={style.user} src={user.image} alt={user?.fullName} onClick={handleBtn} />
                                </li>
                            </>
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
