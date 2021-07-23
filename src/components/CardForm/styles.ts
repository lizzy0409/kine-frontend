import styled from "styled-components";

export const Container = styled.div`
  width: min(400px, 100%);
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  border-radius: 15px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
  @media (max-width: 400px) {
    border-radius: 0;
    box-shadow: none;
  }
`;

export const Wrapper = styled.form`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #487eb0, #00a8ff, #487eb0);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    background: #fff;
  }
`;

export const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 35px;
  text-align: center;
`;

export const Subtitle = styled.span`
  font-size: 14px;
  > a {
    color: #4796ff;
  }
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 85%;
`;

export const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 0;
  border-radius: 10px;
  background-color: #f8f8f8;
  outline: 0;
  padding: 0 20px;
  font-size: 15px;
  &::placeholder {
    color: #777;
    font-size: 15px;
  }
  &:nth-child(1) {
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  width: 85%;
  height: 45px;
  border: 0;
  border-radius: 10px;
  background-color: #2dab03;
  border-radius: 15px;
  box-shadow: 4px 4px 5px rgb(0 0 0 / 20%);
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  outline: 0;
  cursor: pointer;
`;
