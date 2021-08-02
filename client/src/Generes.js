import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { sendRequest } from './Request'
import Movie from './Movie'

/*
sendRequest('GET', 'http://localhost:3023/get/request/all').then(e=>{
            const generes = new Set(Object.values(e).map(a=> a.Genre.split(', ')).reduce((acc, curr)=>{
                acc.push(...curr);
                return acc
            }));
            
            console.log(generes);
        })
*/

const Generes = () => {
    const {genere} = useParams();
    const [movies, setMovies] = useState([]);
    console.log(genere);
    useEffect(async ()=>{
        sendRequest('GET', 'http://localhost:3023/get/request/all').then(e=>{
            const moviesFound = Object.values(e).filter((a)=>{
                const values = a.Genre.split(',').map(f=> f.trim());
                //console.log(values);
                if(values.find(v=> v === genere)) return a;
            })
            console.log(moviesFound);
            setMovies(moviesFound)
        })
    }, [])

    return (
        <div className='generes'>
            <h1>
            {genere}
            </h1>
            <section className='generesContainer'>
            {Object.values(movies).length > 0 && Object.values(movies).map(e=> < Movie {...e} key={e.imdbID} /> )}
            </section>
        </div>
    )
}

export default Generes
