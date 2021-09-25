import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { api } from '../config/api'
import { formatDate } from '../functions'

export default function Journey() {
    const { id } = useParams()
    const [article, setArticle] = useState()

    useEffect(() => {
        if (id) {
            api.get('/journey/' + id).then((res) => setArticle(res.data.data))
        }
    }, [id])

    return (
        <div className="container flex justify-center flex-col pb-12">
            <div className="px-2 md:px-16 flex justify-center flex-col mt-16">
                <div>
                    <div className="mt-2 mb-5 flex flex-col md:flex-row md:justify-between">
                        <h5 className="text-blue-500">{formatDate(article?.createdAt)}</h5>
                        <h5 className="flex flex-row gap-1 text-pink-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {article?.seen}
                        </h5>
                        <h5 className="font-bold text-gray-500 ">Written By {article?.user.fullName}</h5>
                    </div>
                    <h3 className="mb-12 text-4xl font-extrabold text-gray-500 font-sans">{article?.title} </h3>
                    <article>{article && parse(article.description)}</article>
                </div>
            </div>
        </div>
    )
}
