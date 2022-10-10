import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// bootstrap
import { Card, Button, Alert } from "react-bootstrap";

import { useAuthContext } from "../context/AuthContext";



const Dashboard = () => {
  // redirect on sign out
  const navigate = useNavigate();

  const { logOut, currentUser } = useAuthContext();

  // state to store errors
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setError("");
    try {
      await logOut();
      navigate("/signin");
    } catch (error) {
      setError("could not sign out!");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <h3>Email: {currentUser.email}</h3>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link " onClick={handleSignOut} className="primary">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
