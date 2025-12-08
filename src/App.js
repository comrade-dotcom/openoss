import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RackList from "./pages/RackList";
import RackDetail from "./pages/RackDetail";
import RackForm from "./pages/RackForm"; // Create & Update 겸용
import MyPage from "./pages/MyPage";
import styled from "styled-components";

// 간단한 네비게이션 바 스타일
const Nav = styled.nav`
  background: #333;
  color: white;
  padding: 1rem;
  display: flex;
  gap: 20px;
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Nav>
        <Link to="/">🚲 인천 자전거(Home)</Link>
        <Link to="/list">보관소 찾기</Link>
        <Link to="/my">마이페이지</Link>
      </Nav>

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<RackList />} />
          <Route path="/detail/:id" element={<RackDetail />} />
          <Route path="/create" element={<RackForm />} />
          <Route path="/update/:id" element={<RackForm />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
