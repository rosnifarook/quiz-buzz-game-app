import "./Difficulty.css";
import back from "../../assets/images/back.svg";
import diff1 from "../../assets/images/diff1.svg";
import diff2 from "../../assets/images/diff2.svg";
import diff3 from "../../assets/images/diff3.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const Difficulty = () => {
  const userDetails = useContext(UserContext);
  console.log(userDetails);

  return (
    <>
      <div className="container">
        <div className="header-back-diff">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="mid-section">
          <p>Difficulty</p>
        </div>

        <div className="diff-section">
          <Link to="/thegame" state={{ timer: 30 }}>
            <button>
              <img src={diff1} alt="difficulty1" />
            </button>
          </Link>
          <Link to="/thegame" state={{ timer: 25 }}>
            <button>
              <img src={diff2} alt="difficulty2" />
            </button>
          </Link>
          <Link to="/thegame" state={{ timer: 20 }}>
            <button>
              <img src={diff3} alt="difficulty3" />
            </button>
          </Link>
          <div className="footer">
            <p>V1.0</p>
            <p>made by: rosni farook</p>
          </div>
        </div>
      </div>
    </>
  );
};
