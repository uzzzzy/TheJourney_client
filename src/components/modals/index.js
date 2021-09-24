import style from '../../styles/components/Modal.module.css'
import Form from './Form'
import Logout from './Logout'
import Success from './Success'

export default function modal({ modal, setModal, setToken, setUser }) {
    const { opt, message } = modal

    const closeModal = (e) => {
        if (e.target.id === 'modal') setModal({ modal: false })
    }

    return (
        <div id="modal" className={style.modal} onClick={closeModal}>
            {opt === 'login' || opt === 'register' ? <Form opt={opt} setModal={setModal} setToken={setToken} /> : opt === 'success' ? <Success message={message} /> : opt === 'logout' && <Logout setModal={setModal} setToken={setToken} setUser={setUser} />}
        </div>
    )
}
