import "./Notes.css";
import Image from "../../assets/image-preview 1.png";
import Lock from "../../assets/lock.png";
import React from "react";
const Notes = () => {
  return (
    <div className="notes-containers">
      <div className="image">
        <img src={Image} alt=""></img>
      </div>
      <div className="heading">
        <h1>Pocket Notes</h1>
      </div>
      <div className="sub-heading">
        <p>
          Send and recieve messages without keeping your phone online.<br></br>
          Use Pocket Notes on upto 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className="encryption">
        <img src={Lock} alt=""></img>
        <span>end-to-end encrypted</span>
      </div>
    </div>
  );
};

export default Notes;
