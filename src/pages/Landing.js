import { useEffect, useState } from 'react'
import { api } from '../config/api'

import parse from 'html-react-parser'

import style from '../styles/pages/Landing.module.css'

export default function Landing() {
    const [desc, setDesc] = useState()

    useEffect(() => {
        api.get('/journey/2')
            .then((res) => setDesc(res.data.data.description))
            .catch((err) => err)
    }, [])

    return (
        <div>
            <section>
                <img className={style.jumbotron} src="http://localhost:5000/uploads/jumbotron.jpg" alt="Jumbotron" />
            </section>
            <section className="container">{desc && parse(desc)}</section>
        </div>
    )
}
