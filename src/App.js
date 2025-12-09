import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// ⚠️ 수정됨: 파일들이 pages 폴더 안에 있다면 경로를 이렇게 지정해야 합니다.
import Home from "./pages/Home";
import RackList from "./pages/RackList";
import RackDetail from "./pages/RackDetail";
import RackForm from "./pages/RackForm";
import MyPage from "./pages/MyPage";

const Nav = styled.nav`
  background: #004d40;
  color: white;
  padding: 1rem;
  display: flex;
  gap: 20px;
  font-weight: bold;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: #a7ffeb;
    }
  }
`;

function App() {
  const [racks, setRacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ... (이하 로직은 기존과 동일하므로 그대로 두시면 됩니다)
  // ⭐ 즐겨찾기 상태: { rackId: number, memo: string }[]
  const [favorites, setFavorites] = useState([]);

  // 구 코드 -> 구 이름 변환 맵
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
    // 실제 오픈 API 호출
    const fetchUrl =
      "/api/server/rest/services/Hosted/오픈데이터_교통시설물_정보_자전거보관소/FeatureServer/26/query?outFields=*&where=1%3D1&f=geojson";

    axios
      .get(fetchUrl)
      .then((res) => {
        if (!res.data.features) throw new Error("데이터 구조 오류");
        const formattedData = res.data.features.map((feature) => {
          const guCode = feature.properties.gucd || "";
          return {
            id: feature.id, // ID는 숫자형으로 유지
            name: `자전거 보관소 ${feature.id}`, // 이름 정보가 없을 경우 ID 활용
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
        console.error("API Error:", err);
        setError("데이터를 불러오지 못했습니다. (CORS 문제일 수 있음)");
        setLoading(false);
      });
  }, []);

  // --- CRUD 핸들러 ---
  const handleCreateRack = (newItem) => {
    setRacks((prev) => [{ ...newItem, id: Date.now() }, ...prev]);
  };

  const handleUpdateRack = (id, updatedItem) => {
    setRacks((prev) =>
      prev.map((item) =>
        item.id === parseInt(id) ? { ...updatedItem, id: parseInt(id) } : item
      )
    );
  };

  const handleDeleteRack = (id) => {
    setRacks((prev) => prev.filter((item) => item.id !== parseInt(id)));
    // 보관소 삭제 시 즐겨찾기에서도 제거
    setFavorites((prev) => prev.filter((fav) => fav.rackId !== parseInt(id)));
  };

  // --- 즐겨찾기 핸들러 ---
  const addFavorite = (rackId) => {
    if (favorites.some((fav) => fav.rackId === rackId)) return;
    setFavorites([...favorites, { rackId, memo: "" }]);
    alert("즐겨찾기에 추가되었습니다!");
  };

  const removeFavorite = (rackId) => {
    setFavorites(favorites.filter((fav) => fav.rackId !== rackId));
  };

  const updateFavoriteMemo = (rackId, newMemo) => {
    setFavorites(
      favorites.map((fav) =>
        fav.rackId === rackId ? { ...fav, memo: newMemo } : fav
      )
    );
  };

  return (
    <BrowserRouter>
      <Nav>
        <Link to="/">🚲 인천 자전거</Link>
        <Link to="/list">보관소 찾기</Link>
        <Link to="/my">마이페이지</Link>
      </Nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {loading && (
          <h3 style={{ textAlign: "center" }}>데이터 로딩 중... 🚲</h3>
        )}
        {error && (
          <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
        )}

        {!loading && !error && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/list"
              element={
                <RackList
                  racks={racks}
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              }
            />
            <Route
              path="/detail/:id"
              element={
                <RackDetail
                  racks={racks}
                  onDelete={handleDeleteRack}
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              }
            />
            <Route
              path="/create"
              element={<RackForm racks={racks} onCreate={handleCreateRack} />}
            />
            <Route
              path="/update/:id"
              element={<RackForm racks={racks} onUpdate={handleUpdateRack} />}
            />
            <Route
              path="/my"
              element={
                <MyPage
                  racks={racks}
                  favorites={favorites}
                  removeFavorite={removeFavorite}
                  updateFavoriteMemo={updateFavoriteMemo}
                />
              }
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
