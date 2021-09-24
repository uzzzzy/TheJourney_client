import { useEffect, useState } from 'react'
import parse from 'html-react-parser'

import { api } from '../config/api'
import { formatDate } from '../functions'

import style from '../styles/pages/Landing.module.css'

export default function Landing() {
    const [journeys, setJourneys] = useState()
    const [search, setSearch] = useState('')

    useEffect(() => {
        // if (search || search === '') {
        if (!journeys) {
            fetchJourneys()
        }
        // }
    }, [journeys])

    const fetchJourneys = () => {
        setJourneys()
        const query = {
            limit: 4,
        }

        if (search.length > 0) query.params = { search }

        console.log(query)

        api.get('/journeys', query)
            .then((res) => {
                setJourneys(res.data.data.journeys)
            })
            .catch((err) => err)
    }

    const handleSearch = (e) => {
        const str = e.target.value.length > 0 ? e.target.value : ''
        setSearch(str)
    }

    const getImg = (str) => {
        var src = str.match(/<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/)
        if (src) return src[1]
        else return null
    }

    return (
        <div className="pt-24">
            {!localStorage.token && (
                <section className="-mt-24">
                    <img className={style.jumbotron} src="http://localhost:5000/uploads/jumbotron.jpg" alt="Jumbotron" />
                </section>
            )}

            <section className={style.journeys}>
                <div className="container">
                    <h1>Journey</h1>
                    <Search handleSearch={handleSearch} fetchJourneys={fetchJourneys} />
                </div>
            </section>

            <section className="w-full flex justify-center px-4 sm:px-6 lg:px-4  mb-12">
                <article className="container">
                    <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 ">
                        {journeys?.map((item) => (
                            <article key={item.id} className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 ">
                                <img src={getImg(item.description)} alt="journey" className="w-full h-60 object-center object-cover rounded-lg" />

                                <div className="px-3 py-4 ">
                                    <h1 className="text-lg font-extrabold capitalize">{item.title}</h1>
                                    <h3 className="text-sm text-gray-300 font-semibold font-mono pb-4 my-1 ">{formatDate(item.createdAt)}</h3>
                                    <div className="h-40 overflow-ellipsis overflow-hidden"> {parse(item.description.replace(/<img[^>]*>/g, ''))}</div>
                                </div>
                            </article>
                        ))}
                    </section>
                </article>
            </section>
        </div>
    )
}

function Search({ handleSearch, fetchJourneys }) {
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
