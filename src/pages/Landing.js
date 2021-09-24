import { useEffect, useState } from 'react'

import { api } from '../config/api'

import style from '../styles/pages/Landing.module.css'
import CardJourney from '../components/CardJourney'

const query = {
    params: {
        limit: 4,
        order: 'createdAt,desc',
    },
}

export default function Landing() {
    const [journeys, setJourneys] = useState()

    useEffect(() => {
        // if (search || search === '') {
        if (!journeys) {
            api.get('/journeys', query)
                .then((res) => {
                    setJourneys(res.data.data.journeys)
                })
                .catch((err) => err)
        }
        // }
    }, [journeys])

    const fetchJourneys = (str) => {
        setJourneys()
        const config = query

        if (str) config.params = { ...config.params, search: str }

        console.log(config.params)
        api.get('/journeys', query)
            .then((res) => {
                setJourneys(res.data.data.journeys)
            })
            .catch((err) => err)
    }

    return (
        <div className="pt-24">
            {!localStorage.token && (
                <section className="-mt-24">
                    <img className={style.jumbotron} src="http://localhost:5000/uploads/jumbotron.jpg" alt="Jumbotron" />
                </section>
            )}

            <section className={style.journeys}>
                <div className="container px-5 lg:px-0">
                    <h1>Journey</h1>
                    <Search fetchJourneys={fetchJourneys} />
                </div>
            </section>

            <section className="w-full flex justify-center px-4 sm:px-6 lg:px-4  mb-12">
                <article className="container">
                    <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 ">
                        {journeys?.map((item) => (
                            <CardJourney key={item.id} item={item} />
                        ))}
                    </section>
                </article>
            </section>
        </div>
    )
}

function Search({ fetchJourneys }) {
    const handleSearch = (e) => {
        const str = e.target.value.length > 0 ? e.target.value : ''
        fetchJourneys(str)
    }
    return (
        <div className="w-auto h-10 pl-3 pr-2 m-10 bg-white border rounded-full flex justify-between items-center relative">
            <input type="search" name="search" id="search" placeholder="Search" className="appearance-none w-full outline-none focus:outline-none active:outline-none" onChange={handleSearch} />
            <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none" onClick={fetchJourneys}>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
    )
}
