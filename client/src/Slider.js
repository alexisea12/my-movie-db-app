import React from 'react'
import {useState, useEffect, useMemo} from 'react'
import horror from './data/horror.jpg'
import action from './data/war.jpg'
import sify from './data/science-fiction.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';

const arrowLeft = <FontAwesomeIcon icon={faAngleLeft} className='arrowPrev'/>
const arrowRight = <FontAwesomeIcon icon={faAngleRight} className='arrowNext'/>

const data = [
    {img: horror, genere: 'Horror'},
    {img: action, genere: 'Action'},
    {img: sify, genere: 'Sci-Fi'},
]

function createNegativeArrayProxy(array){
    return new Proxy(array,{
        get:(target, index)=>{
            index = +index;
            return target[index < 0 ? target.length + index : index ]
        },
        set:(target, index, val)=>{
            index=+index
            return target[index < 0 ? target.length + index: index] = val
        }
    })
}                                               

//const newData = createNegativeArrayProxy(data);
//console.log(Object.values(newData));

const Slider = () => {
    //const {movies} = props
    const [curr, setCurr] = useState(0);
    const [elements, setElements] = useState(data);
    console.log(elements);

    const newData = createNegativeArrayProxy(data);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurr(curr === elements.length-1 ? 0 : curr+1)
        }, 4000)

        return()=>{
            clearInterval(interval)
        }
    })
    
    const handleClick = (e)=>{
        e.preventDefault();
        if(e.target.name === 'Prev'){
            setCurr(curr === 0 ? elements.length-1 : curr-1)
        }
        if(e.target.name === 'Next'){
            setCurr(curr === elements.length-1 ? 0 : curr+1)
        }
    }

    return (
        <div className='slider-box'>
            <div className='slider-container'>
            { Object.values(newData).map((e, index)=> <Article {...e} classCode={
                index === curr ? 'activeSlide' : index === curr-1 ? 'previousSlide' : (curr === 0 && index === data.length-1) ? 'previousSlide': 'nextSlide'
            }
            />) }
            </div>
            <div className='controls'>
                <button className='prevSlide' name='Prev' onClick={handleClick} > {arrowLeft} </button>
                <button className='nextSlide' name='Next' onClick={handleClick}> {arrowRight} </button>
            </div>
        </div>
    )
}

const Article=(props)=>{
    const {img, genere, classCode} = props
    return (
        <Link to={`/genere/${genere}`} className={`slide ${classCode}`}>
            <img src={img} alt="" />
            <h4 className='sliderTitle'> {genere} </h4>
        </Link>
    )
}


export default Slider