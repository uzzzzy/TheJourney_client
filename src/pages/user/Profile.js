import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardJourney, { CardJourneyLoad } from '../../components/CardJourney'
import { api } from '../../config/api'

export default function Profile({ user, setUser, setModal }) {
    const [loading, setLoading] = useState('init')
    const [data, setData] = useState({
        fullName: '',
        email: '',
        address: '',
        image: '',
        journeys: [],
    })

    const [count, setCount] = useState({
        journeys: 0,
        views: 0,
        bookmarks: 0,
    })

    const { id } = useParams()
    const { journeys } = data

    useEffect(() => {
        if (loading) {
            if (loading === 'init')
                api.get('/user/' + (id ? id : user?.id)).then((res) => {
                    let bmTemp = 0
                    let vTemp = 0

                    const { user: u } = res.data.data

                    setData((e) => ({ ...e, id: u.id, fullName: u.fullName, email: u.email, address: u.address, image: u.image }))

                    if (loading) {
                        u.journeys.forEach((j, i) => {
                            bmTemp += j.bookmarks.length
                            vTemp += j.seen
                            setTimeout(() => {
                                setData((d) => ({ ...d, journeys: [...d.journeys, j] }))
                            }, i * 1000)
                        })
                        setTimeout(() => {
                            setLoading('done')
                        }, u.journeys.length * 1000 - 1100)

                        setCount({
                            journeys: u.journeys.length,
                            views: vTemp,
                            bookmarks: bmTemp,
                        })
                    }
                })
            if (loading === 'init') setLoading('fetching')
        }
    }, [user, id, loading, data])

    const handleOnChange = (e) => {
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])

            let formData = new FormData()
            if (e.target.files[0]) {
                formData.append('image', e.target.files[0])
            }

            api.patch('/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    setUser((e) => ({ ...e, image: url }))
                    setData((e) => ({ ...e, image: url }))
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                    }
                })
        }
    }

    return (
        <div className="container">
            <h2 className="mt-20 mx-4 lg:mx-0 lg:mb-40 text-4xl font-extrabold text-gray-900">Profile</h2>
            <div className="mt-24 font-sans w-full flex flex-row justify-center items-center">
                <div className=" w-96 bg-white shadow-xl hover:shadow rounded-lg relative">
                    <label htmlFor="image" className="text-red-500 cursor-pointer">
                        {user?.id === data.id && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-16 right-28" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                        )}
                        <img className="w-48 h-48 bg-gray-200 mx-auto rounded-full -mt-20 border-8 border-white object-cover" src={data?.image} alt="" />
                    </label>
                    {user?.id === data.id && <input id="image" name="image" type="file" className="hidden" onChange={handleOnChange} />}
                    <div className="text-center mt-2 text-3xl font-extrabold">{data?.fullName}</div>
                    <div className="text-center mt-2 font-light text-sm">{data?.email}</div>
                    <div className="px-6 text-center my-2 font-light text-sm">
                        <p>{data?.address}</p>
                    </div>
                    <div className="grid grid-cols-3 divide-x-2 font-bold text-center">
                        <h2>JOURNEYS</h2>
                        <h2>VIEWS</h2>
                        <h2>BOOKMARK</h2>
                    </div>
                    <div className="grid grid-cols-3 divide-x-2 mb-5 text-center">
                        <h2>{count.journeys} </h2>
                        <h2>{count.views} </h2>
                        <h2>{count.bookmarks} </h2>
                    </div>
                </div>
            </div>

            <section className="w-full flex justify-center px-4 sm:px-6 lg:px-4  mb-12">
                <div className="container">
                    <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 ">
                        {journeys?.map((item, i) => (
                            <CardJourney key={item.id} item={item} user={user} setModal={setModal} />
                        ))}

                        {loading === 'fetching' && <CardJourneyLoad />}
                    </section>
                </div>
            </section>
        </div>
    )
}
