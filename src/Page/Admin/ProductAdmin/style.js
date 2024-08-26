import { Button, Upload } from "antd";
import styled from "styled-components";

export const WrapperContainerProduct = styled.div`
  text-align: left;
`;

export const WrapperHeaderProduct = styled.h2`
  margin: 0px;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const WrapperButtonProduct = styled(Button)`
  &.buttonTest:hover {
    color: blue !important;
    border-color: blue !important;
    background: #ffffff;
  }
`;

export const WrapperUploadAvatar = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }
`;
