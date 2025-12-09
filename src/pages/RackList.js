import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;
const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

// App.js에서 racks(데이터목록)를 props로 받아옵니다.
const RackList = ({ racks }) => {
  const [search, setSearch] = useState("");

  // 데이터 로딩 전이거나 없을 때 처리
  if (!racks) return <div>데이터를 불러오는 중입니다...</div>;

  const filtered = racks.filter((r) => {
    const nameMatch = r.name && r.name.includes(search);
    const districtMatch = r.district && r.district.includes(search);
    return nameMatch || districtMatch;
  });

  return (
    <div>
      <h2>📍 인천 자전거 보관소 목록 (총 {filtered.length}개)</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="'연수구' 또는 '보관소' 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "10px", fontSize: "1rem" }}
        />
        <Link to="/create">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#004d40",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            + 등록
          </button>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
          검색 결과가 없습니다.
        </p>
      ) : (
        <ListGrid>
          {filtered.slice(0, 50).map((rack) => (
            <Card key={rack.id}>
              <h3>{rack.name}</h3>
              <p>📍 {rack.district}</p>
              <p>🚲 수용: {rack.capacity}대</p>
              <Link
                to={`/detail/${rack.id}`}
                style={{ color: "#004d40", fontWeight: "bold" }}
              >
                상세보기 &gt;
              </Link>
            </Card>
          ))}
        </ListGrid>
      )}
    </div>
  );
};

export default RackList;
