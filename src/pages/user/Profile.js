import { useEffect, useState } from 'react'
import CardJourney from '../../components/CardJourney'
import { api } from '../../config/api'

export default function Profile({ user }) {
    const [journeys, setJourneys] = useState()
    const [count, setCount] = useState({
        journeys: 0,
        bookmarks: 0,
    })

    useEffect(() => {
        api.get('/journeys', {
            params: {
                userId: user.id,
                order: 'createdAt,desc',
            },
        }).then((res) => {
            setCount((prev) => ({ ...prev, journeys: res.data.data.count }))
            setJourneys(res.data.data.journeys)
        })
    }, [user.id])
    return (
        <div className="container pt-48">
            <div className="font-sans w-full flex flex-row justify-center items-center">
                <div className=" w-96 bg-white shadow-xl hover:shadow rounded-lg">
                    <img className="w-48 h-48 bg-gray-200 mx-auto rounded-full -mt-20 border-8 border-white object-cover" src={user.image} alt="" />
                    <div className="text-center mt-2 text-3xl font-extrabold">{user.fullName}</div>
                    <div className="text-center mt-2 font-light text-sm">{user.email}</div>
                    {/* <div className="text-center font-normal text-lg"></div> */}
                    <div className="px-6 text-center my-2 font-light text-sm">
                        <p>{user.address}</p>
                    </div>
                    <div className="grid grid-cols-2 divide-x-2 font-bold text-center">
                        <h2>JOURNEY</h2>
                        <h2>BOOKMARK</h2>
                    </div>
                    <div className="grid grid-cols-2 divide-x-2 mb-5 text-center">
                        <h2>{count.journeys} </h2>
                        <h2>{count.bookmarks} </h2>
                    </div>
                </div>
            </div>

            <section className="w-full flex justify-center px-4 sm:px-6 lg:px-4  mb-12">
                <div className="container">
                    <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 ">
                        {journeys?.map((item, i) => (
                            <CardJourney key={item.id} item={item} />
                        ))}
                    </section>
                </div>
            </section>
        </div>
    )
}
