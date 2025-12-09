import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProfileCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #004d40;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const Section = styled.div`
  margin-top: 30px;
  h3 {
    border-bottom: 2px solid #004d40;
    padding-bottom: 10px;
    display: inline-block;
  }
`;

const FavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FavItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemoInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

// App.js에서 내려준 props를 받습니다.
const MyPage = ({
  favorites = [],
  racks = [],
  removeFavorite,
  updateFavoriteMemo,
}) => {
  // 즐겨찾기 데이터와 실제 보관소 데이터를 합칩니다.
  const myFavorites = favorites
    .map((fav) => {
      const rack = racks.find((r) => r.id === fav.rackId);
      return {
        ...fav,
        rackInfo: rack, // rack 정보가 없을 수도 있음 (삭제된 경우 등)
      };
    })
    .filter((item) => item.rackInfo); // 보관소 정보가 있는 것만 필터링

  return (
    <Container>
      <ProfileCard>
        <Avatar>U</Avatar>
        <div>
          <h2 style={{ margin: "0 0 10px 0" }}>자전거 관리자</h2>
          <p style={{ color: "#666" }}>bike_master@example.com</p>
        </div>
      </ProfileCard>

      <Section>
        <h3>즐겨찾기 목록 ({myFavorites.length})</h3>

        {myFavorites.length === 0 ? (
          <p style={{ marginTop: "20px", color: "#888" }}>
            즐겨찾기한 보관소가 없습니다. 리스트에서 ❤️를 눌러보세요!
          </p>
        ) : (
          <FavList>
            {myFavorites.map((item) => (
              <FavItem key={item.rackId}>
                <HeaderRow>
                  <div>
                    <Link
                      to={`/detail/${item.rackId}`}
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "#004d40",
                        textDecoration: "none",
                      }}
                    >
                      {item.rackInfo.name}
                    </Link>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginLeft: "10px",
                      }}
                    >
                      ({item.rackInfo.district})
                    </span>
                  </div>
                  <button
                    onClick={() => removeFavorite(item.rackId)}
                    style={{
                      background: "#ff5252",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    삭제
                  </button>
                </HeaderRow>

                {/* 메모 기능 연결 */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    메모:
                  </span>
                  <MemoInput
                    type="text"
                    placeholder="여기에 메모를 입력하세요 (예: 출근길 이용)"
                    value={item.memo}
                    onChange={(e) =>
                      updateFavoriteMemo(item.rackId, e.target.value)
                    }
                  />
                </div>
              </FavItem>
            ))}
          </FavList>
        )}
      </Section>
    </Container>
  );
};

export default MyPage;
