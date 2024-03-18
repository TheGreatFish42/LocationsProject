import React, { useContext, useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { UserContext } from '../context/UserProvider';

export default function Profile(){
    const {
        user: {
            username
        },
        addPost,
        getUserPosts,
        posts,
        count
    } = useContext(UserContext)

    useEffect(() => {
        getUserPosts();
    }, [count]);

    return (
        <div className="profile">
            <h1>Welcome @{username}!</h1>
            <h3>Add a Destination</h3>
            <PostForm addPost={addPost}/>
            <h3>Your Posts</h3>
            <PostList posts={posts} username={username}/>
        </div>
    )
}