import { Button } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
  text-align: left;
`;

export const WrapperHeader = styled.h2`
  margin: 0px;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const WrapperButton = styled(Button)`
  &.buttonTest:hover {
    color: blue !important;
    border-color: blue !important;
    background: #ffffff;
  }
`;
