import React from "react";
import ReactDOM from "react-dom/client";
import PerformanceCalendar from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <PerformanceCalendar />
    </div>
  </React.StrictMode>
);
