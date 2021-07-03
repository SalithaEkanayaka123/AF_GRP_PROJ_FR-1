import React, {useEffect, useState} from 'react';
import Ratings1 from "../../../../Ratings/Ratings1";
import './ratingstyles.scss'
import Speaker from "../../../../KeySpeakers/SpeakersImges/profile.webp";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";

function RatingPage() {

    const history = useHistory();
    const [feedbackData, setFeedbackData] = useState([]);
    // const users = useSelector((state) => state.users);
    const handleHistory = () => {
        history.push('/allFeedBackPage');
    }

    const fetchFeedBackDetails2 = async () => {
        try {
            const response = await axios
                .get("https://application-framework-database.herokuapp.com/api/v1/feedbacks")
                .catch((error) => {
                    console.log("Error", error);
                });
            setFeedbackData(response.data)

        } catch (err) {
            console.log("Error");
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchFeedBackDetails2();
    }, [])

    return (<React.Fragment>
        <div className="rating-section" data-testid="rating-section">
            <div className="rating-header" data-testid="rating-header">
                <h2 className="rating-header-main-header" data-testid="rating-header-main-header">Rating</h2>
                {<button className="buttonDownload" onClick={(e) => {
                    e.preventDefault();
                    handleHistory();
                }}>View All</button>}
                <h4 className="rating-header-second-header" data-testid="rating-header-second-header">Information</h4>
            </div>
            <div className="cardLayout" data-testid="rating-cardLayout">
                {feedbackData.slice(0,4).map((row) => (
                    console.log(row),
                        <Ratings1 rows={row}/>
                ))}
            </div>
        </div>
    </React.Fragment>)
}

export default RatingPage;
