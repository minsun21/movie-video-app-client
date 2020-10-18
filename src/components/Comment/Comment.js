import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

function Comment({ videoId }) {
    const [CommentValue, setCommentValue] = useState('');
    const userInfo = useSelector(state => state.user.loginInfo);

    const submitHandler = (e) => {
        e.preventDefault();
        let body = {
            content: CommentValue,
            writer: userInfo.id,
            videoId: videoId,
        }
        axios.post('/comment/get')
    }

    const commentHanlder = (e) => {
        setCommentValue(e.target.value);
    }

    return (
        <div>
            {/* submit */}
            <form onSubmit={submitHandler}>
                <textarea onChange={commentHanlder} />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Comment
