import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Register = (props) => {

    const { users, setUsers } = props

    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [errForm, setErrForm] = useState({})
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)

    const changeHandler = (e) => {
        let { name, value } = e.target
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const formMessage = () => {
        return hasBeenSubmitted ? "Thank you, product has been saved!" : "Welcome, please enter a new product"
    }

    // if any of the product attributes are < it's length then set errCheck.(attribute) to true else false
    const errHandler = () => {
        let errCheck = {}
        formState.firstName.length < 1 ? (errCheck.firstName = true) : errCheck.firstName = false
        formState.lastName.length < 1 ? (errCheck.lastName = true) : errCheck.lastName = false
        formState.password.length < 8 ? (errCheck.password = true) : errCheck.password = false
        setErrForm(errCheck)
        // console.log(setErrForm)
        return (errCheck.firstName || errCheck.lastName || errCheck.password) // if any of the items is true, return true
    }

    // clears form after successful submission
    const clearForm = () => {
        setFormState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        })
    }

    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        // checks for errors, if there are no errors - (!errHandler()), then clear the form and set form has been submitted as True
        if (!errHandler()) {
            console.log("connecting to database and create user")
            console.log(formState)
            clearForm()
            setHasBeenSubmitted(true)
        }
        
        // make a post request to create a new user
        axios.post('http://localhost:8000/register', { ...formState })
            .then(res => {
                console.log(res)
                setFormState(...formState)

                setUsers([...users, res.data.result])
                console.log(setFormState)

            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={onSubmitHandler}>
                {formMessage()}
                <div>
                    <label>First Name</label><br />
                    <input name="firstName" type="text" onChange={changeHandler} value={formState.firstName} placeholder='firstName'/>
                    {errForm.firstName && (<p style={{ color: 'red' }}> Error in firstName</p>)}
                </div>
                <div>
                    <label>Last Name</label><br />
                    <input name="lastName" type="text" onChange={changeHandler} value={formState.lastName} />
                    {errForm.lastName && (<p style={{ color: 'red' }}> Error in lastName</p>)}
                </div>
                <div>
                    <label>Email</label><br />
                    <input name="email" type="text" onChange={changeHandler} value={formState.email} placeholder='email'/>
                    {errForm.email && (<p style={{ color: 'red' }}> Error in email</p>)}
                </div>
                <div>
                    <label>Password</label><br />
                    <input name="password" type="text" onChange={changeHandler} value={formState.password} />
                    {errForm.password && (<p style={{ color: 'red' }}> Error in password</p>)}
                </div>
                <div>
                    <button className="btn btn-lg btn btn-info">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register