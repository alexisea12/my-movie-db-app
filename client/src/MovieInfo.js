import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { sendRequest } from './Request'
const MovieInfo = () => {
    const [info, setInfo] = useState([])
    const {imdbID} = useParams()
    useEffect( async ()=>{
        sendRequest('GET', 'http://localhost:3023/get/request/all').then(e=>{
            setInfo(Object.values(e).filter(e=> e.imdbID === imdbID))
        })
    }, [imdbID])
    console.log(info);
    return (
        <div className='movieInfo'>
                {info.length > 0 
                &&
            <div className='movieInfoBox'>
                <div className='moviePoster'>
                    <img src={info[0].Poster} alt="" />
                </div>
                <section className='data'>
                    <div className='infoBox'>
                    <h3 className='title'>
                        {info[0].Title}
                    </h3>
                    <p> <span className='spanInfo'>Directed by: </span> {info[0].Director} </p>
                    <p> <span>Plot: </span>
                        {info[0].Plot}
                    </p>
                    <p> <span className='spanInfo'>Year </span> {info[0].Year}</p>
                    <p><span className='spanInfo'>Cast: </span> {info[0].Actors} </p>
                    <p> <span>Genere: </span> {info[0].Genre} </p>
                    </div>

                    <div className='rating'>
                    <h4>imdbRating: </h4>
                    <h1>{info[0].imdbRating}</h1>
                    </div>

                </section>                
            </div>
                }
        </div>
    )
}



export default MovieInfo
