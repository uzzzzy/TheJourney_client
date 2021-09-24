import { useHistory } from 'react-router-dom'

export default function Logout({ setModal, setToken }) {
    let history = useHistory()

    const handleBtn = (e) => {
        if (e.target.id === 'yes') {
            localStorage.removeItem('token')
            setToken()
            setModal()
            history.push('/')
        } else {
            setModal()
        }
    }
    return (
        <div className="bg-white rounded-lg">
            <div className="w-96 border-t-8 border-red-600 rounded-lg flex">
                <div className="w-full pt-9 px-4">
                    <h3 className="font-bold text-red-700">Logout?</h3>
                    <p className="py-4 text-sm text-gray-400">
                        Are you sure you want to logout?
                        {/* If you delete your feelings, you will permantly loose everything. */}
                    </p>
                </div>
            </div>
            <div className="p-4 flex space-x-4">
                <button id="no" onClick={handleBtn} className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">
                    Cancel
                </button>
                <button id="yes" onClick={handleBtn} className="w-1/2 px-4 py-3 text-center text-red-100 bg-red-600 rounded-lg hover:bg-red-700 hover:text-white font-bold text-sm">
                    Log Out
                </button>
            </div>
        </div>
    )
}
