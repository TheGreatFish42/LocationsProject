import React, { useState } from "react";
import axios from 'axios';

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props){
    const initState = { 
      user: JSON.parse(localStorage.getItem("user")) || {},
      token: localStorage.getItem("token") || "", 
      posts: [],
      errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [allComments, setAllComments] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [count, setCount] = useState(0)

    console.log(userState)
    function signup(credentials){
        axios.post("/auth/signup", credentials)
          .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
              ...prevUserState,
              user,
              token
            }))
          })
          .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
          .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getUserPosts()
            setUserState(prevUserState => ({
              ...prevUserState,
              user,
              token
            }))
          })
          .catch(err => handleAuthErr(err.response))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
          user: {},
          username: "",
          token: "",
          posts: []
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
          ...prevState,
          errMsg
        }))
    }
    
    function resetAuthErr(){
        setUserState(prevState => ({
          ...prevState,
          errMsg: ""
        }))
    }
    
    function getUserPosts(){
        userAxios.get("/api/post/user")
          .then(res => {
            setUserState(prevState => ({
              ...prevState,
              posts: res.data
            }))
          })
          .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllPosts(){
        userAxios.get("/api/post")
        .then(res => {
          setAllPosts(res.data)
        })
      .catch(err => console.log(err.response.data.errMsg))
    }

  function addPost(newPost){
    userAxios.post("/api/post", newPost)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          posts: [...prevState.posts, res.data]
        }))
      })
      .catch(err => console.log(err.response))
  }

  function deletePost(e){
    const postId = e.target.value
    userAxios.delete(`/api/post/${postId}`)
    .then(res => {
      console.log(res)
      setCount(prev => prev +1)})
    .catch(err => console.log(err.response.data.errMsg))
  }

  function upVotePost(e) {
    const postId = e.target.value
    userAxios.put(`/api/post/upVote/${postId}`)
        .then(res => {
            setAllPosts(prevPosts => prevPosts.map(post => postId !== post._id ? post : res.data))
            setUserState(prevUserState => ({ 
              ...prevUserState, 
              posts: prevUserState.posts.map(post => 
                postId !== post._id ? post : res.data) }))
        })
        .catch(err => console.log(err))
}

  function downVotePost(e) {
    const postId = e.target.value
    userAxios.put(`/api/post/downVote/${postId}`)
        .then(res => {
            setAllPosts(prevPosts => prevPosts.map(post => postId !== post._id ?  post : res.data))
            setUserState(prevUserState => ({
              ...prevUserState, 
              posts: prevUserState.posts.map(post => 
                postId !== post._id ? post : res.data) }))
        })
        .catch(err => console.log(err))
    }

    function getAllComments() {
        userAxios.get(`/api/comments/`)
        .then((res) => {
          setAllComments(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.errMsg);
        });
    }
    
    function addComment(newComment){
        const postId = newComment.post
        userAxios.post(`/api/comments/${postId}`, newComment)
            .then(res => {
                setAllComments(prev => [...prev, res.data]);
            })
            .catch(err => console.log(err));
    }
    
    return (
        <UserContext.Provider
          value={{
            ...userState,
            allPosts,
            allComments,
            count,
            setCount,
            signup,
            login,
            logout,
            addPost,
            resetAuthErr,
            getUserPosts,
            deletePost,
            getAllPosts,
            upVotePost,
            downVotePost,
            getAllComments,
            addComment
          }}>
          { props.children }
        </UserContext.Provider>
    )
}