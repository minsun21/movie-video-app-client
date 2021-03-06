import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Row } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
import { getUrl } from '../../utils/Util';

import './VideoLandingPage.css';

const { Meta } = Card;

function LandingPage() {
    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('video/all').then(response => {
            setVideos(response.data);
        })
    }, [])

    const renderCards = Videos.map((video, index) => {
        const videoUrl = getUrl(video.thumbnail, 'jpg');
        const memberUrl = getUrl(video.memberImage, 'jpg');
        return <Col lg={6} md={8} xs={24} key={index}>
            <Link to={`/video/${video.id}`}>
                <img className="videoThumb" src={videoUrl} alt={video.title} />
                <div className="video-info">
                    <img className="memberImg" src={memberUrl} alt={video.memberName} />
                    <div className="video-info-alt">
                        <strong>{video.title}</strong>
                        <span>{video.memberName}</span>
                        <p>조회수 {video.viewCount}회</p>
                    </div>
                </div>
            </Link>
        </Col>
    });
    return (
        <div className="landing-view">
            <h1>All Video</h1>
            <hr />
            <div className="cards">
                <Row gutter={16}>
                    {renderCards}
                </Row>
            </div>
        </div >
    )
}

export default LandingPage
