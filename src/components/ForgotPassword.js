import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

// context
import { useAuthContext } from "../context/AuthContext";

// bootstrap
import { Form, Button, Card, Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuthContext();

  //   state to keep track of errors
  const [error, setError] = useState("");

  //   state to store messages
  const [message, setMessage] = useState("");

  //   state to diable button till the details have been filled and user is registered
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(
        "We've sent a mail to reset the password, check your inbox for further details :) "
      );
    } catch (error) {
      console.log(error);
      setError("Could not reset password :(");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {message && <Alert variant="success">{message} </Alert>}
          {error && <Alert variant="danger">{error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>

            <Button type="submit" disabled={isLoading} className="w-100 mt-4">
              Reset
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/signin">Sign In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">sign up!</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
