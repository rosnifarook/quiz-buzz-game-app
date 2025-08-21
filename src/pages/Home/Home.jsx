import "./Home.css";
import InfoIcon from "../../assets/images/Info.svg";
import bananapixelart from "../../assets/images/banana-pixel-art.svg";
import audioPlay from "../../assets/images/audio_play.svg";
import audioPause from "../../assets/images/audio_pause.svg";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { auth, database } from "../../firebase/config"; // Import Firebase services
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { signOut } from "firebase/auth"; // Import Firebase signOut function
import { UserContext } from "../../context/UserContext";

import themeSong from "../../assets/sounds/Homeandrank .mp3";
import gameStart from "../../assets/sounds/game-start.mp3";

import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [username, setUsername] = useState("Fetching..."); // State to hold the username
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const bgAudio = new Audio(themeSong);
  const gameStartAudio = new Audio(gameStart);

  const navigate = useNavigate(); // Initialize navigate function

  const firebaseUser = useContext(UserContext);

  // Fetch username and authentication state
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const userUid = user.uid; // Get current user's UID
            const userDocRef = doc(database, "users", userUid); // Reference Firestore document
            const userDoc = await getDoc(userDocRef); // Fetch the document

            if (userDoc.exists()) {
              setUsername(userDoc.data().username); // Set the username from Firestore data
            } else {
              console.log("User document does not exist");
              setUsername("Unknown User");
            }
            setIsLoggedIn(true); // Mark as logged in
          } else {
            setUsername("Guest"); // Handle case where no user is logged in
            setIsLoggedIn(false); // Mark as not logged in
          }
        });

        return () => unsubscribe(); // Clean up the listener when the component unmounts
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("Error fetching username");
      }
    };

    fetchUsername(); // Call the function on component mount
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUsername("Guest");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const playAudiobg = async () => {
    bgAudio.loop = true; // Enable looping
    try {
      await bgAudio.play(); // Wait for the audio to start playing
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const pauseAudiobg = async () => {
    bgAudio.pause();
  };

  const playAudioStartandNavigate = async () => {
    try {
      await gameStartAudio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
    bgAudio.pause();

    // Navigate based on authentication status
    if (isLoggedIn) {
      navigate("/difficulty");
    } else {
      navigate("/LoginSignup");
    }
  };

  return (
    <>
      <div className="container">
        <div className="audio-btn-home">
          <div className="audio-btn">
            <button onClick={playAudiobg}>
              <img src={audioPlay} alt="" />
            </button>
            <button onClick={pauseAudiobg}>
              <img src={audioPause} alt="" />
            </button>
          </div>
        </div>

        <div className="header-icon">
          <Link to="/details">
            <img src={InfoIcon} alt="Banana Login Signup" />
          </Link>
          <div className="old-user-container">
            <h1 className="user-name">
              {firebaseUser === undefined
                ? "Loading..."
                : firebaseUser && firebaseUser.displayName
                ? firebaseUser.displayName
                : username}
            </h1>
            {/* Display the username */}
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
            {/* Logout button */}
          </div>
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
        <div className="play-button">
          <button onClick={playAudioStartandNavigate}>PLAY</button>
        </div>
        <div className="play-btn-text">
          <p>Solve the banana quiz to gain more points and climb the rank </p>
        </div>
        <div className="footer">
          <p>V1.0</p>
          <p>made by: rosni farook</p>
        </div>

        {/* <p>Copyright © 2022 BANANA RUSH. All rights reserved.</p> */}
      </div>
    </>
  );
};
