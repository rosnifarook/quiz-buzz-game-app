import "./Login.css";
import back from "../../assets/images/back.svg";
import { Link } from "react-router-dom";
import tosignup from "../../assets/images/tosignup.svg";
import play from "../../assets/images/play.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../../firebase/config";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

export const Login = () => {
  const initialState = {
    email: { required: false },
    password: { required: false },
  };
  const [errors, setErrors] = useState(initialState); // Error state for form validation
  const [loginError, setLoginError] = useState(""); // Error message from Firebase
  const [loginSuccess, setLoginSuccess] = useState(false); // Success message state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Validation: Check if email and password are entered
    if (!email || !password) {
      setErrors({
        email: { required: !email },
        password: { required: !password },
      });
      return; // Exit if validation fails
    }

    // Clear errors and reset messages
    setErrors(initialState);
    setLoginError("");
    setLoginSuccess(false);

    try {
      // Set session persistence
      await setPersistence(auth, browserLocalPersistence);

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      setLoginSuccess(true); // Set success message

      // Delay navigation by 2 seconds to show success message
      setTimeout(() => {
        navigate("/difficulty");
      }, 2000); // 2000 ms = 2 seconds
    } catch (error) {
      console.log(error);
      setLoginSuccess(false); // Reset success message
      setLoginError("Invalid email or password"); // Set login error message
    }
  };

  return (
    <>
      <div className="container">
        <div className="header-back-login">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="mid-section">
          <p>Login</p>
        </div>

        <div className="box-container">
          <div className="box">
            <form>
              <input
                className="username"
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <input
                className="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
            </form>
            <div className="error-span">
              {errors.email.required && <span>:( Email is required</span>}
              {errors.password.required && <span>:( Password is required</span>}
              {loginSuccess && (
                <span>:) Login successful! Enjoy the Game :)</span>
              )}
              {loginError && <span>:( {loginError}</span>}
            </div>
            <div className="img-container">
              <Link to="/signup">
                <img className="tosignup" src={tosignup} alt="signup" />
              </Link>
              <button type="submit" onClick={handleLogin}>
                <img className="play" src={play} alt="play" />
              </button>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>V1.0</p>
          <p>made by: rosni farook</p>
        </div>
      </div>
    </>
  );
};
