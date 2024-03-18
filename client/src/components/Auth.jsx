import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../context/UserProvider.jsx'

const initInputs = { username: "", password: "" }

export default function Auth(){
    const [inputs, setInputs] = useState(initInputs);
    const [toggle, setToggle] = useState(false);
    const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target 
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
        console.log("button clciked")
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return (
        <div className="auth-container">
            { !toggle ? 
                <>
                    <h1>Signing up?</h1>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText="Sign up"
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Already a member?</p>
                </>
                :
                <>
                    <h1>Logging in?</h1>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText="Login"
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Not a member?</p>
                </>
            }
        </div>
    )
}