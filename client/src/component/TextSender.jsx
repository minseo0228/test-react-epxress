import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TextSender.css";

export default function TextSender() {
  const [inputText, setInputText] = useState("");
  const [saveTexts, setSaveTexts] = useState([]);
  const [checkedTexts, setCheckedTexts] = useState({});

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    axios
      .post("http://localhost:8080/api/send", { text: inputText })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const loadSavedTexts = () => {
    axios
      .get("http://localhost:8080/api/load")
      .then((res) => {
        setSaveTexts(res.data);
        // Initialize checked state for new texts
        const newCheckedTexts = {};
        res.data.forEach((text) => {
          newCheckedTexts[text] = false;
        });
        setCheckedTexts(newCheckedTexts);
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = () => {
    // Delete only the checked texts
    const textsToDelete = Object.keys(checkedTexts).filter(
      (text) => checkedTexts[text]
    );
    // Assuming the server API accepts an array of texts to delete
    axios
      .post("http://localhost:8080/api/delete", { texts: textsToDelete })
      .then((res) => {
        console.log(res);
        // Remove the deleted texts from the saved texts and the checked texts
        setSaveTexts((texts) =>
          texts.filter((text) => !textsToDelete.includes(text))
        );
        setCheckedTexts((texts) => {
          const newCheckedTexts = { ...texts };
          textsToDelete.forEach((text) => {
            delete newCheckedTexts[text];
          });
          return newCheckedTexts;
        });
      })
      .catch((e) => console.log(e));
  };

  const handleCheck = (text) => {
    setCheckedTexts((texts) => ({
      ...texts,
      [text]: !texts[text],
    }));
  };

  useEffect(() => {
    loadSavedTexts();
  }, []);

  return (
    <div className="text-sender-container">
      <input className="input-text" type="text" onChange={handleInputChange} />
      <button className="button send-button" onClick={handleSend}>
        Send Text
      </button>
      <button className="button load-button" onClick={loadSavedTexts}>
        Load Text
      </button>
      <button className="button delete-button" onClick={handleDelete}>
        Delete Text
      </button>
      <ul className="text-list">
        {saveTexts.map((text, index) => (
          <li key={index} className="text-item">
            <input
              type="checkbox"
              checked={checkedTexts[text]}
              onChange={() => handleCheck(text)}
            />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
