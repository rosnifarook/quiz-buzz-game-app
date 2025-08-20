import "./Details.css";
import back from "../../assets/images/back.svg";
import info from "../../assets/images/info-img.svg";
import github from "../../assets/images/github.svg";

import { Link } from "react-router-dom";

export const Details = () => {
  return (
    <>
      <div className="container-detail">
        <div className="github">
          <a
            href="https://github.com/rosnifarook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="" />
          </a>
        </div>

        <div className="header-back-info">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>
        <div className="main-header">
          <p>Banana Rush - Info</p>
        </div>
        <div className="black-fade-container">
          <img src={info} alt="" />
        </div>
      </div>
    </>
  );
};
