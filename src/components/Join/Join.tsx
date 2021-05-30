
import React, {useState, useEffect} from 'react';
import io, { Socket } from "socket.io-client";
import { RouteComponentProps } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Join.css';

import Left from './../Container/Left';
import Right from './../Container/Right';
import PlayerSettings from '../Modals/PlayerSettings';

// const ENDPOINT = 'localhost:3000';

const ENDPOINT = '/';

// const ENDPOINT = 'nobar.jeremia.co';


let socket : Socket ;

interface router{
  location: RouteComponentProps['location'];
}



const Join = ({location}:router)  =>{
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [videoPlayerData, setVideoPlayerData] = useState({
      status : "paused",
      currentTime : 0,
      url : "",
      startTime : 0,
      pausedTime:0,
      offsetTime:0,
  });
  const [users, setUsers]  = useState([]);
  const [messages, setMessages] = useState<Array<any>>([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    
    try{
      let { username : uname , room : uroom} : any = location.state
      if(!uname||!uroom){
        window.location.href = "/";
      }
    }catch(e){
      window.location.href = "/";
    }

    const { username : uname , room : uroom} : any = location.state
    setRoom(uroom)
    setName(uname)
    
    socket.emit('setUsername', { name:uname });
    
    socket.emit('joinRoom', { room:uroom }, (cb : any) => {
      if(cb.msg === "Username telah ada !") { 
        alert("Username telah ada, silahkan ganti dengan username lain untuk memasuki room ini");
        window.location.href = "/";
      }
    });

    const getVidData = ()=>{
      socket.emit('getVideoData', { room:uroom }, (cb : any) => {
          setVideoPlayerData(cb.msg);
      });
    };

    socket.on('updatePlayerURL', ({msg},) => {
      setVideoPlayerData(msg);
    });

    socket.on('updatePlayerStatus', ({msg},) => {
      setVideoPlayerData(msg);
    });
    
    socket.on('updateForceServerTime', ({msg}) => {
      msg.ForceUpdateServerTime = 1;
      setVideoPlayerData(msg);
    });

    socket.on('message', (msg) => {
      setMessages(messages=>messages.concat(msg))
    });

    socket.on('usersChange', ({msg}) => {
      setUsers(msg["users"]);
    });

    const pingserver = ()=>{
      fetch(`/ping`);
    };

    getVidData();

    const ping = setInterval(pingserver, 10000);
    const updateBerkala = setInterval(getVidData,2000);

    return () => {
        clearInterval(ping);
        clearInterval(updateBerkala);
      };
  
  },[])

  const validURL = (str:string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const setVideoURL = (value : any) => {
    if(!validURL(value)) return;
    socket.emit('setPlayerURL', { room , URL:value});
  };

  const setTime = (value : any) => {
    if(value < 0) return;
    socket.emit('setTime', { room , time : value});
  };

  const setServerPlayerStatus = (e : any) => {
    e.target.value = e.target.value === "Play" ? "Pause" : "Play";
    let stats;
    if (e.target.value==="Play"){
      stats = "paused";
    }else{
      stats = "started";
    }
    socket.emit('setPlayerStatus', { room , status:stats});
  }

  const sendMessage = (e:any) => {
      socket.emit('sendMessage', { room , message:e});
  }

  const startstop = videoPlayerData.status === "paused" ? "Play":"Pause";


  return (
      <React.Fragment>
      <div className="container-fluid vh-100 vw-100 p-0">
        <div className="d-md-flex h-md-100 p-0 both">
          <Left data={videoPlayerData} room={room} socket={socket} />
          <Right 
            sendMessage={sendMessage}
            messages={messages}
            users={users}
            />
          </div>
      </div>
      <PlayerSettings 
        startStopHandle={setServerPlayerStatus}
        videoURLHandler={setVideoURL}
        timeHandler={setTime} 
        startStopValue={startstop}
        urlValue={videoPlayerData.url}
        timeValue={videoPlayerData.currentTime}
        />
      </React.Fragment>
  );
}

export default Join
