import React from "react";
import "./Popup.css";
import { CirclePicker } from "react-color";

const Popup = ({
  groupName,
  handleGroupSubmit,
  handleColorChange,
  setGroupName,
}) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <h1>
          <b>Create New Notes Group</b>
        </h1>
        <form onSubmit={handleGroupSubmit}>
          <div className="name">
            <label className="group-name">Group Name:</label>
            <input
              type="text"
              id="group-name"
              value={groupName}
              placeholder="Enter your group name...."
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div className="color">
            <label className="group-color">Choose Color:</label>
            <div className="choose-color">
              <CirclePicker
                colors={[
                  "#B38BFA",
                  "#FF79F2",
                  "#43E6FC",
                  "#F19576",
                  "#0047FF",
                  "#6691FF",
                ]}
                onChange={handleColorChange}
              />
            </div>
          </div>

          <button type="submit">
            <span>Create Group</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
