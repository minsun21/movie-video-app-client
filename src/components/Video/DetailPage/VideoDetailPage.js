import React, { useEffect, useState } from 'react'
import './VideoDetailPage.css'
import { Col, Row } from 'antd';
import Axios from 'axios';
import { getUrl } from '../../../utils/Util';
import Subscribe from '../Subscribe/Subscribe';
import Comment from '../../Comment/Comment';

function VideoDetailPage({ match }) {

    const videoId = match.params.videoId;
    const [VideoDetailInfo, setVideoDetailInfo] = useState({});
    const [SideVideos, setSideVideos] = useState([]);
    const [Comments, setComments] = useState([]);

    useEffect(() => {
        let variable = { videoId: videoId };
        Axios.post('/video/getVideo', variable).then(response => {
            let responseData = response.data;
            const videoUrl = getUrl(responseData.videoFilePath, 'mp4');
            responseData.videoFilePath = videoUrl;
            const memberImgUrl = getUrl(responseData.memberImage, 'jpg');
            responseData.memberImage = memberImgUrl;
            setVideoDetailInfo(responseData);
        });
        Axios.post('/comment/get', variable).then(response => {
            console.log(response.data)
            setComments(response.data);
        });
        // Axios.post('/video/getSideVideos', variable).then(response => {
        //     setSideVideos(response.data);
        // })


        // return () => (variable = '');
    }, []);

    // useEffect(() => {
    //     let variable = { videoId: videoId };
    //     Axios.post('/comment/get', variable).then(response => {
    //         setComments(response.data);
    //     });
    // }, [])

    const renderSideVideo = SideVideos.map(video => {
        let videoUrl = getUrl(video.thumbnail, 'jpg');
        return <div className="side-view" key={video.id}>
            <img className="videoThumb" src={videoUrl} alt={video.title} />
            <div>
                <h1>{video.title}</h1>
                <span>{video.memberName}</span><br />
                <span>조회수 {video.viewCount}회</span>
            </div>
        </div>
    });

    return (
        <div className="video-detail">
            {VideoDetailInfo.memberId ?
                <Row gutter={[16, 16]}>
                    <Col lg={18} xs={24}>
                        <div>
                            <video src={VideoDetailInfo.videoFilePath} controls />
                            <div className="detail-info-top">
                                <h2>{VideoDetailInfo.title}</h2>
                                <span>조회수 {VideoDetailInfo.viewCount}회</span>
                                <span>{VideoDetailInfo.uploadDate}</span>
                                <span>좋아요</span>
                            </div>
                            <div className="detail-info-bottom">
                                <img className="memberImg" src={VideoDetailInfo.memberImage} alt={VideoDetailInfo.memberName} />
                                <div className="detail-info-alt">
                                    <span>{VideoDetailInfo.memberName}</span>
                                    <Subscribe uploader={VideoDetailInfo.memberId} /><p></p>
                                    <div>{VideoDetailInfo.desc}</div>
                                </div>
                            </div>
                        </div>
                        <Comment videoId={VideoDetailInfo.id} Comments={Comments} setComments={setComments} />
                    </Col>
                    <Col lg={6} xs={24}>
                        {renderSideVideo}
                    </Col>
                </Row>
                : 'Loading...'}
        </div>
    )
}

export default VideoDetailPage
