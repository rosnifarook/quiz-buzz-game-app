import ErrorBanana from "../../assets/images/errorBanana.png";
import "./Error.css";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <div className="errorContainer">
        <h1>Error 404</h1>
        <h3>
          You are not supposed to come here...{" "}
          <span>Click the banana house !!!</span>
        </h3>
        <Link to="/">
          <img src={ErrorBanana} alt="errorrrrrrrrr" />
        </Link>
      </div>
    </>
  );
};
