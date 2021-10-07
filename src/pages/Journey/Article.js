import { useState } from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import { api, path } from '../../config/api'
import { formatDate } from '../../functions'

import { IconBookmark, IconBookmarkFill } from '../../assets'

export default function Article({ id, article, user, bm, setBM, setModal }) {
    const handleClick = (e) => {
        if (e.target.id === 'bookmark' && user) {
            let tempArr = article.bookmarks

            if (bm === false) {
                tempArr.push({ userId: user.id })
                api.post('/bookmark', { id })
            } else {
                tempArr.pop()
                api.delete('/bookmark/' + id)
            }
            setBM(!bm)
        } else {
            setModal({
                open: true,
                opt: 'login',
            })
        }
    }

    return (
        <article className="flex flex-col">
            <h3 className="text-4xl font-extrabold text-gray-700 font-sans">{article?.title} </h3>
            <div className="mt-5 flex flex-col md:flex-row md:justify-between">
                <h5 className="text-blue-500">{formatDate(article?.createdAt)}</h5>
                <div className="flex flex-row gap-5">
                    <h5 className="flex flex-row gap-1 text-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {article?.bookmarks.length}
                    </h5>
                    <h5 className="flex flex-row gap-1 text-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {article?.seen + 1}
                    </h5>
                </div>
                <h5 className="font-bold text-gray-500 ">
                    Written By
                    <Link to={'/user/' + article?.user.id}>{' ' + article?.user.fullName}</Link>
                </h5>
            </div>

            <hr className="border-4 border-gray-50 mt-5" />
            <img id="bookmark" className="text-green-500 min-w-0 mb-12 h-12 mx-0 -mt-3 cursor-pointer place-self-end" src={bm ? IconBookmarkFill : IconBookmark} alt="bookmark" onClick={handleClick} />
            <div>{article && parse(article.description.replace('192.168.1.5:5000', path))}</div>
        </article>
    )
}
