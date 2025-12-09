// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import RackList from "./pages/RackList";
import RackDetail from "./pages/RackDetail";
import RackForm from "./pages/RackForm";
import styled from "styled-components";

// 스타일 정의
const Nav = styled.nav`
  background: #004d40;
  color: white;
  padding: 1rem;
  display: flex;
  gap: 20px;
  font-weight: bold;
  a {
    color: white;
    text-decoration: none;
  }
`;

function App() {
  const [racks, setRacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가

  // 구 코드 -> 구 이름 변환 (데이터를 예쁘게 보여주기 위함)
  const districtMap = {
    28177: "연수구",
    28185: "남동구",
    28200: "부평구",
    28237: "계양구",
    28245: "서구",
    28260: "강화군",
    28710: "옹진군",
    28110: "중구",
    28140: "동구",
    28170: "미추홀구",
  };

  useEffect(() => {
    // 1. Open API 호출
    // setupProxy.js 덕분에 '/api'로 시작하면 인천시 서버로 연결됩니다.
    // 사용자가 제공한 GeoJSON URL의 뒷부분을 그대로 사용합니다.
    const fetchUrl =
      "/api/server/rest/services/Hosted/오픈데이터_교통시설물_정보_자전거보관소/FeatureServer/26/query?outFields=*&where=1%3D1&f=geojson";

    console.log("실제 Open API 요청 시작...");

    axios
      .get(fetchUrl)
      .then((res) => {
        console.log("Open API 응답 성공:", res.data); // 브라우저 콘솔에서 확인 가능

        // 데이터가 없거나 구조가 다를 경우 에러 처리
        if (!res.data.features) {
          throw new Error("데이터 구조가 올바르지 않습니다.");
        }

        const formattedData = res.data.features.map((feature) => {
          const guCode = feature.properties.gucd || "";
          return {
            id: feature.id, // GeoJSON의 고유 ID 사용
            // 이름이 없으므로 ID와 구 이름을 조합해 생성
            name: `자전거 보관소 ${feature.id}`,
            district: districtMap[guCode] || `구역(${guCode})`,
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
            capacity: feature.properties.sto_cnt || 0,
            updatedAt: feature.properties.update_ymd
              ? new Date(feature.properties.update_ymd).toLocaleDateString()
              : "2024-07-19",
          };
        });
        setRacks(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Open API 호출 실패:", err);
        setError(
          "인천시 Open API 서버에서 데이터를 가져오지 못했습니다. (CORS 또는 서버 문제)"
        );
        setLoading(false);
        // 여기에 가짜 데이터 fallback 코드가 있었으나, 요청대로 삭제함.
      });
  }, []);

  // 메모리 상에서의 CRUD (API는 읽기 전용이므로)
  const handleCreate = (newItem) =>
    setRacks([{ ...newItem, id: Date.now() }, ...racks]);
  const handleUpdate = (id, updatedItem) =>
    setRacks(
      racks.map((item) =>
        item.id === parseInt(id) ? { ...updatedItem, id: parseInt(id) } : item
      )
    );
  const handleDelete = (id) =>
    setRacks(racks.filter((item) => item.id !== parseInt(id)));

  return (
    <BrowserRouter>
      <Nav>
        <Link to="/">🚲 인천 자전거(Open API)</Link>
        <Link to="/list">보관소 찾기</Link>
        <Link to="/my">마이페이지</Link>
      </Nav>

      <div style={{ padding: "20px" }}>
        {loading && <h3>🔄 인천시 실시간 데이터 불러오는 중...</h3>}

        {error && (
          <div
            style={{ color: "red", border: "1px solid red", padding: "20px" }}
          >
            <h3>⚠️ 오류 발생</h3>
            <p>{error}</p>
            <p>1. npm start를 껐다가 다시 켜보세요.</p>
            <p>2. setupProxy.js 파일이 src 폴더에 있는지 확인하세요.</p>
          </div>
        )}

        {!loading && !error && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<RackList racks={racks} />} />
            <Route
              path="/detail/:id"
              element={<RackDetail racks={racks} onDelete={handleDelete} />}
            />
            <Route
              path="/create"
              element={<RackForm onCreate={handleCreate} />}
            />
            <Route
              path="/update/:id"
              element={<RackForm racks={racks} onUpdate={handleUpdate} />}
            />
            {/* MyPage 컴포넌트는 기존 코드 유지 */}
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
