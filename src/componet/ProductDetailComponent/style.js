import { Row, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperDetail = styled(Row)`
  margin-top: 20px;
`;
export const WrapperDetailEmage = styled(Row)`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const WrapperTitile = styled.h2`
  margin-top: 0;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  align-self: stretch;
  overflow: hidden;
`;
export const WrapperReview = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;
export const StarCard = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  text-align: left;
  color: rgb(255, 196, 0);
  font-size: 15px;
  margin: 5px 0px 0 0;
  span.review {
    color: #787878;
  }
`;
export const Sold = styled.span`
  color: #787878;
`;
export const WrapperPrice = styled.div`
  padding: 5px;
  text-align: left;
  margin: 10px 0;
  background-color: #f9f9f9;
`;
export const WrapperCount = styled.div`
  margin-top: 20px;
  text-align: left;
  span.count {
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: bold;
  }
`;
export const CountProduct = styled.div`
  display: flex;
  margin-top: 5px;
  button.btn-count {
    color: #787878;
    padding: 7px 11px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;
export const WarapperButton = styled.div`
  margin-top: 25px;
  text-align: left;
`;
export const WrapperAddress = styled.div`
  font-size: 16px;
  text-align: left;
  margin-top: 20px;
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-outlined {
    width: 60px;
    &.ant-input-number.ant-input-number-handler-wrap {
      display: none !important;
    }
  }
`;
