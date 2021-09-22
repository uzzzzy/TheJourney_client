import { useState } from 'react'
import { api } from '../../config/api'

import style from '../../styles/components/Modal/Form.module.css'

export default function Form({ opt, setModal, setToken }) {
    const [error, setError] = useState()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const changeModal = () => {
        opt === 'login'
            ? setModal((prevState) => ({
                  ...prevState,
                  opt: 'register',
              }))
            : setModal((prevState) => ({
                  ...prevState,
                  opt: 'login',
              }))
    }

    const handleOnChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let config = {
            email: form.email,
            password: form.password,
        }

        if (opt === 'register') {
            config = {
                ...config,
                fullName: form.fullName,
                phone: form.phone,
                address: form.address,
            }
        }

        api.post(`/${opt}`, config)
            .then((res) => {
                localStorage.token = res.data.token
                setToken(res.data.token)
            })
            .catch((err) =>
                // setError(err.response.data.message)
                setError(err.response.data.message)
            )
    }

    return (
        <form className={style.modalForm} onSubmit={handleSubmit}>
            <h2>{opt}</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
                    <strong className="font-bold">{error}</strong>
                </div>
            )}

            {opt === 'register' && (
                <>
                    <label htmlFor="fullName">Full Name</label>
                    <input className="form-control" id="fullName" name="fullName" onChange={handleOnChange} />
                </>
            )}
            <label htmlFor="email">Email</label>
            <input className="form-control" id="email" name="email" onChange={handleOnChange} />

            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" name="password" type="password" onChange={handleOnChange} />
            {opt === 'register' && (
                <>
                    <label htmlFor="phone">Phone</label>
                    <input className="form-control" id="phone" name="phone" onChange={handleOnChange} />
                    <label htmlFor="address">Address</label>
                    <textarea id="address" name="address" onChange={handleOnChange} />
                </>
            )}

            <button>{opt}</button>

            <p>
                {opt === 'register' ? "Dont't Have an account" : 'Already have an account'} ? Click{' '}
                <b onClick={changeModal} style={{ cursor: 'pointer' }}>
                    Here
                </b>
            </p>
        </form>
    )
}
