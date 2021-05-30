import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './../App.css';
import './Login.css';

interface login{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}

const Login  = ({history} : login )=>{
    const [username, setUsername] = useState("");
    const [room, setRooom] = useState("");
    

    const handleTextChange = (e:React.FormEvent<HTMLInputElement>)=>{
        if(e.currentTarget.name === "uname"){
            setUsername(e.currentTarget.value)
        }else if(e.currentTarget.name === "room"){
            setRooom(e.currentTarget.value)
        }
    }

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        if (!username || !room) {
            alert('Pastikan kamu telah mengisi username dan room')
        }else{
            history.push('/join',{username,room})
        }
    }


    return (
        <div className="App2">
              <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                  <h1 className="heading">LOGIN</h1>
                  <div>
                    <input required placeholder="Display Name" name="uname" className="joinInput" type="text" onChange={handleTextChange} />
                  </div>
                  <div>
                    <input required placeholder="Room" name="room" className="joinInput mt-20" type="text" onChange={handleTextChange} />
                  </div>
                    <button onClick={handleSubmit} className={'button mt-20'} type="submit">Masuk &rarr;</button>
                </div>
              </div>
          </div>
      );
}

export default Login;
