import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";

// App.js에서 racks(전체데이터)와 onDelete(삭제함수)를 props로 받습니다.
const RackDetail = ({ racks, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 전체 목록이 아직 안 넘어왔으면 로딩 처리
  if (!racks || racks.length === 0) return <div>데이터 로딩 중...</div>;

  // URL의 id와 일치하는 보관소를 찾습니다. (형변환 주의)
  const rack = racks.find((r) => r.id === parseInt(id) || r.id === id);

  if (!rack) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>해당 보관소를 찾을 수 없습니다.</h2>
        <Link to="/list">목록으로 돌아가기</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까? (임시 삭제)")) {
      onDelete(rack.id); // App.js의 함수 실행
      alert("삭제되었습니다.");
      navigate("/list");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#004d40" }}>{rack.name}</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {/* 정보 섹션 */}
        <div style={{ flex: 1, minWidth: "300px", lineHeight: "1.8" }}>
          <p>
            <strong>📍 관리 구역:</strong> {rack.district}
          </p>
          <p>
            <strong>🚲 수용 가능:</strong> {rack.capacity}대
          </p>
          <p>
            <strong>📅 정보 업데이트:</strong> {rack.updatedAt}
          </p>
          <p>
            <strong>🔢 관리 ID:</strong> {rack.id}
          </p>

          <div style={{ marginTop: "30px" }}>
            <Link to={`/update/${rack.id}`}>
              <button
                style={{
                  padding: "8px 15px",
                  marginRight: "10px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                수정 (Update)
              </button>
            </Link>
            <button
              onClick={handleDelete}
              style={{
                padding: "8px 15px",
                cursor: "pointer",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              삭제 (Delete)
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Link to="/list" style={{ textDecoration: "underline" }}>
              목록으로 돌아가기
            </Link>
          </div>
        </div>

        {/* 지도 섹션 */}
        <div
          style={{
            width: "400px",
            height: "300px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Map
            center={{ lat: rack.lat, lng: rack.lng }}
            style={{ width: "100%", height: "100%" }}
            level={3}
          >
            <MapMarker position={{ lat: rack.lat, lng: rack.lng }} />
          </Map>
        </div>
      </div>
    </div>
  );
};

export default RackDetail;
