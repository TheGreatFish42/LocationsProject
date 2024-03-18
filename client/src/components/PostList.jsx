import React, { useContext } from "react";
import Post from "./Post";
import { UserContext } from '../context/UserProvider'

export default function PostList(props){
    const { posts, username } = props
console.log(posts)
    return (
        <div className="post-list">
            {posts.map(post => <Post {...post} key={post._id}/>)}
        </div>
    )
}