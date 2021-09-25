import { useHistory } from 'react-router-dom'
import parse from 'html-react-parser'

import { formatDate } from '../functions'
import { path } from '../config/api'

export default function CardJourney({ item }) {
    let history = useHistory()

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

    return (
        <div key={item.id} className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 cursor-pointer flex flex-col" onClick={() => history.push(`/journey/${item.id}`)}>
            <img src={getImg(item.description)} alt="journey" className="hover:animate-pulse w-full h-60 object-center object-cover rounded-lg" />
            <div className="rounded-full bg-white shadow-lg hover:bg-blue-300 hover:shadow-sm  h-12 w-12 place-self-end m-3 -mt-56 flex justify-center"></div>
            <div className="px-3 py-4 mt-40">
                <h1 className="text-lg font-extrabold capitalize">{item.title}</h1>
                <h3 className="text-sm text-gray-300 font-semibold font-mono pb-4 my-1 ">{formatDate(item.createdAt)}</h3>
                <div className="h-24 overflow-ellipsis overflow-hidden"> {parse(item.description.replace(/<img[^>]*>/g, ''))}</div>
            </div>
        </div>
    )
}
