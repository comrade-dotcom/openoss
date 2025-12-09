import React, { useState, useMemo } from "react";
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
  position: relative;
  &:hover {
    transform: translateY(-5px);
  }
`;

const RackList = ({ racks, favorites, addFavorite, removeFavorite }) => {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("전체");

  // ⚠️ 수정된 부분: useMemo를 if문보다 위로 올렸습니다. (Hooks 규칙 준수)
  const districtOptions = useMemo(() => {
    // racks가 없으면 기본값 반환 (방어 코드)
    if (!racks) return ["전체"];

    const allDistricts = racks.map((r) => r.district).filter(Boolean);
    const uniqueDistricts = ["전체", ...new Set(allDistricts)];
    return uniqueDistricts.sort();
  }, [racks]);

  // ⚠️ 데이터 로딩 체크 (Hooks 호출 이후에 위치해야 함)
  if (!racks) return <div>데이터를 불러오는 중입니다...</div>;

  // 필터링 로직
  const filtered = racks.filter((r) => {
    const nameMatch = r.name && r.name.includes(search);
    const districtMatch = r.district && r.district.includes(search);
    const searchCondition = nameMatch || districtMatch;

    const districtFilterCondition =
      selectedDistrict === "전체" ||
      (r.district && r.district.includes(selectedDistrict));

    return searchCondition && districtFilterCondition;
  });

  return (
    <div>
      <h2>📍 인천 자전거 보관소 목록</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            minWidth: "100px",
          }}
        >
          {districtOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="검색어 입력..."
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
              height: "100%",
            }}
          >
            + 등록
          </button>
        </Link>
      </div>

      <p>
        총 <strong>{filtered.length}</strong>개의 보관소가 검색되었습니다. (현재
        필터: {selectedDistrict})
      </p>

      <ListGrid>
        {filtered.slice(0, 50).map((rack) => {
          const isFav = favorites.some((fav) => fav.rackId === rack.id);

          return (
            <Card key={rack.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>
                  {rack.name}
                </h3>
                <button
                  onClick={() =>
                    isFav ? removeFavorite(rack.id) : addFavorite(rack.id)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                >
                  {isFav ? "❤️" : "🤍"}
                </button>
              </div>

              <p style={{ margin: "5px 0", color: "#555" }}>
                📍 {rack.district}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                🚲 수용: {rack.capacity}대
              </p>

              <Link
                to={`/detail/${rack.id}`}
                style={{
                  color: "#004d40",
                  fontWeight: "bold",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                상세보기 &gt;
              </Link>
            </Card>
          );
        })}
      </ListGrid>
    </div>
  );
};

export default RackList;
