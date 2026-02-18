import React from "react";
import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="weather-app">
        <Weather />

        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/Sarina-Karimi"
            target="_blank"
            rel="noreferrer"
          >
            Sarina Karimi
          </a>
          , is{" "}
          <a
            href="https://github.com/Sarina-Karimi/my-app"
            target="_blank"
            rel="noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://app.netlify.com/projects/myreactweatherrapp/overview"
            target="_blank"
            rel="noreferrer"
          >
            hosted on Netlify
          </a>
          .
        </footer>
      </div>
    </div>
  );
}

export default App;
