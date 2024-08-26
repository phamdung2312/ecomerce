import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeaders = styled(Row)`
  background: #0b74e5;
  display: "flex";
  align-items: center;
  justify-content: "space-between";
  padding: 0 100px;
  gap: 16px;
  flex-wrap: nowrap;
`;
export const TextHeaders = styled.div`
  cursor: pointer;
`;

export const ImageHeaders = styled.img`
  width: 100px;
  height: 70px;
`;
export const AccountHeadersWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
`;
export const CartHeadersWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  color: white;
  cursor: pointer;
`;
export const WrapperOptionPopover = styled.p`
  margin: 0;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  &:hover {
    background-color: #c2d7ed;
  }
`;
