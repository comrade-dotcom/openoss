import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #004d40;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 40px;
  max-width: 600px;
  line-height: 1.6;
`;

const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #00695c;
    transform: translateY(-2px);
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>인천 자전거 보관대 찾기</Title>
      <SubTitle>
        내 주변의 안전한 자전거 보관소를 쉽고 빠르게 찾아보세요.
        <br />
        오픈 API 데이터를 기반으로 정확한 위치 정보를 제공합니다.
      </SubTitle>
      <Link to="/list">
        <StartButton>보관소 찾으러 가기 🚲</StartButton>
      </Link>
    </HomeContainer>
  );
};

export default Home;
