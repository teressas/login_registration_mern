import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {

    const { users, setUsers } = props

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })

    const [errForm, setErrForm] = useState({})
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)

    const changeHandler = e => {
        let { name, value } = e.target
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    // validates email
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // if any of the user attributes are < it's length then set errCheck.(attribute) to true else false
    const errHandler = () => {
        let errCheck = {}
        // checks email length or validates email
        formState.email.length < 1 || (!isValidEmail(formState.email)) ? (errCheck.email = true) : errCheck.email = false
        formState.password.length < 8 ? (errCheck.password = true) : errCheck.password = false
        // || (formState.password !== formState.confirmPassword)
        setErrForm(errCheck)
        // console.log(setErrForm)
        return (errCheck.email || errCheck.password) // if any of the items is true, return true
    }

    // clears form after successful submission
    const clearForm = () => {
        setFormState({
            email: "",
            password: ""
        })
    }

    const navigate = useNavigate();

    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        // checks for errors, if there are no errors - (!errHandler()), then clear the form and set form has been submitted as True
        if (!errHandler()) {
            console.log("connecting to database and creating user")
            console.log(formState)
            clearForm()
            setHasBeenSubmitted(true)
            navigate("/dashboard");    

        }
        
        
        // make a post request to create a new user 
        axios.post('http://localhost:8000/login', { ...formState })
            .then((res) => {
                console.log(res)
                setFormState(...formState)
                setUsers([...users, res.data.result])
                console.log(setFormState)
                
            })
            .catch(err => console.log(err))
        
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>Email</label><br />
                    <input name="email" type="text" onChange={changeHandler} value={formState.email} placeholder='Email' />
                    {errForm.email && (<p style={{ color: 'red' }}> Error in email</p>)}
                </div>
                <div>
                    <label>Password</label><br />
                    <input name="password" type="password" onChange={changeHandler} value={formState.password} placeholder='Password' />
                    {errForm.password && (<p style={{ color: 'red' }}> Error in password</p>)}
                </div>
                <div>
                    <button className="btn btn-lg btn btn-info">Submit</button>
                </div>
                <Link to="/register"> Register </Link>
            </form>
        </div>
    )
}

export default Login