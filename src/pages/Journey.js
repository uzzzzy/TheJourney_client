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
                    <div className="flex ">
                        <h3 className="text-4xl font-extrabold">{article?.title} </h3>
                    </div>
                    <h5 className="text-sm font-bold text-gray-500 my-2 mt-5">Written By {article?.user.fullName}</h5>
                    <h5 className="mb-5 text-md  text-blue-500">{formatDate(article?.createdAt)}</h5>
                    <article>{article && parse(article.description)}</article>
                </div>
            </div>
        </div>
    )
}
