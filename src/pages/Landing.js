import { useEffect, useState } from 'react'

import { api, path } from '../config/api'

import style from '../styles/pages/Landing.module.css'
import CardJourney from '../components/CardJourney'

let offset = 0
let count = 0
let limit = 4
let order = 'createdAt,desc'

let query = {
    params: {
        offset,
        limit,
        order,
    },
}

export default function Landing() {
    const [journeys, setJourneys] = useState()
    const [search, setSearch] = useState()
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        if (!journeys) {
            offset = 0
            count = 0
            query = {
                params: {
                    offset,
                    limit,
                    order,
                },
            }

            api.get('/journeys', query)
                .then((res) => {
                    setJourneys(res.data.data.journeys)
                    count = res.data.data.count
                })
                .catch((err) => err)
        }

        if (refetch) {
            setRefetch(false)
        }
    }, [journeys, refetch])

    const fetchJourneys = (str) => {
        offset = 0
        count = 0
        query = {
            params: {
                offset,
                limit,
                order,
            },
        }

        const config = query

        if (str) {
            setSearch(str)
            config.params = { ...config.params, search: str }
        } else {
            setSearch()
        }

        api.get('/journeys', query)
            .then((res) => {
                count = res.data.data.count
                setJourneys(res.data.data.journeys)
                setRefetch(true)
            })
            .catch((err) => err)
    }

    const loadMore = () => {
        if (count - offset - limit > 0) {
            offset += limit
            const config = {
                params: {
                    offset,
                    limit,
                    order,
                },
            }

            if (search) {
                config.params = { ...config.params, search: search }
            }

            api.get('/journeys', config).then((res) => {
                const data = journeys
                count = res.data.data.count
                res.data.data.journeys.forEach((item, i) => {
                    setTimeout(() => {
                        data.push(item)
                        setRefetch(true)
                    }, i * 500)
                })
            })
        }
    }

    const handleSort = (e) => {
        console.log(e.target.value)
    }

    return (
        <div className="pt-24 mb-48">
            {!localStorage.token && (
                <section className="-mt-24">
                    <img className={style.jumbotron} src={'http://' + path + '/uploads/jumbotron.jpg'} alt="Jumbotron" />
                </section>
            )}

            <section className={style.journeys}>
                <div className="container px-5 lg:px-0">
                    <h1>Journey</h1>
                    <Search fetchJourneys={fetchJourneys} />

                    <div className="relative inline-flex w-full justify-end">
                        <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                            <path
                                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                fill="#648299"
                                fillRule="nonzero"
                            />
                        </svg>
                        <select className="border border-gray-300 capitalize rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={handleSort}>
                            <option value="new">Newest</option>
                            <option value="old">Oldest</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="w-full flex justify-center px-4 sm:px-6 lg:px-4  mb-12">
                <div className="container">
                    <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 ">
                        {journeys?.map((item, i) => (
                            <CardJourney key={item.id} item={item} />
                        ))}
                    </section>
                </div>
            </section>
            {count - offset - limit > 0 && (
                <button className="w-full" onClick={loadMore}>
                    Load More
                </button>
            )}
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
