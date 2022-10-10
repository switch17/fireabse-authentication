import React from "react";
import { Routes, Route } from "react-router-dom";

// context
import { AuthContextProvider } from "./context/AuthContext";

// styles
import { Container } from "react-bootstrap";

// components
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

// private routes
import PrivateRoute from "./Routes/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <div className="App">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Routes>
              <Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>} />
              <Route  path="/signup" element={<SignUp />} />
              <Route  path="/signin" element={<SignIn />} />
              <Route  path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </Container>
      </div>
    </AuthContextProvider>
  );
};

export default App;
