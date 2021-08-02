import { useEffect, useState } from "react";
import { sendRequest } from './Request'
import { Link, useParams, useLocation } from 'react-router-dom';

export const SearchBar =(props)=>{
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('')

    const handleChange=(e)=>{
        setValue(e.target.value)
    }

    
    const checkClick=()=>{
        console.log('clicked!');
    }
    
    const handleClick=(e)=>{
        setValue('');
        setResults([]);
    }
    
    useEffect(()=>{
        value !== '' ? handleSearch(value) : setResults([])
        window.addEventListener('click', checkClick)
        return()=>{
            window.removeEventListener('click', checkClick)
        }
    }, [value])

    const handleSearch=(query)=>{
        console.log('activated');
        sendRequest('GET', `http://localhost:3023/get/search/${query}`).then(res=>{
            setResults(res);
        })
    };

    console.log(results);

    return(
        <div className='searchInput'>
            <div className='search-box'>
            <label htmlFor="search">Search:</label>
            <input 
            type="text"
            id='search'
            name='search'
            value={value}
            onChange={handleChange}
            autoComplete='off'
            />
            </div>
            
            {results.length > 0 &&
            <div className='search-results'>
            {results.map(e=>
            
                <Link to={`/movie/${e.id}`} className='query-container' onClick={handleClick}>
                <img src={e.poster} alt="" />
                <h3> {e.title} </h3>
                </Link>
            )
            }  
            </div>
            
        }

        </div>
    );
};
