import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { api, setAuthToken } from './config/api'

import Modal from './components/modals'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Loading from './components/Loading'

import Landing from './pages/Landing'
import Journey from './pages/Journey'
import Profile from './pages/user/Profile'
import Write from './pages/user/Write'
import NotFound from './pages/NotFound'
import Bookmark from './pages/user/Bookmark'

import './styles/App.css'

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
            <div className="flex justify-center content">
                <Switch>
                    <Route exact path="/">
                        {login !== undefined ? <Landing user={user} setModal={setModal} /> : <Loading />}
                    </Route>
                    <Route path="/journey/:id">{login !== undefined ? <Journey user={user} setModal={setModal} /> : <Loading />}</Route>
                    <Route path="/user/:id">{login !== undefined ? <Profile user={user} setModal={setModal} /> : <Loading />}</Route>

                    <PrivateRoute path="/profile" user={user} setUser={setUser} component={Profile} />
                    <PrivateRoute path="/bookmark" user={user} setModal={setModal} component={Bookmark} />
                    <PrivateRoute path="/write" user={user} component={Write} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            {modal?.open && <Modal modal={modal} setModal={setModal} setToken={setToken} setUser={setUser} />}
        </Router>
    )
}

export default App
