import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Row } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
import { base64ToArrayBuffer } from '../../utils/Util';

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
        var buffer = base64ToArrayBuffer(video.thumbnail);
        const blob = new Blob([buffer], {
            type: 'application/jpg',
        });
        var buffer2 = base64ToArrayBuffer(video.memberImage);
        const blob2 = new Blob([buffer2], {
            type: 'application/jpg',
        });
        const videoUrl = URL.createObjectURL(blob);
        const memberUrl = URL.createObjectURL(blob2);
        return <Col lg={6} md={8} xs={24} key={index}>
            <Link to={`/video/${video.id}`}>
                <img className="videoThumb" src={videoUrl} alt={video.title}></img>
                <div className="video-info">
                    <img className="memberImg" src={memberUrl} alt={video.memberName}></img>
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
