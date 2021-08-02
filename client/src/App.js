import React from 'react'
import { useState, useEffect } from 'react'
import Movie from './Movie'
import MovieInfo from './MovieInfo.js'
import {SearchBar} from './SearchBar'
import { sendRequest } from './Request'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Slider from './Slider'
import Generes from './Generes'
import { Link } from 'react-router-dom'
import logo from './data/logo.png'

const App = () => {
    const handleClick=(e)=>{
        e.preventDefault()
    }

    return (
        
        <div className='mainContainer'>
            <Router>
            <div className='header-container'>
                <nav className='navBar'>
                <span className='imagenBox'>
                    <img src={logo} alt="" />
                </span>
                <SearchBar />
                </nav>
            </div>

                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path="/movie/:imdbID" children={ <MovieInfo /> }>
                    </Route>
                    <Route path="/genere/:genere" children={ <Generes /> } ></Route>
                </Switch>

            </Router>

            <footer className='footer'>
                <h3>
                @TheMovieProyect
                </h3>

            </footer>
        </div>
    )
}

/*
sendRequest('GET', 'http://localhost:3023/get/request/all').then(e=>{
            const generes = new Set(Object.values(e).map(a=> a.Genre.split(', ')).reduce((acc, curr)=>{
                acc.push(...curr);
                return acc
            }));
            
            console.log(generes);
        })
*/

const Home=()=>{
    const [movies, setMovies] = useState([]);
    const [tags, setTags] = useState([])
    const [number, setNumber] = useState(20)

    useEffect(async ()=>{
        sendRequest('GET', 'http://localhost:3023/get/request/all').then(e=>{
            setMovies(e)
            const generes = new Set(Object.values(e).map(a=> a.Genre.split(', ')).reduce((acc, curr)=>{
                acc.push(...curr);
                return acc
            }));
            //console.log([...generes].length);
            setTags([...generes]);
        })
    }, [])

    const handleClick =(e)=>{
        if(number < Object.values(movies).length){setNumber(number+20)};
    }

    return(
        <div className='home-body'>
            <div className='left-part'>
            <div className='slider'>
                {Object.values(movies).length > 0 && <Slider movies={Object.values(movies).slice(18,28)}/>}
            </div>
        <section className='moviesContainer'>
            {Object.values(movies).length > 0 && Object.values(movies).slice(0,number).map(e=> < Movie {...e} key={e.imdbID} /> )}

            </section>
            <button onClick={handleClick} className='showMore'>Show more</button>
            </div>

        <section className='right-part'>
            <div className='tagsContainer'>
                <h5> Movies by Genre </h5>
            <div className='tagsBox'>
            {tags.length > 0 && tags.map(e=> <span>
                <Link to={`./genere/${e}`} style={{textDecoration:"none"}} className='tagName'>

                    {e}

                </Link>
            </span> )}
            </div>
            </div>

        </section>
        </div>
    )
}

export default App
