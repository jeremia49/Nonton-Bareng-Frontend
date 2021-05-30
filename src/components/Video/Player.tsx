import { NONAME } from "dns";
import React, { useRef, useState, useEffect } from "react";
import videojs, { VideoJsPlayer } from 'video.js';

import 'video.js/dist/video-js.css'



export const VideoPlayer = (props : any) => {
    const videoPlayerRef : any = React.useRef(null); // Instead of ID
    const [currentTime, setCurrentTime] = useState(null);

    const videoSrc = props.url;
    const videoType = props.type;
    const serverplayerstatus = props.serverplayerstatus;
    const serverCurrTime = props.serverCurrTime;
    const forceupdatestime = props.forceupdatestime;


    const socket =  props.socket;
    const room = props.room;

    // const endedHandle = props.endedHandle;

    const oW = window.outerWidth;
    const oH = window.outerHeight;

    let videowidth;
    let videoHeight;

    if(oW <= 767){
        videowidth = oW;
        videoHeight = oH;
    }else{
        videowidth = oW-(oW/2.5);
        videoHeight = oH-(oH/3);
    }


    const videoJSOptions :any = {
        responsive:false,
        width:videowidth,
        height:videoHeight,
        preload : 'auto',
        autoplay: false ,
        muted:false,
        controls: true,
        // controlBar:false,
        controlBar: {
            progressControl:{
                seekBar: {
                    playProgressBar:true,
                },
            },
            playToggle:true,
            currentTimeDisplay:true,
            pictureInPictureToggle:true,
        },
        language:"id",
        userActions: {
            doubleClick: false,
            hotkeys:false,
        },
        fluid: false,
        fill:true,
        aspectRatio: '16:9'
    }

    const playVideo = ()=>{
      videoPlayerRef.current.play()
    }

    const pauseVideo = ()=>{
      videoPlayerRef.current.pause();
    }

    const settimeVideo = (time:number)=>{
        videoPlayerRef.current.currentTime=time;
    }


    // BAGIAN WEBSOCKET
    const setEndedVideo = () => {
      socket?.emit('setEndedVideo', { room });
    }
    //. BAGIAN WEBSOCKET


  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src({type:videoType,src:videoSrc});

        // console.log(serverplayerstatus);

        player.on("play", () => {
          // if(serverplayerstatus !== 1){
          //   player.pause();
          // }
        });

        player.on("pause" ,() => {
          // if(serverplayerstatus === 1){
            // player.play();
          // }
        });


        player.on("ended", () => {
          // console.log("ended");
          setEndedVideo();
          // props.endedHandle();
        });

        player.on("timeupdate", () => {
          // setCurrentTime(player.currentTime());
        });

            // console.log("Player Ready");
            // console.log(player)
      });

    }

    return () => {};
  },[videoSrc,videoType]);




  useEffect(()=>{
    try{

    if(serverplayerstatus === "started"){
      playVideo();
    }else{
      pauseVideo();
    }

    if(forceupdatestime === 1){
      settimeVideo(serverCurrTime);
    }else if ((((serverCurrTime - videoPlayerRef.current.currentTime) >= 5 ) || ((serverCurrTime - videoPlayerRef.current.currentTime) <= -1 ) )){
      settimeVideo(serverCurrTime);
    }
  }catch (e){
    console.error(e);
  }
  }, [serverplayerstatus,serverCurrTime]);


  return (

    <div>
        <div data-vjs-player className="video-player">
            <video ref={videoPlayerRef} className="video-js vjs-16-9"></video>
        </div>
    </div>
  );
};
