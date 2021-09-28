import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Loading from './Loading'

export default function PrivateRoute({ role: status, user, component: Component, ...rest }) {
    const role = status ? status : 'user'
    return (
        <Route
            {...rest}
            render={() => {
                if (localStorage.token && !user) return <Loading />
                else if (user?.status === role) {
                    return <Component user={user} {...rest} />
                } else {
                    return <Redirect to="/" />
                }
            }}
        />
    )
}
