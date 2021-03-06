import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import parse from 'html-react-parser'

import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import FroalaEditor from 'react-froala-wysiwyg'
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView'

import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/plugins/code_beautifier.min.js'
import 'froala-editor/js/plugins/image_manager.min.js'

import { path, api } from '../../config/api'
import { formatDate } from '../../functions'

export default function Write({ user }) {
    const config = {
        heightMin: 300,
        heightMax: 500,
        placeholderText: '',
        toolbarSticky: false,
        imageSplitHTML: true,
        tabSpaces: 12,
        requestHeaders: {
            Authorization: 'Bearer ' + localStorage.token,
            'Content-Type': 'multipart/form-data; boundary=12345',
        },
        imageManagerPreLoader: 'https://i.pinimg.com/originals/d7/34/49/d73449313ecedb997822efecd1ee3eac.gif',
        imageManagerLoadURL: 'http://' + path + '/api/v1/images',
        imageManagerLoadMethod: 'GET',
        imageUploadParam: 'image',
        imageUploadURL: 'http://' + path + '/api/v1/image',
        imageUploadMethod: 'POST',
        imageManagerDeleteURL: 'http://' + path + '/api/v1/image',
        imageManagerDeleteMethod: 'DELETE',
        imageMaxSize: 10 * 1000 * 1000,
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        events: {
            'image.beforeUpload': function (files) {
                // Return false if you want to stop the image upload..
            },
            'image.uploaded': function (response) {
                // Image was uploaded to the server.
                // editor.file.insert(e.link)
                // return false
            },
            'image.inserted': function ($img, response) {
                // Image was inserted in the editor.
                // console.log($img[0])
                // $img[0].style = ''
            },
            'image.replaced': function ($img, response) {
                // Image was replaced in the editor.
            },
            'image.removed': function ($img) {},
            'image.error': function (error, response) {
                console.log('err', response)
            },
        },
    }

    let history = useHistory()
    const [title, setTitle] = useState('')
    const [html, setHtml] = useState('')
    const [preview, setPreview] = useState(false)

    const d = new Date()
    const datetime = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()

    const handleChange = (e) => {
        if (e.target?.id) {
            setTitle(e.target.value)
        } else {
            setHtml(e.replaceAll('fr-dib"', 'fr-dib fr-draggable mx-auto rounded-lg"'))
        }
    }

    const postJourney = () => {
        if (title.length > 0 && html.length > 5) {
            const description = html.replaceAll('fr-dib"', 'fr-dib fr-draggable mx-auto rounded-lg"')

            const data = {
                title,
                description,
            }

            api.post('/journey', data).then((res) => history.push('/profile'))
        }
    }

    return (
        <div className="container flex justify-center flex-col pb-12">
            <h1 className="text-4xl text-center md:text-left font-extrabold my-10">New Journey</h1>
            <button className="p-3 w-24 bg-blue-300 outline text-white font-bold hover:shadow-md place-self-center shadow-lg rounded-lg" onClick={() => setPreview(!preview)}>
                Preview
            </button>
            <div className={preview ? `px-16  flex justify-center flex-col hidden` : `px-1 md:px-16  flex justify-center flex-col`}>
                <label htmlFor="title" className="text-2xl font-bold my-2">
                    Title
                </label>
                <input id="title" className="px-5 py-2 mb-8 rounded-lg border-2 border-gray-300" onChange={handleChange} />
                <FroalaEditor tag="textarea" config={config} onModelChange={handleChange} />
            </div>
            <button className="px-4 py-3 my-5 mr-16 w-40 place-self-end bg-blue-600 hover:bg-blue-800 rounded-md text-white shadow-lg transform transition-transform font-bold " onClick={postJourney}>
                Post
            </button>
            {preview && (
                <div className="px-1 lg:px-16 flex justify-center flex-col mt-5">
                    <article>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <h3 className="text-3xl font-bold">{title ? title : '<notitle>'}</h3>
                        </div>
                        <h5 className="text-sm font-bold text-gray-500 my-2 mt-5">by: {user.fullName}</h5>
                        <h5 className="mb-5 text-md text-blue-500">{formatDate(datetime)}</h5>
                        <div>{parse(html)}</div>
                    </article>
                </div>
            )}
        </div>
    )
}
