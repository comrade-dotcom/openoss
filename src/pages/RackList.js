import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;
const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const RackList = () => {
  const [racks, setRacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // json-server에서 데이터 가져오기
    axios
      .get("http://localhost:3000/racks")
      .then((res) => setRacks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 검색 필터링 [cite: 114]
  const filteredRacks = racks.filter(
    (rack) =>
      rack.name.includes(searchTerm) || rack.district.includes(searchTerm)
  );

  return (
    <div>
      <h2>📍 자전거 보관소 목록</h2>
      <input
        type="text"
        placeholder="지역명 또는 보관소 이름 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <Link to="/create">
          <button>+ 새 보관소 등록 (CRUD)</button>
        </Link>
      </div>

      <ListContainer>
        {filteredRacks.map((rack) => (
          <Card key={rack.id}>
            <h3>{rack.name}</h3>
            <p>구역: {rack.district}</p>
            <Link to={`/detail/${rack.id}`}>상세보기 &gt;</Link>
          </Card>
        ))}
      </ListContainer>
    </div>
  );
};

export default RackList;
