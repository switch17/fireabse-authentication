import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// context
import { useAuthContext } from "../context/AuthContext";

// bootstrap
import { Form, Button, Card, Alert } from "react-bootstrap";

const SignIn = () => {
  // navigate to dashboard after logging in
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuthContext();

  //   state to keep track of errors
  const [error, setError] = useState("");

  //   state to diable button till the details have been filled and user is registered
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Invalid email/password :(");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger">{error} </Alert>}
          <Form onSubmit={handleSubmit}>
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
            <Button type="submit" disabled={isLoading} className="w-100 mt-4">
              Sign In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">sign up!</Link>
      </div>
    </>
  );
};

export default SignIn;
