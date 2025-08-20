import "./LoginSignup.css";
import back from "../../assets/images/back.svg";
import bananapixelart from "../../assets/images/banana-pixel-art.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

export const LoginSignup = () => {
  const userDetails = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header-back">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="hero-section">
          <div className="hero-text">
            <p>BANANA RUSH</p>
          </div>
          <div className="banana-line">
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
          </div>
        </div>
        <div className="play-button2">
          <Link to="/login">LOGIN</Link>
          <Link to="/signup">SIGN UP</Link>
          {userDetails ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
          {/* <Link>PLAY AS A GUEST</Link> */}
        </div>
        {/* <div className="play-btn-text">
          <p>Solve the banana quiz to gain more points and climb the rank </p>
        </div> */}
        <div className="footer">
          <p>V1.0</p>
          <p>made by: Rosni Farook</p>
        </div>

        {/* <p>Copyright © 2022 BANANA RUSH. All rights reserved.</p> */}
      </div>
    </>
  );
};
