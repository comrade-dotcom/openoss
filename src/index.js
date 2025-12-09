import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css"; // 위에서 만든 CSS 불러오기
import App from "./App"; // 아까 만든 App.js 불러오기

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React.StrictMode는 개발 모드에서 잠재적 문제를 감지하기 위해 두 번 렌더링합니다.
  // API가 두 번 호출되는 게 싫으면 <App />만 남기고 지워도 됩니다.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
