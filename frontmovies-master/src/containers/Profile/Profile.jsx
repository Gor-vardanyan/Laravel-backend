import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Profile.scss';
import { useParams } from 'react-router-dom'

function Profile ({ user ,setUser }) {
    let { id } = useParams();
    let token = localStorage.getItem("authToken");
    useEffect(() => {
        axios.get('https://peliculasdb.herokuapp.com/user/profile',{
            headers: { Authorization:'Basic '+ token }
        })
        .then(res => {
            setUser(res.data)
        })   
    },[])

    const handleDevolutionMovie =()=>{
        let token = localStorage.getItem("authToken");
        axios.post('https://peliculasdb.herokuapp.com/user/downRent/'+id,{},{
        headers: { Authorization:'Basic '+ token }
         })
        .then(res => {
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
        }).catch((error)=>{
          console.log(error);
        })
    }
    
    const Rentedmovie =()=>{
        const [info, setInfo] = useState(false);
        useEffect(() => {
            axios.get('https://peliculasdb.herokuapp.com/movie/id/'+user.rented)
            .then(res => {
                setInfo(res.data);
            }).catch((error)=>{
                setInfo(false);
            })
          }, [])

          return( 
          <div>
            {info
            ?<div className="colum">
                <div className="alg">
                    <div className="mg">     
                        {<img className="profileimages" src={"https://image.tmdb.org/t/p/w342" + info.poster_path} alt="poster of the movie"></img>}
                    </div>
                </div>
                <div> 
                    <div>
                        <div className="movieGrid"><h2>Id: {info.id}</h2></div>
                        <div className="movieGrid"><h2>{info.title}</h2></div>
                    </div>
                    <button className="movie_rented" onClick={handleDevolutionMovie}>
                        Devolution
                    </button>
                </div>            
            </div>
            :<span>Loading...</span>
            }
        </div>)
    }



        return (
        <div className="profileContainer">
                <div className="userInformation">
                <h3>User data</h3>
                   <img id="userLogo" src="https://i.ibb.co/9n7G1jC/image.png" alt="user"></img>
                   <h3>{user?.name}</h3>
                   <h3>{user?.email}</h3>

                </div>

                <div className="userMovie">
                    <h3>Rented movie</h3>{user?.rented !=null
                    ?<div><Rentedmovie></Rentedmovie></div>
                    :<div>You dont have a rented movie</div>
                    }
                </div>
        </div>
    )
}

export default Profile
