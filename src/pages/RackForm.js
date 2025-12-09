import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// App.js에서 데이터(racks)와 처리함수(onCreate, onUpdate)를 받습니다.
const RackForm = ({ racks, onCreate, onUpdate }) => {
  const { id } = useParams(); // URL에 id가 있으면 '수정 모드'
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    capacity: 10,
    lat: 37.456, // 기본값 (인천 부근)
    lng: 126.705,
  });

  // 수정 모드일 경우, 기존 데이터를 폼에 채워넣기
  useEffect(() => {
    if (id && racks) {
      const target = racks.find((r) => r.id === parseInt(id) || r.id === id);
      if (target) {
        setFormData(target);
      }
    }
  }, [id, racks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // 숫자가 필요한 필드는 숫자로 변환
      [name]:
        name === "capacity" || name === "lat" || name === "lng"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 날짜 자동 입력
    const payload = {
      ...formData,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    if (id) {
      // 수정 (Update)
      onUpdate(id, payload);
      alert("수정되었습니다. (임시)");
      navigate(`/detail/${id}`);
    } else {
      // 생성 (Create)
      onCreate(payload);
      alert("등록되었습니다. (임시)");
      navigate("/list");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ color: "#004d40" }}>
        {id ? "보관소 정보 수정" : "새 보관소 등록"}
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            보관소 이름
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
            placeholder="예: 송도 센트럴파크 보관소"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            구역 (District)
          </label>
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
            placeholder="예: 연수구"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            수용량
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              위도 (Lat)
            </label>
            <input
              type="number"
              step="any"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              경도 (Lng)
            </label>
            <input
              type="number"
              step="any"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#004d40",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {id ? "수정 완료" : "등록하기"}
        </button>
      </form>
    </div>
  );
};

export default RackForm;
