import "./Groups.css";
import { useState } from "react";
import Popup from "../Popup/Popup.jsx";
import Notesarea from "../Notesarea/Notesarea.jsx";
import Notes from "../Notes/Notes.jsx";
import React from "react";

const Groups = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("white");
  const [groups, setGroups] = useState([]);

  const handleCreateGroup = () => {
    setShowPopup(true);
    setSelectedGroup(null);
  };

  const handleGoBack = () => {
    setSelectedGroup(null);
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
    const isDuplicate = groups.some((group) => group.name === groupName);
    if (isDuplicate) {
      alert("A group with the same name already exists.");
      return;
    }
    setGroups([...groups, { name: groupName, color: groupColor }]);
    setGroupName("");
    setGroupColor("#B38BFA");
  };

  const handleColorChange = (color) => {
    setGroupColor(color.hex);
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    const notes = localStorage.getItem(`notes-${group.name}`);
    if (notes) {
      group.notes = notes;
    }
  };

  return (
    <div className="groups-container">
      <div className="pocket-notes">
        <p>
          <b>Pocket Notes</b>
        </p>
      </div>
      <div className="create-notes" onClick={handleCreateGroup}>
        <span>
          <b>+</b>
        </span>
        <p>
          <b>Create Notes Group</b>
        </p>
      </div>
      {showPopup && (
        <Popup
          groupName={groupName}
          groupColor={groupColor}
          handleGroupSubmit={handleGroupSubmit}
          handleColorChange={handleColorChange}
          setGroupName={setGroupName}
          setGroupColor={setGroupColor}
        />
      )}
      {!showPopup && (
        <div className="components">
          <div className="groups-list">
            {groups.map((group, index) => {
              const words = group.name.split(" ").slice(0, 2);
              const firstChars = words.map((word) =>
                word.charAt(0).toUpperCase()
              );
              const initials = firstChars.join("");
              const isSelected = selectedGroup && selectedGroup === group;
              return (
                <div
                  className={`group ${isSelected ? "selected" : ""}`}
                  key={index}
                  onClick={() => handleSelectGroup(group)}
                >
                  <div
                    className="circle"
                    style={{ backgroundColor: group.color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p>{group.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="notes-displayed">
            {selectedGroup ? (
              <Notesarea
                selectedGroup={selectedGroup}
                handleGoBack={handleGoBack}
              />
            ) : (
              <Notes />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
