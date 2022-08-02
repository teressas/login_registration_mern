import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {

    const { users, setUsers } = props

    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
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

    const formMessage = () => {
        return hasBeenSubmitted ? "Thank you, your information has been submitted!" : "Welcome, please register below."
    }

    // validates email
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    // if any of the user attributes are < it's length then set errCheck.(attribute) to true else false
    const errHandler = () => {
        let errCheck = {}
        formState.firstName.length < 1 ? (errCheck.firstName = true) : errCheck.firstName = false
        formState.lastName.length < 1 ? (errCheck.lastName = true) : errCheck.lastName = false
        // checks email length or validates email
        formState.email.length < 1 || (!isValidEmail(formState.email)) ? (errCheck.email = true) : errCheck.email = false 
        formState.password.length < 8 ? (errCheck.password = true) : errCheck.password = false
        formState.confirmPassword.length < 8 ? (errCheck.confirmPassword = true) : errCheck.confirmPassword = false
        // || (formState.password !== formState.confirmPassword)
        setErrForm(errCheck)
        // console.log(setErrForm)
        return (errCheck.firstName || errCheck.lastName || errCheck.email || errCheck.password || errCheck.confirmPassword) // if any of the items is true, return true
    }

    // clears form after successful submission
    const clearForm = () => {
        setFormState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
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
        }
        

        // make a post request to create a new user
        axios.post('http://localhost:8000/register', { ...formState })
            .then( res => {
                console.log(res)
                setFormState(...formState)

                setUsers([...users, res.data.result])
                console.log(setFormState)          

            })
            .catch(err => console.log(err))
        
        navigate("/login");    
    }

    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={onSubmitHandler}>
                {formMessage()}
                <div>
                    <label>First Name</label><br />
                    <input name="firstName" type="text" onChange={changeHandler} value={formState.firstName} placeholder='First Name' />
                    {errForm.firstName && (<p style={{ color: 'red' }}> Error in firstName</p>)}
                </div>
                <div>
                    <label>Last Name</label><br />
                    <input name="lastName" type="text" onChange={changeHandler} value={formState.lastName} placeholder='Last Name' />
                    {errForm.lastName && (<p style={{ color: 'red' }}> Error in lastName</p>)}
                </div>
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
                    <label>Confirm Password</label><br />
                    <input name="confirmPassword" type="password" onChange={changeHandler} value={formState.confirmPassword} placeholder='Confirm Password' />
                    {errForm.confirmPassword && (<p style={{ color: 'red' }}> Error in confirm password</p>)}
                </div>
                <div>
                    <button className="btn btn-lg btn btn-info">Register</button>
                </div><br />
                <Link to="/login"> Existing User? Login Here </Link>
            </form>
        </div>
    )
}

export default Register