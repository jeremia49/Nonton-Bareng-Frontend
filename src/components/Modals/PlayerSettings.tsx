import { useRef } from "react";

interface playerSettings{
    startStopHandle : any;
    startStopValue : string;
    videoURLHandler:any;
    timeHandler:any;
    urlValue:string;
    timeValue:number;
}

const PlayerSettings = ({startStopHandle,startStopValue,videoURLHandler,timeHandler,urlValue,timeValue}:playerSettings)=>{
  
    const url_input : any = useRef(null);
    const time_input : any = useRef(null);

    return (
        <div className="modal fade" id="settings" tabIndex={-1} aria-labelledby="settingsLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="settingsLabel">Video Player Settings</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
  
                <div className="container-fluid">
  
                  <div className="row">
                    <div className="col-md-12 text-center mb-5">
                      <input type="button" onClick={startStopHandle} className="btn btn-primary" value={startStopValue}/>
                    </div>
                  </div>
  
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text"> <i className="fa fa-link" aria-hidden="true"></i></span>
                        <span className="input-group-text">URL</span>
                        <input ref={url_input} type="text" onChange={({ target: { value } }) => videoURLHandler(value)}  className="form-control" placeholder={urlValue} />
                      </div>
                    </div>
                  </div>
  
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                        <span className="input-group-text">Set Time</span>
                        <input ref={time_input} type="number" onChange={({ target: { value } }) => timeHandler(value)} className="form-control" placeholder={timeValue.toString()} />
                      </div>
                    </div>
                  </div>
  
                </div>
              </div>
  
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{  url_input.current.value="" ; time_input.current.value="" }}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}
export default PlayerSettings