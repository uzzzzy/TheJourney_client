import { useState } from 'react'
import { FormLeft, FormRight } from '../../assets'
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
        setError()

        let config = {
            email: form.email.toLowerCase(),
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
                setModal({
                    open: true,
                    opt: 'success',
                    message: `${opt} was Successful. You can use our services!`,
                })
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
            <img className="absolute -top-7 -left-28 h-40" src={FormLeft} alt="bg-left" />
            <img className="absolute -top-16 -right-28 h-56" src={FormRight} alt="bg-right" />
            <div
                className="absolute md:hidden right-1 top-2 text-white"
                onClick={() => {
                    setModal()
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </div>
            <h2>{opt}</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
                    <strong className="font-bold">{error}</strong>
                </div>
            )}

            {opt === 'register' && (
                <>
                    <label htmlFor="fullName">Full Name</label>
                    <input className="form-control" id="fullName" name="fullName" onChange={handleOnChange} required />
                </>
            )}
            <label htmlFor="email">Email</label>
            <input className="form-control" id="email" name="email" onChange={handleOnChange} required />

            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" name="password" type="password" onChange={handleOnChange} required />
            {opt === 'register' && (
                <>
                    <label htmlFor="phone">Phone</label>
                    <input className="form-control" id="phone" name="phone" onChange={handleOnChange} required />
                    <label htmlFor="address">Address</label>
                    <textarea id="address" name="address" onChange={handleOnChange} required />
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
