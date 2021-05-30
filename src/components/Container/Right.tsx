import { useEffect, useRef } from "react";
import { css } from '@emotion/css'

import ScrollToBottom from 'react-scroll-to-bottom';

const MSG_TYPE_CHAT : string = "message"

const MSG_TYPE_EVENT : string = ""
const MSG_TYPE_EVENT_JOIN : string = "join"
const MSG_TYPE_EVENT_LEAVE : string = "leave"
const MSG_TYPE_EVENT_UPDATEURL : string = "updatePlayerURL"
const MSG_TYPE_EVENT_UPDATESTATUS: string = "updatePlayerStatus"
const MSG_TYPE_EVENT_UPDATETIME: string = "updateForceServerTime"


const getTimeOffset  = ()=>{
  let dt = new Date();
  return dt.getTimezoneOffset()*60*1000;
}

const parseTimestampToString=(timestamp:number)=>{
  let date = new Date(timestamp - getTimeOffset());
  return date.toLocaleTimeString()
}



const Right = ({users,messages,sendMessage} : any) =>{
  const messageContainer = useRef(null);
  const msg_btn : any = useRef(null);

  const usersDom = users.map((user:any,key:any)=>{
      return (
        <li key={key.toString()} className="list-group-item">{user}</li>
      )}
  )
  
  const messagesDom = messages.map((el:any,key:any)=>{
    if(el.type === MSG_TYPE_CHAT){
        return (
          <li key={key.toString()} className="list-group-item">
            <span className="msg-time">{parseTimestampToString(el.timestamp)}</span> <span className="badge bg-secondary">{el.user}</span> <span className="msg-text">{el.message}</span>
          </li>
        )
    }else{
      if(el.type === MSG_TYPE_EVENT_JOIN){
        return(
          <li className="list-group-item text-center bg-info color-white">
            <span className="msg-time color-white">{parseTimestampToString(el.timestamp)}</span> <span className="badge bg-secondary">{el.user}</span> <span className="msg-text">Telah Bergabung !</span>
          </li>
        )
      }

      if(el.type === MSG_TYPE_EVENT_LEAVE){
        return(
          <li className="list-group-item text-center bg-danger color-white">
            <span className="msg-time color-white">{parseTimestampToString(el.timestamp)}</span> <span className="badge bg-secondary">{el.user}</span> <span className="msg-text">Telah Keluar !</span>
          </li>
        )
      }

      if(el.type === MSG_TYPE_EVENT_UPDATESTATUS){
        if(el.message==="started"){
          return(
            <li className="list-group-item text-center bg-success color-white">
              <span className="msg-time color-white">{parseTimestampToString(el.timestamp)}</span> <span className="badge bg-secondary">{el.user}</span><span className="msg-text">Telah Memulai Video !</span>
            </li>
          )
        }else if(el.message==="paused"){
          return(
            <li className="list-group-item text-center bg-danger color-white">
              <span className="msg-time color-white">{parseTimestampToString(el.timestamp)}</span> <span className="badge bg-secondary">{el.user}</span><span className="msg-text">Telah Memberhentikan Video !</span>
            </li>
          )
        }
      }

    if(el.type === MSG_TYPE_EVENT_UPDATEURL){
      return(
        <li className="list-group-item text-center bg-info color-white">
          <span className="msg-time color-white">{parseTimestampToString(el.timestamp)}</span> <span className="badge bg-secondary">{el.user}</span> <span className="msg-text">Mengubah URL Menjadi : {el.message}</span>
        </li>
      )
    }


    if(el.type === MSG_TYPE_EVENT_UPDATETIME){
      return(
        <li className="list-group-item text-center bg-info color-white">
          <span className="msg-time color-white">{parseTimestampToString(el.timestamp)}</span> <span className="badge bg-secondary">{el.user}</span> <span className="msg-text">Mengubah Waktu Menjadi : {el.message}s</span>
        </li>
      )
    }

    }
      
    }
    
  )

  const checkInput = (input:string)=>{
      if(!input){
          return false
      }
      return true
  }

  const textKeyPressListener = (e:any)=>{
      if(e.key === 'Enter'){
          if(!checkInput(e.target.value)) return 
          sendMessage(e.target.value)
          e.target.value="";
      } 
  }

  const btnclickListener=()=>{
      if(!checkInput(msg_btn.current.value)) return 
      sendMessage(msg_btn.current.value)
      msg_btn.current.value=""
  }
  
  const CHAT_DOM = css({
    height: '47vh'
  });

  return (
    <div className="col-md-4 p-0 bg-white h-md-100 column-kanan">

        <div className="d-md-flex h-md-100 px-5 flex-column ">

            <div className="mt-3 credit-container text-center justify-content-center credits-right">
                <h4 style={{fontWeight:"bold",lineHeight:"20px"}}>Nonton Animex</h4>
                <h6>Dibuat oleh : <a href="https://github.com/jeremia49">@jeremia49</a></h6>
            </div>

            <div className="users-container mb-2 mt-1 ">
                <h4>Online ({users.length})</h4>
                <div className="users">
                  <ul className="list-group list-group-flush">
                    {usersDom}
                  </ul>  
                </div>
            </div>
            
            <div className="chat-containers mt-2 mb-2">
                <h4>Chat</h4>
                <div className="chats">
                  <ul className="list-group p-1">
                    <ScrollToBottom className={CHAT_DOM} checkInterval={150} >
                      {messagesDom}
                    </ScrollToBottom>
                  </ul>  
                </div>
                <div className="input-text">
                  <div className="input-group mb-3 px-1">
                    <input type="text" className="form-control text-left" aria-label="Message" 
                    placeholder="Masukkan pesan anda..." ref={msg_btn} onKeyUp={textKeyPressListener} />
                    <span className="input-group-text send-btn" onClick={btnclickListener} ><i className="fa fa-paper-plane" aria-hidden="true"></i></span>
                  </div>
                </div>
            </div>

        </div>
    </div>

    )
};

export default Right;
