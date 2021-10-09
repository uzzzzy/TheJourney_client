import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '../../config/api'
import Article from './Article'
import Comment from './Comment'

export default function Journey({ user, setModal }) {
    const [bm, setBM] = useState(false)
    const { id } = useParams()
    const [article, setArticle] = useState()

    useEffect(() => {
        if (id) {
            api.get('/journey/' + id).then((res) => {
                setArticle(res.data.data)
                res.data.data.bookmarks.forEach((bookmark) => {
                    if (user?.id === bookmark.userId) setBM(true)
                })
            })
        }
    }, [id, user])

    return (
        <div className="container flex justify-center flex-col pb-12">
            <div className="px-2 md:px-16 flex justify-center flex-col mt-16">
                <Article id={id} article={article} user={user} bm={bm} setBM={setBM} setModal={setModal} />
                <Comment id={id} user={user} comments={article?.comments} />
            </div>
        </div>
    )
}