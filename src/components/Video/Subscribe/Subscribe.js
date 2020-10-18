import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../DetailPage/VideoDetailPage.css'

function Subscribe({ uploader }) {
    const userInfo = useSelector(state => state.user.loginInfo.id);

    const [SubscribeNumber, setSubscribeNumber] = useState();
    const [IsSubsribed, setIsSubsribed] = useState('false')

    useEffect(() => {
        if (typeof uploader !== 'undefined') {
            let body = {
                uploader: uploader,
                loginInfo: userInfo,
            }
            Axios.post('/subscribe/get', body).then(response => {
                setSubscribeNumber(response.data.subscribedNumber);
                setIsSubsribed(response.data.isSubscribed)
            });
        }
    }, [uploader])

    const subscribeHandler = () => {
        let body = {
            uploader: uploader,
            loginInfo: userInfo,
        }
        if (IsSubsribed === 'true') {
            // 구독중이면 구독 취소 
            Axios.post('/subscribe/dis-subscribe', body).then(response => {
                if (response.data.result === 'success')
                    setIsSubsribed('false');
                else
                    alert('실패')
            });
            setIsSubsribed('true');
        } else {
            // 구독 안했으면 구독
            Axios.post('/subscribe/subs', body).then(response => {
                if (response.data.result === 'success')
                    setIsSubsribed('true');
                else
                    alert('실패')
            });
        }
    }
    const renderButton = () => {
        if (Number(uploader) === Number(userInfo)) {
            return null;
        } else {
            return <button className={IsSubsribed ? 'subscribed' : 'dis-subscribed'} onClick={subscribeHandler}>{IsSubsribed === 'true' ? `구독중 (${SubscribeNumber})` : '구독'}</button>
        }
    }

    return (
        <div className="subscribe-section">
            {renderButton()}
        </div>
    )
}

export default Subscribe
