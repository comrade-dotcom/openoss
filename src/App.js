import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import RackList from "./pages/RackList";
import RackDetail from "./pages/RackDetail";
import RackForm from "./pages/RackForm";
import MyPage from "./pages/MyPage";
import styled from "styled-components";

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
  const [error, setError] = useState(null);

  // ⭐ 즐겨찾기 상태 (CRUD의 대상)
  // 구조: { rackId: 1, memo: "자주 가는 곳" }
  const [favorites, setFavorites] = useState([]);

  // 구 코드 -> 구 이름 변환
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
    // API 호출 (기존과 동일)
    const fetchUrl =
      "/api/server/rest/services/Hosted/오픈데이터_교통시설물_정보_자전거보관소/FeatureServer/26/query?outFields=*&where=1%3D1&f=geojson";

    axios
      .get(fetchUrl)
      .then((res) => {
        if (!res.data.features) throw new Error("데이터 구조 오류");
        const formattedData = res.data.features.map((feature) => {
          const guCode = feature.properties.gucd || "";
          return {
            id: feature.id,
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
        console.error(err);
        setError("데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  // --- 보관소 CRUD (메모리상) ---
  const handleCreateRack = (newItem) =>
    setRacks([{ ...newItem, id: Date.now() }, ...racks]);
  const handleUpdateRack = (id, updatedItem) =>
    setRacks(
      racks.map((item) =>
        item.id === parseInt(id) ? { ...updatedItem, id: parseInt(id) } : item
      )
    );
  const handleDeleteRack = (id) => {
    setRacks(racks.filter((item) => item.id !== parseInt(id)));
    // 보관소가 삭제되면 즐겨찾기에서도 제거
    setFavorites(favorites.filter((fav) => fav.rackId !== parseInt(id)));
  };

  // --- ⭐ 즐겨찾기 CRUD 구현 ---

  // 1. Create (즐겨찾기 추가)
  const addFavorite = (rackId) => {
    if (favorites.find((fav) => fav.rackId === rackId)) return;
    setFavorites([...favorites, { rackId, memo: "" }]);
  };

  // 2. Read (는 MyPage에서 수행)

  // 3. Update (즐겨찾기 메모 수정)
  const updateFavoriteMemo = (rackId, newMemo) => {
    setFavorites(
      favorites.map((fav) =>
        fav.rackId === rackId ? { ...fav, memo: newMemo } : fav
      )
    );
  };

  // 4. Delete (즐겨찾기 삭제)
  const removeFavorite = (rackId) => {
    setFavorites(favorites.filter((fav) => fav.rackId !== rackId));
  };

  return (
    <BrowserRouter>
      <Nav>
        <Link to="/">🚲 인천 자전거</Link>
        <Link to="/list">보관소 찾기</Link>
        <Link to="/my">마이페이지(즐겨찾기)</Link>
      </Nav>

      <div style={{ padding: "20px" }}>
        {loading && <h3>데이터 불러오는 중...</h3>}
        {error && <h3>{error}</h3>}

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
                  updateFavoriteMemo={updateFavoriteMemo}
                />
              }
            />
            <Route
              path="/create"
              element={<RackForm onCreate={handleCreateRack} />}
            />
            <Route
              path="/update/:id"
              element={<RackForm racks={racks} onUpdate={handleUpdateRack} />}
            />
            <Route
              path="/my"
              element={
                <MyPage
                  favorites={favorites}
                  racks={racks}
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
