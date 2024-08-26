import { InputNumber, Row } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
  background: rgb(245, 245, 250);
`;
export const WrapperContain = styled(Row)`
  flex-wrap: nowrap;
  padding: 20px 100px;
`;
export const WrapperButton = styled.button`
  cursor: pointer;
  padding: 10px 40px;
  border: none;
  background-color: red;
  color: white;
  border-radius: 3px;
  &:hover {
    opacity: 0.5;
  }
`;
export const CountProduct = styled.div`
  display: flex;
  margin-top: 5px;
  justify-content: center;
  button.btn-count {
    color: #787878;
    padding: 4px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #ccc;
  }
`;
export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-outlined {
    width: 50px;
    border-radius: 0px !important;
  }
  .ant-input-number-handler-wrap {
    display: none !important;
  }
`;
export const WrapperSelect = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  border-radius: 10px;
  padding: 16px;
  display: grid;
  row-gap: 12px;
  width: 60%;
  text-align: left;
`;
export const WrapperSelectItem = styled.span`
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(0, 171, 86);
  padding: 0px 4px;
  background-color: rgb(255, 255, 255);
  margin-left: 4px;
  border-radius: 4px;
`;
