import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { api, setAuthToken } from './config/api'

import Modal from './components/modals'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

import Landing from './pages/Landing'
import Journey from './pages/Journey'
import Profile from './pages/user/Profile'
import Write from './pages/user/Write'

import './styles/App.css'
import Loading from './components/Loading'

function App() {
    const [login, setLogin] = useState()
    const [token, setToken] = useState()
    const [user, setUser] = useState()
    const [modal, setModal] = useState()

    useEffect(() => {
        if (token || localStorage.token) {
            setLogin(undefined)
            if (!localStorage.token) localStorage.token = token
            setAuthToken(localStorage.token)
            api.post('/verify')
                .then((res) => {
                    setTimeout(() => {
                        setLogin(true)
                        setUser(res.data.data.user)
                    }, 3000)
                })
                .catch((err) => {
                    setLogin(false)
                    localStorage.removeItem('token')
                    setToken()
                })
            console.log('token set')
        } else {
            setLogin(false)
            setToken()
            setUser()
            setAuthToken()
        }
    }, [token])

    return (
        <Router>
            <Navbar user={user} setModal={setModal} />

            <Route exact path="/" user={user}>
                {login !== undefined ? <Landing user={user} setModal={setModal} /> : <Loading />}
            </Route>
            <div className="flex justify-center content">
                <Route path="/journey/:id" user={user} component={Journey} />
                <PrivateRoute path="/profile" user={user} component={Profile} />
                <PrivateRoute path="/write" user={user} component={Write} />
            </div>
            {modal?.open && <Modal modal={modal} setModal={setModal} setToken={setToken} setUser={setUser} />}
        </Router>
    )
}

export default App
