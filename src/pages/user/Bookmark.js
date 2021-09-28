import { useEffect, useState } from 'react'
import CardJourney, { CardJourneyLoad } from '../../components/CardJourney'
import { api } from '../../config/api'

export default function Bookmark({ user, setModal }) {
    const [loading, setLoading] = useState('init')
    const [data, setData] = useState({
        count: 0,
        journeys: [],
    })

    const { journeys } = data

    useEffect(() => {
        if (loading) {
            if (loading === 'init')
                api.get('/bookmarks')
                    .then((res) => {
                        const { count, bookmarks } = res.data.data
                        setData((e) => ({ ...e, count }))

                        bookmarks.forEach((bm, i) => {
                            setTimeout(() => {
                                setData((d) => ({ ...d, journeys: [...d.journeys, bm.journey] }))
                            }, i * 1000)
                        })
                        setTimeout(() => {
                            setLoading('done')
                        }, bookmarks.length * 1000 - 1100)
                    })
                    .catch((err) => err)

            if (loading === 'init') setLoading('fetching')
        }
    }, [loading])

    return (
        <section className="w-full flex justify-center px-4 sm:px-6 lg:px-4  mb-12">
            <div className="container">
                <h2 className="mt-20 lg:mb-40 text-4xl font-extrabold text-gray-900">Bookmark</h2>
                <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 ">
                    {journeys?.map((item, i) => (
                        <CardJourney key={item.id} item={item} user={user} />
                    ))}

                    {loading === 'fetching' && <CardJourneyLoad />}
                </section>
            </div>
        </section>
    )
}
