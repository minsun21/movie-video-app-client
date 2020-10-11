import React, { useEffect, useState } from 'react'
import './VideoDetailPage.css'
import { Col, Row } from 'antd';
import Axios from 'axios';

function VideoDetailPage({ match }) {

    const videoId = match.params.videoId;
    const [VideoDetailInfo, setVideoDetailInfo] = useState({});

    useEffect(() => {
        const variable = { videoId: videoId };
        Axios.post('/video/getVideo', variable).then(response => {
            if (response.data.result === 'success') {
                setVideoDetailInfo(response.data.videoInfo)
            } else {
                alert('실패');
            }
        })

    }, []);

    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div>
                    <video></video>
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <div>Side</div>
            </Col>
        </Row>
    )
}

export default VideoDetailPage
