import { VideoPlayer } from "./../Video/Player";


const Left = ({data,room,socket} : any) =>{
  return (
    <div className="col-md-8 p-0 bg-indigo h-md-100 bg-black column-kiri">

        <div className="credit-container text-center justify-content-center credits-left">
                <h4 style={{fontWeight:"bold",lineHeight:"20px"}}>Nonton Animex</h4>
                <h6>Dibuat oleh : <a href="https://github.com/jeremia49">@jeremia49</a></h6>
        </div>
        
        <div className="text-white d-md-flex flex-column align-items-center h-100 p-5 text-center justify-content-center">
        
        <div className="row video-container">
            <VideoPlayer
                url={data.url}
                type={"video/mp4"}
                serverplayerstatus={data.status}
                serverCurrTime={data.currentTime}
                forceupdatestime={data.ForceUpdateServerTime}

                socket = {socket}
                room = {room}
            />

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#settings">
            <i className="fa fa-wrench" aria-hidden="true"></i>
            Settings
            </button>
        </div>
        </div>
    </div>

    )
};

export default Left;
