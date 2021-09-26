import { useEffect, useState } from 'react'

import { api, path } from '../config/api'

import style from '../styles/pages/Landing.module.css'
import CardJourney from '../components/CardJourney'

export default function Landing({ user, setModal }) {
    const [fetch, setFetch] = useState('init')
    const [params, setParams] = useState({
        search: '',
        offset: 0,
        limit: 4,
        order: 'createdAt,desc',
    })

    const [response, setResponse] = useState({
        count: 0,
        journeys: [],
    })

    const { count, journeys } = response
    const { offset, limit } = params

    useEffect(() => {
        if (params && fetch === 'init') {
            let config = params
            config = { ...config, offset: 0 }
            api.get('/journeys', {
                params: config,
            })
                .then((res) => {
                    setParams(config)
                    setResponse({
                        count: res.data.data.count,
                        journeys: res.data.data.journeys,
                    })
                })
                .catch((err) => err)
            setFetch('done')
        }

        if (params && fetch === 'loadMore') {
            api.get('/journeys', {
                params,
            }).then((res) => {
                res.data.data.journeys.forEach((item, i) => {
                    setTimeout(() => {
                        setResponse((e) => ({
                            ...e,
                            journeys: [...e.journeys, item],
                        }))
                    }, i * 1000)
                })

                setTimeout(() => {
                    console.log('done')
                    setFetch('done')
                }, res.data.data.journeys.length * 1000 - 1000)
            })
        }

        if (fetch) {
        }
    }, [params, fetch])

    const loadMore = () => {
        setParams((e) => ({ ...e, offset: offset + limit }))
        setFetch('loadMore')
    }

    const handleSort = (e) => {
        switch (e.target.value) {
            case 'old':
                setParams((e) => ({ ...e, order: 'createdAt,asc' }))
                break
            default:
                setParams((e) => ({ ...e, order: 'createdAt,desc' }))
        }
        setParams((e) => ({ ...e, offset: 0 }))
        setFetch('init')
    }

    return (
        <div className="pt-32 mb-48">
            {!localStorage.token && (
                <section className="-mt-32">
                    <div className="flex px-3 justify-center">
                        <div className="container -mb-96 z-10">
                            <h1 className="text-2xl md:text-6xl mt-40 text-white font-bold">
                                The Journey you <br /> ever dreamed of.
                            </h1>
                            <h3 className="text-lg md:text-2xl text-white">
                                We made a tool so you can easily keep & share your travel memories.
                                <br /> But there is a lot more
                            </h3>
                        </div>
                    </div>
                    <img className={style.jumbotron} src={'http://' + path + '/uploads/jumbotron.jpg'} alt="Jumbotron" />
                </section>
            )}

            <section className={style.journeys}>
                <div className="container px-5 lg:px-0">
                    <h1>Journey</h1>
                    <Search setParams={setParams} setFetch={setFetch} />

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
                            <CardJourney key={item.id} item={item} user={user} setModal={setModal} />
                        ))}
                    </section>
                </div>
            </section>
            {count - offset - limit > 0 && fetch === 'done' ? (
                <button className="w-full" onClick={loadMore}>
                    Load More
                </button>
            ) : (
                fetch === 'loadMore' && (
                    <div className="w-full flex justify-center">
                        <svg fill="none" className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z" fill="currentColor" fillRule="evenodd" />
                        </svg>
                        <div>Loading ...</div>
                    </div>
                )
            )}
        </div>
    )
}

function Search({ setParams, setFetch }) {
    const handleSearch = (e) => {
        const str = e.target.value.length > 0 ? e.target.value : ''
        setParams((e) => ({ ...e, search: str, offset: 0 }))
    }

    return (
        <div className="w-auto h-10 pl-3 pr-2 m-10 bg-white border rounded-full flex justify-between items-center relative">
            <input type="search" name="search" id="search" placeholder="Search" className="appearance-none w-full outline-none focus:outline-none active:outline-none" onChange={handleSearch} />
            <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none flex flex-row gap-2 bg-blue-300 px-2  rounded-full text-white" onClick={() => setFetch('init')}>
                search
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
    )
}
