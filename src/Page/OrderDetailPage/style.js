import { InputNumber, Row } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
  padding: 20px 100px;
  background: rgb(245, 245, 250);
  height: 100vh;
`;
export const WrapperHeader = styled.h2``;
export const WrapperContent = styled.div``;
export const WrapperContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const WrapperContentHeader = styled.h4`
  font-size: 20px;
  margin: 10px 0;
`;
export const WrapperContentbody = styled.div`
  width: 300px;
`;
export const WrapperContentItem = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 3em; /* Điều chỉnh dựa trên chiều cao dòng của bạn */
  line-height: 1.5em; /* Chiều cao dòng */
  &:first-child {
    font-weight: 600;
  }
`;
export const WrapperContentItemContainer = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  gap: 10px;
  border-radius: 5px;
  box-shadow: 0 0 8px 5px #ccc;
  text-align: left;
  height: 120px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Số dòng hiển thị */
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const WrapperBodypriceTotal = styled.div`
  margin-top: 20px;
  text-align: right;
  width: 100%;
`;
export const WrapperBodypriceBody = styled.div`
  margin-top: 8px;
`;
export const WrapperBodypriceBodyTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
