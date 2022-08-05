import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import { loginContext, LoginContextProvider } from '../LoginContext';

const Login = () => {

    const { users, setUsers } = useContext(loginContext);
    // console.log("outside of axios", users)

    const [formState, setFormState] = useState({
        email: "",
        password: ""
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

        } 
        else {
            if (!formState.email || !isValidEmail(formState.email) || !formState.password) {
                toast({
                    title: "Please Check All The Fields",
                    status: "warning",
                    duration: 5000,
                    disClosable: true,
                    position: "bottom",
                });
                return;
            }
        }

        // make a post request to create a new user 
        axios.post('http://localhost:8000/login', { ...formState })
            .then(res => {
                // console.log(res)
                // setFormState(...formState)
                setUsers(true)
                navigate("/users");
                // console.log("axios.then",users)
                // console.log(formState)
            })
            .catch(err => console.log(err))
    }

    // shows or hides password
    const handleClick = () => setShow(!show);

    return (
        <VStack spacing='5px' color='black'>
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
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={onSubmitHandler}
            >
                Login
            </Button>
            {/* <Button
                variant="solid"
                colorScheme="yellow"
                width="100%"
                onClick={() => {
                    setFormState({
                        ...formState,
                        email: "guest@example.com",
                        password: "12345678"
                    })
                }}
            >
                Get Guest User Credentials
            </Button> */}
        </VStack>

    )
}

export default Login