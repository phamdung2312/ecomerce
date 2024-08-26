import { InputNumber, Row } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
  padding: 20px 100px;
  background: rgb(245, 245, 250);
  height: 100%;
`;
export const WrapperContain = styled(Row)`
  flex-wrap: nowrap;
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
