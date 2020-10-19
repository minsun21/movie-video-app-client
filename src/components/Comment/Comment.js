import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleCommment from './SingleCommment';
import './Comment.css';

function Comment({ videoId, commentList, setCommentInfo }) {
    const [CommentValue, setCommentValue] = useState('');
    const userInfo = useSelector(state => state.user.loginInfo);
    useEffect(() => {

    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        let body = {
            content: CommentValue,
            writer: userInfo.id,
            videoId: videoId,
        }
        axios.post('/comment/write', body).then(response => {
            if (response.data.result !== 'success')
                alert('실패');
            else
                setCommentInfo(...commentList, response.data.comment);
        });
    }

    const commentHanlder = (e) => {
        setCommentValue(e.target.value);
    }

    return (
        <div>
            {/* submit */}
            {commentList ?
                commentList.map(comment => <SingleCommment key={comment.id} comment={comment} />)
                : null}
            <form onSubmit={submitHandler}>
                <textarea onChange={commentHanlder} value={CommentValue} placeholde="코멘트를 작성해 주세요" />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Comment
