import styled from "styled-components";

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 85%;
`;
export const UploadContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  align-self: center;
`;

export const UploadImage = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  cursor: pointer;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
export const UploadText = styled.span`
  font-size: 14px;
  align-self: center;
  margin-top: 5px;
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
  &:nth-child(n + 1) {
    margin-bottom: 10px;
  }
`;
