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
            console.log(response.data);
            setVideos(response.data);
        })
    }, [])

    // const renderCards = Videos.map((video, index) => {
    //     var buffer = base64ToArrayBuffer(video.thumbnail);
    //     const blob = new Blob([buffer], {
    //         type: 'application/jpg',
    //     });

    //     const url = URL.createObjectURL(blob);
    //     console.log(url)
    //     return <Col lg={6} md={8} xs={24}>
    //         <Link to={`/video//${video.id}`}>
    //             <div className="video">
    //                 <img src={url}></img>
    //             </div>
    //             <Meta
    //                 avatar={
    //                     <Avatar src={video.writer.image} />
    //                 }
    //                 title={video.title}
    //             />
    //             <span>{video.member} </span><br />
    //             <span style={{ marginLeft: '3rem' }}> {video.views}</span>
    //         </Link>
    //     </Col>
    // });

    const renderCards = Videos.map((video, index) => {
        var buffer = base64ToArrayBuffer(video.thumbnail);
        const blob = new Blob([buffer], {
            type: 'application/jpg',
        });
        const url = URL.createObjectURL(blob);
        return <Col lg={6} md={8} xs={24}>
            <Link to={`/video/${video.id}`}>
                <img style={{ width: '100%' }} src={url} alt={video.title}></img>
                <img style={{ borderRadius: '50%', width: '50px', height: '50px' }} src={url} alt={video.title}></img>
                <h2>{video.title}</h2>
                <span>{video.member}</span>
                <span>{video.viewCount}</span>
            </Link>
        </Col>
    });
    return (
        <div style={{ width: '100%', margin: '3rem auto' }}>
            <h1>Recommended</h1>
            <hr />
            <Row gutter={16}>
                {renderCards}
            </Row>
        </div >
    )
}

export default LandingPage
