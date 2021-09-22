import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Modal from './components/modals'
import Navbar from './components/Navbar'
import { api, setAuthToken } from './config/api'

import Landing from './pages/Landing'

import './styles/App.css'

function App() {
    const [token, setToken] = useState()
    const [user, setUser] = useState()
    const [modal, setModal] = useState()

    useEffect(() => {
        if (token || localStorage.token) {
            console.log('token exists', localStorage.token)

            setAuthToken(localStorage.token)
            api.post('/verify')
                .then((res) => {
                    setUser(res.data.data.user)
                })
                .catch((err) => {
                    localStorage.removeItem('token')
                })
        } else {
            setUser()
            setAuthToken()
        }
    }, [token])

    return (
        <Router>
            <Navbar setModal={setModal} user={user} />

            <Route exact path="/">
                <Landing />
            </Route>

            {modal?.open && <Modal modal={modal} setModal={setModal} setToken={setToken} />}
        </Router>
    )
}

export default App
