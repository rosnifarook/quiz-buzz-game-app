import "./Signup.css";
import back from "../../assets/images/back.svg";
import { Link } from "react-router-dom";
import tologin from "../../assets/images/tologin.svg";
import register from "../../assets/images/register.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase/config"; // Import Firestore
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods

export const Signup = () => {
  const initialState = {
    username: { required: false },
    email: { required: false },
    password: { required: false },
  };
  const [errors, setErrors] = useState(initialState);
  const [accountCreated, setAccountCreated] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation check
    if (!username || !email || !password) {
      setErrors({
        username: { required: !username },
        email: { required: !email },
        password: { required: !password },
      });
      return;
    }

    // Clear errors if valid
    setErrors(initialState);
    setRegisterError("");
    setAccountCreated(false);

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(database, "users", user.uid), {
        username: username,
        email: email,
        password: password,
        rank: null,
        points: null,
        lastMatchDate: null,
      });

      console.log("Account created and data saved in Firestore");

      // Immediately sign out the user after signup because it will save it in local storage if not.
      await signOut(auth);
      console.log("User signed out after signup");

      setAccountCreated(true);

      // Delay navigation by 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      setAccountCreated(false);
      setRegisterError("User already exists or an error occurred");
    }
  };

  return (
    <>
      <div className="container">
        <div className="header-back-signup">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="mid-section">
          <p>Sign up</p>
        </div>

        <div className="box-container">
          <div className="box-signup">
            <form>
              <input
                className="username"
                type="text"
                name="username"
                id="username"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="email"
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="password"
                type="password"
                name="password"
                id="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <div className="error-span">
              {errors.username.required && <span>:( Username required</span>}
              {errors.email.required && <span>:( Email required</span>}
              {errors.password.required && <span>:( Password required</span>}
              {accountCreated && <span>:) Player registered successfully</span>}
              {registerError && <span>:( {registerError}</span>}
            </div>
            <div className="img-container">
              <Link to="/login">
                <img className="tosignup" src={tologin} alt="siginup" />
              </Link>
              <button type="submit" onClick={handleRegister}>
                <img className="play" src={register} alt="play" />
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
