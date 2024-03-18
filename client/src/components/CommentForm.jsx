import React, { useState } from "react";

export default function CommentForm(props){
    const initComment = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        text: ""
    }
    const [comment, setComment] = useState(initComment)
    const { addComment, postId } = props
    const { text } = comment
    
    function handleSubmit(e){
        e.preventDefault()
        addComment({...comment, post: postId})
        setComment(initComment)
    }

    function handleChange(e){
        const { name, value } =  e.target
        setComment(prevComment => ({
            ...prevComment,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="text"
                value={text}
                onChange={handleChange}
                placeholder="Comment Here"/>
            <button>Comment</button>
        </form>
    )
}