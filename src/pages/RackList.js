// src/pages/RackList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 스타일 컴포넌트 생략 (기존과 동일)
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
`;

const RackList = ({ racks }) => {
  const [search, setSearch] = useState("");

  // 데이터가 없을 때를 대비한 안전 장치
  if (!racks) return <div>데이터가 없습니다.</div>;

  const filtered = racks.filter(
    (r) =>
      // 이름이나 구역 이름에 검색어가 포함되어 있으면 보여줌
      r.name.includes(search) || (r.district && r.district.includes(search))
  );

  return (
    <div>
      <h2>📍 목록 (검색 결과: {filtered.length}개)</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="'연수구' 또는 '보관소' 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <Link to="/create">
          <button style={{ padding: "10px" }}>+ 등록</button>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ListGrid>
          {filtered.slice(0, 50).map((rack) => (
            <Card key={rack.id}>
              <h3>{rack.name}</h3>
              <p>📍 {rack.district}</p>
              <p>수용: {rack.capacity}대</p>
              <Link to={`/detail/${rack.id}`} style={{ color: "blue" }}>
                상세보기
              </Link>
            </Card>
          ))}
        </ListGrid>
      )}
    </div>
  );
};

export default RackList;
