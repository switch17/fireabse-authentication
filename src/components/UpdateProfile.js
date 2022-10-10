import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// context
import { useAuthContext } from "../context/AuthContext";

// bootstrap
import { Form, Button, Card, Alert } from "react-bootstrap";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, updateUserEmail, updateUserPassword } = useAuthContext();

  //   redirect to dashboard if signed up
  const navigate = useNavigate();

  //   state to keep track of errors
  const [error, setError] = useState("");

//   state for message
const [message, setMessage] = useState("")

  //   state to diable button till the details have been filled and user is registered
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSubmit = async (e) => {
      e.preventDefault();
      
      setIsLoading(true);
      setMessage("");
      setError("");
    
      //   promises
      const promises = [];
      if (emailRef.current.value !== currentUser.email) {
        promises.push(updateUserEmail(emailRef.current.value));
      }
      if ( passwordRef.current.value !== currentUser.password) {
        promises.push(updateUserPassword(passwordRef.current.value));
      }
    
      Promise
        .all(promises)
        .then(() => {
            setMessage("Profile Updated!!!  Redirecting to dashboard in 5s")
            setTimeout(() => {
                navigate("/");
            }, 5000);
        })
        .catch((error) => {
          console.log(error);
          setError("Failed to update account!");
        })
        .finally(() => {
          setIsLoading(true);
          setError("");
        });

    // checking if password & confirm pass matches

    // try {
    //   setError("");
    //   setIsLoading(true);
    //   //   await updateProfile(emailRef.current.value, passwordRef.current.value);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    //   setError("Oops! Failed to create and account :(");
    // }
    // setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {message && <Alert variant="success">{message} </Alert>}
          {error && <Alert variant="danger">{error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}></Form.Control>
            </Form.Group>
            <Button type="submit" disabled={isLoading} className="w-100 mt-4">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 btn btn-primary">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
