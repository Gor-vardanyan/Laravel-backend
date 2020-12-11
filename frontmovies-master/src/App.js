import React, { useState, useEffect } from 'react'

//import React, {useState} from 'react'
//import logo from './logo.svg';
//import logo from './logo.svg';
//import {useEffect} from 'react';
//import {useState} from 'react';
import { Switch, BrowserRouter, Route, useParams } from 'react-router-dom'
import axios from 'axios';
import './App.css';

import Home from './containers/Home/Home'
import Register from './containers/Register/Register'
import Profile from './containers/Profile/Profile'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './containers/Login/Login';
import Admin from './containers/Admin/Admin';

const Movie = ({user,setUser}) =>{
  const [info, setInfo] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    axios.get('https://peliculasdb.herokuapp.com/movie/id/'+id)
    .then(res => {
        setInfo(res.data);
    }).catch((error)=>{
        setInfo(false);
    })
  }, [])

  const handleRentMovie=()=>{
  let token = localStorage.getItem("authToken");
    axios.post('https://peliculasdb.herokuapp.com/user/rent/'+id,{},{
      headers: { Authorization:'Basic '+ token }
      })
      .then(res => {
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
      }).catch((error)=>{
          console.log(error);
      })
  }

  return (<div>
    {info
      ?<span className="movieViewer">
        <div className="movieImg">
          {<img className="images" src={"https://image.tmdb.org/t/p/w342" + info.poster_path} alt="poster of the movie"></img>}
        </div>
        <div>
          <div className="movieGrid"><h2>{info.title}</h2></div>
          <div className="movieGrid">{info.overview}</div>
          <div className="movieGrid">Average vote: {info.vote_average}</div>
            {user.rented !=null
            ?<div className="movie_not_rented">You actually have a movie rented</div>
            :<div><button className="movie_rented" onClick={handleRentMovie}>
              Rent Movie
              </button></div>
            }
        </div>  
      </span>
      :<span>Loading...</span>
    }
    </div>);
}

function App() {
  const [user, setUser] = useState(null);
   console.log(user)
  return (
    <BrowserRouter>
      <Route>
        <Header setUser={setUser} user={user}/>
        <Switch>
          
          <Route path='/' exact >
            {user && user.role !== 0
            ?<Admin></Admin>
            :<Home user={user}></Home>
            }
          </Route>
          <Route path='/login' exact >
            <Login setUser={setUser}></Login>
          </Route>
          <Route path='/register' component={Register} exact />
          <Route path='/movie/:id' children={<Movie user={user} setUser={setUser} />} exact />
          <Route path='/profile' exact >
            <Profile  user = {user} setUser={setUser}></Profile>
          </Route>
        </Switch>
        <Footer/>
        </Route>
    </BrowserRouter>
  );
}

export default App;
