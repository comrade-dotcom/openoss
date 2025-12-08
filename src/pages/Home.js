import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>인천 자전거 보관대 찾기 서비스</h1>
      <p>내 주변의 안전한 자전거 보관소를 찾아보세요.</p>
      <Link to="/list">
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          지금 찾으러 가기 🔍
        </button>
      </Link>
    </div>
  );
};

export default Home;
