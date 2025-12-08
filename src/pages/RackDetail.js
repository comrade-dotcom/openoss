import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const RackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rack, setRack] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/racks/${id}`)
      .then((res) => setRack(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete(`http://localhost:3000/racks/${id}`).then(() => {
        alert("삭제되었습니다.");
        navigate("/list");
      });
    }
  };

  if (!rack) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>{rack.name}</h2>
      <p>관리 구역: {rack.district}</p>
      <p>수용 가능: {rack.capacity}대</p>
      <p>업데이트: {rack.updatedAt}</p>

      {/* 지도 표시 (API 키 필요) [cite: 10] */}
      <div style={{ width: "100%", height: "300px", marginTop: "20px" }}>
        <Map
          center={{ lat: rack.lat, lng: rack.lng }}
          style={{ width: "100%", height: "100%" }}
          level={3}
        >
          <MapMarker position={{ lat: rack.lat, lng: rack.lng }} />
        </Map>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/update/${rack.id}`}>
          <button>수정 (Update)</button>
        </Link>
        <button
          onClick={handleDelete}
          style={{ marginLeft: "10px", background: "red", color: "white" }}
        >
          삭제 (Delete)
        </button>
        <br />
        <br />
        <Link to="/list">목록으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default RackDetail;
