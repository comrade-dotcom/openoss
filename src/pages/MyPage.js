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

const Info = styled.div`
  h2 {
    margin: 0 0 10px 0;
    color: #333;
  }
  p {
    margin: 0;
    color: #666;
  }
`;

const Section = styled.div`
  margin-top: 30px;
  h3 {
    border-bottom: 2px solid #004d40;
    padding-bottom: 10px;
    display: inline-block;
  }
`;

const MyPage = () => {
  return (
    <Container>
      <ProfileCard>
        <Avatar>U</Avatar>
        <Info>
          <h2>이민형 & 황도현 (관리자)</h2>
          <p>incheon_bike_admin@example.com</p>
          <p>가입일: 2025.12.09</p>
        </Info>
      </ProfileCard>

      <Section>
        <h3>내가 등록한 보관소</h3>
        <p style={{ marginTop: "20px", color: "#888" }}>
          아직 등록된 보관소가 없습니다.{" "}
          <Link to="/create" style={{ color: "#004d40", fontWeight: "bold" }}>
            새 보관소 등록하기
          </Link>
        </p>
      </Section>

      <Section>
        <h3>즐겨찾기 목록</h3>
        <p style={{ marginTop: "20px", color: "#888" }}>
          즐겨찾기한 보관소가 없습니다.
        </p>
      </Section>
    </Container>
  );
};

export default MyPage;
