import React, { useEffect, useState } from 'react'
import axios from 'axios';

function SingleCommment({ comment }) {
    const [CommentValue, setCommentValue] = useState('');
    const [OpenReply, setOpenReply] = useState(false);

    // content, response_id, writer
    const submitHandler = (e) => {
        e.preventDefault();
        // let body = {
        //     content: CommentValue,
        //     writer: userInfo.id,
        //     videoId: videoId,
        // }
        // axios.post('/comment/write', body).then(response => {
        //     if (response.data.result !== 'success')
        //         alert('실패');
        //     else
        //         setCommentInfo(...commentList, response.data.comment);
        // });
    }

    const commentHanlder = (e) => {
        setCommentValue(e.target.value);
    }

    const onClickReply = () => {
        setOpenReply(!OpenReply);
    }

    return (
        <div>
            <p>{comment.content}</p>
            <button>좋아요</button>
            <button>싫어요</button>
            <button onClick={onClickReply}>Reply to</button>

            {OpenReply && <form onSubmit={submitHandler}>
                <textarea onChange={commentHanlder} value={CommentValue} placeholde="코멘트를 작성해 주세요" />
                <button type="submit">submit</button>
            </form>
            }
        </div>
    )
}

export default SingleCommment
