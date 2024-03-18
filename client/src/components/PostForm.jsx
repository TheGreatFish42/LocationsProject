import React, { useState } from "react";

const initInputs = {
    destination: "",
    description: "",
    imgUrl: ""
}

export default function PostForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const { destination, description, imgUrl } = inputs
    const { addPost } = props

    function handleChange(e){
        const {name, value} = e.target 
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addPost(inputs)
        setInputs(initInputs)
      }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="destination"
                value={destination}
                onChange={handleChange}
                placeholder="Destination"/>
            <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"/>
            <input
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={handleChange}
                placeholder="Image Url"/>
            <button>Add Post</button>
        </form>
    )
}