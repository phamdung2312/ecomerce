import { Upload } from "antd";
import styled from "styled-components";

export const WrapperUpdatePage = styled.div`
  padding: 0 100px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const WrapperTitle = styled.div`
  font-size: 16px;
`;
export const WrapperContent = styled.div`
  width: fit-content;
`;
export const WrapperBody = styled.div`
  box-shadow: 1px 1px 1px rgba(255, 255, 255);
  border-radius: 5px;
  border: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;
export const WrapperUploadAvatar = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }
`;
