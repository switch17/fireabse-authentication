import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// context
import { useAuthContext } from "../context/AuthContext";

// bootstrap
import { Form, Button, Card, Alert } from "react-bootstrap";

const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  // const phoneRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp } = useAuthContext();

  // const userProfile = {
  //   name: nameRef.currrent.value,
  //   email: emailRef.currrent.value,
  //   password: passwordRef.currrent.value,
  //   phone: phoneRef.current.value,
  // };

  //   redirect to dashboard if signed up
  const navigate = useNavigate();

  //   state to keep track of errors
  const [error, setError] = useState("");

  //   state to diable button till the details have been filled and user is registered
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // checking if password & confirm pass matches
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match :(");
    }

    try {
      setError("");
      setIsLoading(true);
      // await signUp(userProfile);
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Oops! Failed to create and account :(");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error} </Alert>}
          <Form onSubmit={handleSubmit}>
            {/*<Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required ref={nameRef}></Form.Control>
  </Form.Group>*/}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordConfirmRef}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" disabled={isLoading} className="w-100 mt-4">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signin">sign in!</Link>
      </div>
    </>
  );
};

export default SignUp;
