import React, { useContext, useState } from "react";
import { UserContext } from '../context/UserProvider'
import { useLocation } from 'react-router-dom'
import CommentForm from "./CommentForm";

export default function Post(props){
    const { destination, description, imgUrl, likedUsers, dislikedUsers, _id, username } = props
    const { deletePost, upVotePost, downVotePost, addComment, allComments } = useContext(UserContext)
    const location = useLocation();
    const isProfile = location.pathname === '/profile';
    const filteredComments = allComments.filter(comment => comment.post === _id);

    const [showComments, setShowComments] = useState(false)
    function toggleComments(){
        setShowComments(prev => prev = !prev)
    }

    return (
        <>
        <div className="post">
            <img src={imgUrl} alt="destination image"/>
            <div className="post-text">
                <h2>@{ username }</h2>
                <h2>{ destination }</h2>
                <h3>{ description }</h3>
            </div>
            {isProfile && <button id="delete-button" value={_id} onClick={deletePost}>Delete</button>}
            <div className="upvotes">              
                <h2>{likedUsers.length - dislikedUsers.length} Up votes</h2>
                <button value={_id} onClick={upVotePost}>Upvote</button>
                <button value={_id} onClick={downVotePost}>Downvote</button>
            </div>
            <p id="comment-button" onClick={toggleComments}>{showComments ? "Hide Comments" : "Show Comments..."}</p>
        </div>
        <div className='comments'>
            <CommentForm addComment={addComment} postId={_id} />
            {showComments && filteredComments.map(comment => <h3 key={comment._id}>{comment.user.username}: {comment.text}</h3>)}
        </div>
        </>
    )
}