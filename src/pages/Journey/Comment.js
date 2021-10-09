import { useEffect, useState } from 'react'
import { api } from '../../config/api'

export default function Comment({ id, user, comments }) {
    const [list, setList] = useState([])
    const [comment, setComment] = useState()

    useEffect(() => {
        if (list.length === 0 && comments)
            comments?.forEach((item) => {
                setList((e) => [...e, item])
            })
    }, [list, comments])

    const onChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        api.post(`/journey/${id}/comment`, {
            comment,
        })
            .then((res) => {
                setList((e) => [
                    ...e,
                    {
                        comment,
                        user: {
                            id: user.id,
                            fullName: user.fullName,
                            image: user.image,
                        },
                    },
                ])
                setComment('')
            })
            .catch((err) => err)
    }

    return (
        <div className="antialiased mx-auto w-full">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

            {user && (
                <div className="flex mx-auto items-center justify-center shadow-lg mx-8 mb-4 max-w-lg">
                    <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                <textarea
                                    name="comment"
                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                    placeholder="Type Your Comment"
                                    value={comment}
                                    maxLength="255"
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="w-full md:w-full flex items-start md:w-full px-3">
                                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"></div>
                                <div className="-mr-1">
                                    <button type="submit" className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100">
                                        Submit Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {list.map((item) => (
                    <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                            <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src={item.user?.image} alt="" />
                        </div>
                        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                            <strong>{item.user?.fullName}</strong>
                            <p className="text-sm">{item.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
