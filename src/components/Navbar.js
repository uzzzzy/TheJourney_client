import { Link, useHistory } from 'react-router-dom'

import style from '../styles/components/Navbar.module.css'

import Logo from '../assets/logo.svg'

import { IconBookmark, IconLogout, IconUser, IconWrite } from '../assets'

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
                if (offset < 0.2 || y < offset) setOffset((y < 0.2 ? y : 0.2) * 2.5)
            }

        if (offset > 0 || user) {
            setShadow('shadow-lg backdrop-filter backdrop-blur-sm')
        } else {
            setShadow()
        }
    }, [offset, user])

    const handleBtn = (e) => {
        setDropdown(false)
        const btn = e.target.id.split('-')[1]

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
        <nav className={`flex rounded-b-2xl md:rounded-none -bottom-0 justify-center px-5 lg:px-0 item-center w-full fixed ${shadow}`} style={{ backgroundColor: `rgb(32, 118, 155, ${offset + (user || offset > 0 ? 0.15 : 0)})` }}>
            <div className="container">
                <div className="flex justify-between items-center w-full h-full">
                    <Link to="/">
                        <img src={Logo} className="absolute z-50 top-5 md:static" alt="The Journey" />
                    </Link>

                    <div id="btn-dropdown" className={dropdown ? 'md:hidden text-black text-3xl z-50' : 'md:hidden text-white text-3xl z-50'} onClick={handleBtn}>
                        <svg id="btn-dropdown" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path id="btn-dropdown" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <ul className="hidden md:block md:flex items-center justify-center">
                        {user ? (
                            <>
                                {dropdown && (
                                    <li>
                                        <div className={style.dropdown}>
                                            <ul>
                                                <li id="btn-profile" onClick={handleBtn}>
                                                    <img src={IconUser} className={style.dropdownIcon} alt="button" />
                                                    <span id="btn-profile">My Profile</span>
                                                </li>
                                                <li id="btn-write" onClick={handleBtn}>
                                                    <img src={IconWrite} className={style.dropdownIcon} alt="button" />
                                                    <span id="btn-write">New Journey</span>
                                                </li>
                                                <li id="btn-bookmark" onClick={handleBtn}>
                                                    <img src={IconBookmark} className={style.dropdownIcon} alt="button" />
                                                    <span id="btn-bookmark">Bookmark</span>
                                                </li>
                                                <hr />
                                                <li id="btn-logout" onClick={handleBtn}>
                                                    <img id="btn-logout" src={IconLogout} className={style.dropdownIcon} alt="button" />
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
            {dropdown && (
                <div className=" md:hidden absolute z-40 h-screen w-screen bg-opacity-80 bg-blue-200 overflow-y-hidden bg-gradient-to-l from-white">
                    <div className="grid grid-cols-1 grid-rows-1 place-items-center h-full w-screen">
                        <div className="col-start-2 row-start-2 w-screen">
                            {user ? (
                                <div className="grid grid-flow-row justify-end grid-rows-2 gap-9 pr-5 mb-20">
                                    <div className="absolute w-full flex flex-col inset-x-0 top-32">
                                        <img id="btn-dropdown" className="mx-auto h-40 w-40 object-cover rounded-full" src={user.image} alt={user?.fullName} />
                                        <h2 className="mx-auto mt-5 font-bold text-xl">{user.fullName}</h2>
                                    </div>
                                    <button id="btn-profile" className=" w-80 flex justify-end p-2 text-gray-500 font-bold gap-2" onClick={handleBtn}>
                                        <span id="btn-profile" className="text-yellow-500">
                                            Profile
                                        </span>
                                        <img id="btn-profile" src={IconUser} alt="button" />
                                    </button>
                                    <button id="btn-write" className=" flex justify-end p-2 text-gray-500 font-bold gap-2" onClick={handleBtn}>
                                        <span id="btn-write" className="text-green-400">
                                            New Journey
                                        </span>
                                        <img id="btn-write" src={IconWrite} alt="button" />
                                    </button>
                                    <button id="btn-bookmark" className=" flex justify-end p-2 text-gray-500 font-bold gap-2" onClick={handleBtn}>
                                        <span id="btn-bookmark" className="text-blue-500">
                                            Bookmark
                                        </span>
                                        <img id="btn-bookmark" src={IconBookmark} alt="button" />
                                    </button>
                                    <button id="btn-logout" className=" flex justify-end     p-2 text-gray-500 font-bold gap-2" onClick={handleBtn}>
                                        <span id="btn-logout" className="text-red-500">
                                            Logout
                                        </span>
                                        <img id="btn-logout" src={IconLogout} alt="logout" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between px-5 gap-2 mb-20">
                                    <button id="btn-login" className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center w-full" onClick={handleBtn}>
                                        Login
                                    </button>

                                    <button id="btn-register" className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center w-full" onClick={handleBtn}>
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
