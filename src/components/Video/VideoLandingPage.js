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
            if (response.data.result === 'success') {
                console.log(response.data.videos);
                setVideos(response.data.videos);
            } else {
                alert('랜딩 실패')
            }
        })
    }, [])

    const renderCards = Videos.map((video, index) => {
        var buffer = base64ToArrayBuffer(video.thumbnail);
        const blob = new Blob([buffer], {
            type: 'application/jpg',
        });
        const url = URL.createObjectURL(blob);
        return <Col lg={6} md={8} xs={24}>
            <Link to={`/video//${video.id}`}>
                <div className="video">
                    <img src={url}></img>
                </div>
                <Meta
                    avatar={
                        <Avatar src={video.writer.image} />
                    }
                    title={video.title}
                />
                <span>{video.member} </span><br />
                <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.uploadDate).format("MMM Do YY")} </span>
            </Link>
        </Col>
    });

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>Recommended</h1>
            <hr />

            <Row gutter={16}>
                {Videos ? { renderCards } : 'Loading..'}
            </Row>
        </div>
    )
}

export default LandingPage
