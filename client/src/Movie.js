import React from 'react';
import {Link} from 'react-router-dom';
import defaultImage from './data/camera-2008489_1280.png'

const Movie = (props) => {
    const {Poster, Title, Director, imdbID} = props;

    let image = Poster !== 'N/A' ? Poster : defaultImage;

    return (
                <Link to={`/movie/${imdbID}`} style={{textDecoration:"none"}}>
        <div className='movieContainer'>
            <div className='imageBox'>
                <img src={image} alt="" />
            </div>
            <div className='movieData'>
                <h1> {Title} </h1>
            </div>
        </div>
                </Link>
    )
}

export default Movie
