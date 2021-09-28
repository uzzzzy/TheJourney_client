import style from '../../styles/components/Modal.module.css'
import Form from './Form'
import Logout from './Logout'
import Success from './Success'

export default function modal({ modal, setModal, setToken, setUser }) {
    const { opt, message } = modal

    const closeModal = (e) => {
        if (e.target.id === 'modal') setModal({ modal: false })
    }

    const HandleOpt = () => {
        let modalContent
        switch (opt) {
            case 'register':
            case 'login':
                modalContent = <Form opt={opt} setModal={setModal} setToken={setToken} />
                break
            case 'success':
                modalContent = <Success message={message} />
                break
            case 'logout':
                modalContent = <Logout setModal={setModal} setToken={setToken} setUser={setUser} />
                break

            default:
                modalContent = 'Modal'
        }
        return modalContent
    }

    return (
        <div id="modal" className={style.modal} onClick={closeModal}>
            <HandleOpt />
        </div>
    )
}
