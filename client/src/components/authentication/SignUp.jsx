import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import { loginContext } from '../LoginContext';

const Register = () => {

    const { users, setUsers } = useContext(loginContext);


    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errForm, setErrForm] = useState({})
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false)

    // show/hide button default
    const [show, setShow] = useState(false);

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
    const toast = useToast();

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

        } else {
            if (!formState.firstName || !formState.lastName || !formState.email || !formState.password || !formState.confirmPassword || !isValidEmail(formState.email)) {
                toast({
                    title: "Please Check All The Fields",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                return;
            }
            if (formState.password !== formState.confirmPassword) {
                toast({
                    title: "Passwords Do Not Match",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                return;
            }
        }

        // make a post request to create a new user
        axios.post('http://localhost:8000/register', { ...formState })
            .then(res => {
                // console.log(res)
                // setFormState(...formState)
                setUsers(true)
                navigate("/users");
                // console.log(formState)
            })
            .catch(err => console.log(err))
            
    }

    // shows or hides password
    const handleClick = () => setShow(!show);

    return (
        <VStack spacing='5px' color='black'>
            <FormControl id='firstName' isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                    name="firstName"
                    type="text"
                    onChange={changeHandler}
                    value={formState.firstName}
                    placeholder="First Name"
                />
            </FormControl>
            <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                    name="lastName"
                    type="text"
                    onChange={changeHandler}
                    value={formState.lastName}
                    placeholder="Last Name"
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    name="email"
                    type="text"
                    onChange={changeHandler}
                    value={formState.email}
                    placeholder="Email"
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        name="password"
                        type={show ? "text" : "password"}
                        onChange={changeHandler}
                        value={formState.password}
                        placeholder='Password'
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        name="confirmPassword"
                        type={show ? "text" : "password"}
                        onChange={changeHandler}
                        value={formState.confirmPassword}
                        placeholder='Confirm Password'
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={onSubmitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Register