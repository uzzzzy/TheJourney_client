import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import parse from 'html-react-parser'

import { formatDate } from '../functions'
import { api, path } from '../config/api'
import { IconBookmark, IconBookmarkFill } from '../assets'

export default function CardJourney({ item, user, setModal }) {
    const [bm, setBM] = useState(false)
    let history = useHistory()
    const { id } = item

    useEffect(() => {
        if (user) {
            const bookmark = item.bookmarks?.map(function (obj) {
                return obj.userId
            })

            bookmark.forEach((userId) => {
                userId === user.id && setBM(true)
            })
        } else {
            setBM(false)
        }
    }, [user, item.bookmarks])

    const getImg = (str) => {
        const imgRex = /<img.*?src="(.*?)"[^>]+>/g
        const images = []
        let img
        while ((img = imgRex.exec(str))) {
            images.push(img[1])
        }
        if (images.length > 0) return images[0]
        else return 'http://' + path + '/uploads/noimage.jpg'
    }

    const handleClick = (e) => {
        if (e.target.id === 'bookmark') {
            if (user) {
                if (bm === false) {
                    api.post('/bookmark', { id })
                } else {
                    api.delete('/bookmark/' + id)
                }
                setBM(!bm)
            } else {
                setModal({
                    open: true,
                    opt: 'login',
                })
            }
        } else {
            history.push(`/journey/${item.id}`)
        }
    }

    return (
        <div className=" bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 cursor-pointer flex flex-col hover:filter grayscale" onClick={handleClick}>
            <img src={getImg(item.description)} alt="journey" className="w-full h-60 md:h-60 object-center object-cover rounded-lg" />
            <div id="bookmark" className="rounded-full bg-white shadow-sm hover:shadow-xl h-12 w-12 place-self-end m-3 absolute flex justify-center">
                <img id="bookmark" className="h-8 mt-2" src={bm ? IconBookmarkFill : IconBookmark} alt="bookmark" />
            </div>
            <div className="px-3 py-4 bg-gradient-to-r from-blue-500 h-60 -mt-60 pr-10 md:pr-3 md:mt-0 md:from-transparent ">
                <h1 className="text-lg font-extrabold capitalize bg-white px-3 md:px-0 rounded-lg mt-1 text-blue-500 md:text-black h-8 truncate md:whitespace-normal md:h-auto">{item.title}</h1>
                <h3 className="text-sm text-gray-300 font-semibold font-mono pb-4 my-1 ">{formatDate(item.createdAt)}</h3>
                <div className="text-white md:text-black md:block h-24 overflow-ellipsis overflow-hidden"> {parse(item.description.replace(/<img[^>]*>/g, ''))}</div>
            </div>
        </div>
    )
}

export function CardJourneyLoad() {
    return (
        <div className=" bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 cursor-pointer flex flex-col">
            <div alt="journey" className="animate-pulse bg-blue-300 w-full h-60 md:h-60 object-center object-cover rounded-lg" />

            <div className="animate-pulse px-3 py-4 bg-gradient-to-r from-blue-500 h-60 -mt-60 md:mt-0 md:from-transparent">
                <h1 className="bg-blue-300 text-blue-300 text-lg font-extrabold capitalize">Loading...</h1>
                <h3 className="bg-blue-300 text-blue-300 text-sm font-semibold font-mono pb-4 my-1 ">Loading...</h3>
                <div className="bg-blue-300 text-white md:text-black md:block h-32 overflow-ellipsis overflow-hidden"></div>
            </div>
        </div>
    )
}
