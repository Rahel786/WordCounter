import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState(""); // start with empty string
  const [countSpaces, setCountSpaces] = useState(false); // toggle for spaces

  // Handlers
  const handleUpClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to UpperCase!","Success:");
  }
  const handleDownClick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to LowerCase!","Success:");
  }
  const handleClearClick = () => {
    setText("");
    props.showAlert("Text Cleared","Success:");
  }
  const handleCopy = () => {
    var text=document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("copied","Success:");
    
  };
  const handleOnChange = (event) => setText(event.target.value);

  // Stats
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = countSpaces ? text.length : text.replace(/\s/g, "").length;
  const sentenceCount = text.trim().split(/[.!?]+/).filter(Boolean).length;

  // Reading time (dynamic)
  let readingTime;
  if (wordCount === 0) {
    readingTime = "0 seconds";
  } else {
    const minutes = wordCount / 200; // 200 wpm
    if (minutes < 1) {
      readingTime = `${Math.ceil(minutes * 60)} seconds`;
    } else {
      readingTime = `${minutes.toFixed(2)} minutes`;
    }
  }

  // Dynamic styling
  const textColor = props.mode === "dark" ? "white" : "#212529";
  const bgColor = props.mode === "dark" ? "#1e1e1e" : "white";
  const cardBg = props.mode === "dark" ? "#2c2c2c" : "white";

  return (
    <div className="container mt-5" style={{ maxWidth: "800px", color: textColor }}>
      <h1 className="text-center mb-4">{props.heading || "Word Counter"}</h1>

      {/* Textarea */}
      <div className="mb-3">
        <textarea
          className={`form-control shadow-sm ${
            props.mode === "dark" ? "dark-placeholder" : "light-placeholder"
          }`}
          id="myBox"
          rows="8"
          value={text}
          onChange={handleOnChange}
          placeholder="Enter text here..."
          style={{
            fontSize: "16px",
            resize: "vertical",
            backgroundColor: bgColor,
            color: textColor,
          }}
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="d-flex flex-wrap mb-4">
        <button className="btn btn-primary m-1 animated-btn" onClick={handleUpClick} disabled={!text}>
          UPPERCASE
        </button>
        <button className="btn btn-primary m-1 animated-btn" onClick={handleDownClick} disabled={!text}>
          lowercase
        </button>
        <button className="btn btn-warning m-1 animated-btn" onClick={handleClearClick} disabled={!text}>
          Clear
        </button>
        <button className="btn btn-success m-1 animated-btn" onClick={handleCopy} disabled={!text}>
          Copy
        </button>
      </div>

      {/* Toggle Switch */}
      <div className="form-check form-switch mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="countSpacesSwitch"
          checked={countSpaces}
          onChange={() => setCountSpaces(!countSpaces)}
        />
        <label className="form-check-label" htmlFor="countSpacesSwitch">
          Count spaces in characters
        </label>
      </div>

      {/* Summary */}
      <div
        className={`card shadow-sm p-3 fade-card ${text.length > 0 ? "show" : ""}`}
        style={{ backgroundColor: cardBg, color: textColor }}
      >
        {text.length > 0 ? (
          <>
            <h3 className="mb-3">Your Text Summary</h3>
            <p>
              <span className="text-primary fw-bold">Words: {wordCount}</span>
              <br />
              <span className="text-success fw-bold">
                Characters ({countSpaces ? "with" : "without"} spaces): {charCount}
              </span>
              <br />
              <span className="text-danger fw-bold">Sentences: {sentenceCount}</span>
              <br />
              <span className="text-info fw-bold">Estimated Reading Time: {readingTime}</span>
            </p>
            <hr />
            <h5>Preview:</h5>
            <p
              className={text.length > 0 ? "" : props.mode === "dark" ? "text-secondary" : "text-muted"}
              style={{ color: textColor }}
            >
              {text.length > 0 ? text : "Nothing to preview"}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
