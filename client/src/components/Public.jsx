import React, { useContext, useEffect} from "react";
import PostList from './PostList';
import { UserContext } from '../context/UserProvider';

export default function Public(){
    const { getAllPosts, allPosts, count } = useContext(UserContext)

    useEffect(() => {getAllPosts()}, [count])

    return(
        <div className="public">
            <h1>Public</h1>
            <PostList posts={allPosts} />
        </div>
    )
}