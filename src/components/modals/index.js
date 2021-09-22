import style from '../../styles/components/Modal.module.css'
import Form from './Form'

export default function modal({ modal, setModal, setToken }) {
    const { opt } = modal

    const closeModal = (e) => {
        if (e.target.id === 'modal') setModal({ modal: false })
    }

    return (
        <div id="modal" className={style.modal} onClick={closeModal}>
            {(opt === 'login' || opt === 'register') && <Form opt={opt} setModal={setModal} setToken={setToken} />}
        </div>
    )
}
