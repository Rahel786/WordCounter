import React from "react";

export default function Navbar(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top shadow-sm ${
        props.mode === "dark" ? "navbar-dark" : "navbar-light"
      }`}
      style={{
        backgroundColor:
          props.mode === "dark"
            ? "rgba(33, 37, 41, 0.8)" // dark semi-transparent
            : "rgba(255, 255, 255, 0.7)", // light semi-transparent
        backdropFilter: "blur(10px)", // glass blur effect
        WebkitBackdropFilter: "blur(10px)", // Safari support
      }}
    >
      <div className="container-fluid d-flex justify-content-between">
        {/* Brand Name */}
        <a className="navbar-brand fw-bold fs-3 text-primary" href="/">
          📝 Word Counter
        </a>

        {/* Dark / Light Mode Switch */}
        <div className="form-check form-switch d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            onChange={props.toggleMode}
            checked={props.mode === "dark"}
          />
          <label
            className="form-check-label ms-2"
            htmlFor="themeSwitch"
            style={{ cursor: "pointer" }}
          >
            {props.mode === "dark" ? "Dark" : "Light"} Mode
          </label>
        </div>
      </div>
    </nav>
  );
}
