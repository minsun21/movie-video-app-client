import React, { useEffect, useState } from 'react'
import './VideoDetailPage.css'
import { Col, Row } from 'antd';
import Axios from 'axios';
import { getUrl } from '../../../utils/Util';

function VideoDetailPage({ match }) {

    const videoId = match.params.videoId;
    const [VideoDetailInfo, setVideoDetailInfo] = useState({});

    useEffect(() => {
        const variable = { videoId: videoId };
        Axios.post('/video/getVideo', variable).then(response => {
            let responseData = response.data;
            console.log(responseData);
            const videoUrl = getUrl(responseData.videoFilePath, 'mp4');
            responseData.videoFilePath = videoUrl;
            const memberImgUrl = getUrl(responseData.memberImage, 'jpg');
            responseData.memberImage = memberImgUrl;
            setVideoDetailInfo(responseData);
        })
    }, []);

    return (
        <div className="video-detail">
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div>
                        <video src={VideoDetailInfo.videoFilePath} controls></video>
                        <h2>{VideoDetailInfo.title}</h2>
                        <span>조회수 {VideoDetailInfo.viewCount}회</span>
                        <span>{VideoDetailInfo.uploadDate}</span>
                        <span>좋아요</span>
                        <hr />
                        <div className="detail-info">
                            <img className="memberImg" src={VideoDetailInfo.memberImage} alt={VideoDetailInfo.memberName} />
                            <div className="detail-info-alt">
                                <div>{VideoDetailInfo.memberName}</div>
                                <div>구독 몇명</div><p></p>
                                <div>{VideoDetailInfo.desc}</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <div>Side</div>
                </Col>
            </Row>
        </div>
    )
}

export default VideoDetailPage
