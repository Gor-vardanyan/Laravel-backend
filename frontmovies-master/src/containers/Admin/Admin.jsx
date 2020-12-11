import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Admin.scss';

function Admin() {
    const [users,setUsers] = useState([])
    
    useEffect(() => {
        axios.get('https://peliculasdb.herokuapp.com/user/users')
        .then(res => {
            setUsers(res.data)
        })
        .catch(error => {console.log(error)});
        
    },[])
    
    return (
        <div className="tableView">
        <table className="aligned">
            <tr><td>NAME</td><td>EMAIL</td><td>RENTED</td></tr>
            {users.map(item=>{
                return (<tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    {item.rented
                    ?<td>{item.rented}</td>
                    :<td></td>
                    }
                </tr>)
            })}
        </table>
        </div>
    )
}

export default Admin