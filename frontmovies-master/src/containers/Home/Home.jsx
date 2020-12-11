//import logo from '../../logo.svg';
import {useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';


const Home =(props) =>{
    const [movie, setmovie] = useState([]);
    const [current_page, setPage] = useState(0);

    useEffect(() => {
        axios.get('https://peliculasdb.herokuapp.com/movie/')
        .then(res => {
            setmovie(res.data)
        })
        .catch(error => {console.log(error)});
    }, [])
    
    const history = useHistory();

    const routeChange = (item) =>{ 
      let path = `/movie/${item.id}`; 
      history.push(path);
    }

    const Movies =()=>{
        
        return(<div>
            {movie?.map(item=>{
                console.log(item)
                return (<div className="grid" onClick={()=>{routeChange(item)}}>    
                            {<img className="images" src={"https://image.tmdb.org/t/p/w185" + item.poster_path} alt="poster of the movie"></img>}
                            <div className="movieGrid">{item.title}</div>
                            <div className="movieGrid">Average vote: {item.vote_average}</div>
                        </div>)
            })}
        </div>);
    }

    const handleScroll= event =>{
        let max_scroll = event.target.offsetWidth;
        let follow_button_left = document.getElementById('follow_left');
        let follow_button_right = document.getElementById('follow_right');
        if(event.target.scrollLeft === max_scroll){
            follow_button_right.style.display = 'none';
        }else{
            follow_button_right.style.display = 'block';
        }

        if(event.target.scrollLeft === 0){
            follow_button_left.style.display = 'none';
        }else{
            follow_button_left.style.display = 'block';
        }
    }

    const updateMovie = ()=>{
        axios.get('https://peliculasdb.herokuapp.com/movie/'+current_page)
        .then(res => {
            setmovie(res.data)
        })
        .catch(error => {console.log(error)});
    }

    const getLast = ()=>{
        setPage(current_page-1);
        updateMovie();
    }

    const getNext = ()=>{
        setPage(current_page+1);
        updateMovie();
    }
    console.log(props.user);


    return (     
    <div>
        {props.user 
        ?<div>
            <p className="Movietext">Spider-man: homecoming</p>
            <div className="center">
            <img className="gif1" src="https://giffiles.alphacoders.com/817/81706.gif" alt=""/>
            <img className="jpg2" src="https://media.comicbook.com/2016/12/spider-man-homecoming-atm-robbery-scene-217610-1280x0.jpg" alt=""/>
            </div>
            <div className="moviesContent" onScroll={handleScroll}>
                <div className="movies">
                    <Movies></Movies>
                </div>
            </div>
            <button id="follow_left" className="follow_left"> + </button>
            <button id="follow_right" className="follow_right"> + </button>
            <div className="page_buttons">
                {current_page === 0 ?'':<button className="next_page" onClick={getLast}>last page</button>}
                <button className="next_page" onClick={getNext}>next page</button>
            </div>   
        </div> 
        :<div className="homeMain">      
            <div className="maintext" >Rental movies Web page,<p> register to rent a movie</p></div>
        </div>
        }
    </div>
  )
} 

export default Home;
