import "./Notesarea.css";
import Arrow from "../../assets/arrow.png";
import Backarrow from "../../assets/backarrow.png";
import { useState, useEffect } from "react";

const Notesarea = ({ selectedGroup, handleGoBack }) => {
  const [notes, setNotes] = useState(selectedGroup.notes || "");
  const [noteList, setNoteList] = useState(() => {
    const storedNotes = localStorage.getItem(`noteList-${selectedGroup.name}`);
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const words = selectedGroup.name.split(" ").slice(0, 2);
  const firstChars = words.map((word) => word.charAt(0).toUpperCase());
  const initials = firstChars.join("");

  const handleChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSaveNotes = () => {
    if (notes.trim() === "") {
      return;
    }
    const currentDateObj = new Date();
    const formattedDate = `${currentDateObj.getDate()} ${currentDateObj.toLocaleString(
      "default",
      { month: "long" }
    )}, ${currentDateObj.getFullYear()}`;
    const formattedTime = currentDateObj.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    localStorage.setItem(`notes-${selectedGroup.name}`, notes);
    selectedGroup.notes = notes;
    const newNoteList = [
      ...noteList,
      { text: notes, time: formattedTime, date: formattedDate },
    ];

    setNoteList(newNoteList);
    localStorage.setItem(
      `noteList-${selectedGroup.name}`,
      JSON.stringify(newNoteList)
    );
    setNotes("");
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem(`notes-${selectedGroup.name}`);
    if (storedNotes) {
      setNotes(storedNotes);
      setNotes("");
    }
    const storedNoteList = localStorage.getItem(
      `noteList-${selectedGroup.name}`
    );
    setNoteList(storedNoteList ? JSON.parse(storedNoteList) : []);
  }, [selectedGroup]);

  return (
    <div className={"notes-container"}>
      <div className="displayed-group">
        <div className="back-arrow" handleGoBack={handleGoBack}>
          <img src={Backarrow} alt=""></img>
        </div>
        <div
          className="circlename"
          style={{ backgroundColor: selectedGroup.color }}
        >
          {initials}
        </div>
        <div className="name">
          <p>{selectedGroup.name}</p>
        </div>
      </div>
      <div className="notesarea">
        {noteList.map((note, index) => (
          <div className="notes" key={index}>
            <div className="notes-text">{note.text}</div>
            <div className="notes-time">{note.time}</div>
            <div className="notes-date">{note.date}</div>
          </div>
        ))}
      </div>

      <div className="textarea">
        <textarea
          placeholder="Enter your text here..........."
          value={notes}
          onChange={handleChange}
        ></textarea>
        <img src={Arrow} alt="" onClick={handleSaveNotes}></img>
      </div>
    </div>
  );
};

export default Notesarea;
