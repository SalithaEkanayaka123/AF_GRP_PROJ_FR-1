import React from 'react';
import '../../../../../CSS/homestyle.css';
import Video from './video.mp4';
import {useHistory} from "react-router-dom";

function VideoLandingComponent() {

    const history = useHistory();

    const handleHistory = () => {
        history.push('/register');
    }

    return (<div>
        <div className = "main-container">
            <video src={Video} autoPlay loop muted />
            <div className="caption">
                <h2 className="caption-header">Upcomming events</h2>
                <p className="caption-second">more details up comming event.</p>
                <div>
                    <button className="buttons-main">View More</button>
                    <button className="buttons-main" onClick={() => handleHistory()}>Register</button></div>
                </div>
        </div>
    </div>)
}
export default VideoLandingComponent;
