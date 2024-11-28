import React from "react";
import NavBar from "../common/NavBar";
import "../../assets/css/LandingPage.css";

function LandingPage() {
  return (
    <div className="landingPage-main">
      <NavBar />
      <div className="landingPage-con">
        <div className="landingPage-text">
          <h1>
            Book is a <br /> window to the world
          </h1>
          <p>wake up your dream by reading a book every day</p>
          <button>Read Now</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
