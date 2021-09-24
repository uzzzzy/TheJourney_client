import { useHistory } from 'react-router-dom'
import parse from 'html-react-parser'

import { formatDate } from '../functions'

export default function CardJourney({ item }) {
    let history = useHistory()

    const getImg = (str) => {
        var src = str.match(/<img.+src=(?:"|')(.+?)(?:"|')(?:.+?)>/)
        if (src) return src[1]
        else return 'http://localhost:5000/uploads/noimage.jpg'
    }

    return (
        <div key={item.id} className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 cursor-pointer" onClick={() => history.push(`/journey/${item.id}`)}>
            <img src={getImg(item.description)} alt="journey" className="w-full h-60 object-center object-cover rounded-lg" />

            <div className="px-3 py-4 ">
                <h1 className="text-lg font-extrabold capitalize">{item.title}</h1>
                <h3 className="text-sm text-gray-300 font-semibold font-mono pb-4 my-1 ">{formatDate(item.createdAt)}</h3>
                <div className="h-40 overflow-ellipsis overflow-hidden"> {parse(item.description.replace(/<img[^>]*>/g, ''))}</div>
            </div>
        </div>
    )
}
