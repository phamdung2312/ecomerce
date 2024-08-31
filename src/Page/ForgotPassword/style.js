import { Button, Input } from "antd";
import styled from "styled-components";

export const WrapperContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(249, 251, 255);
`;
export const WrapperBody = styled.div`
  padding: 50px;
  background-color: #fff;
  width: 300px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px 10px #ccc;
`;
export const WrapperTitile = styled.h3`
  font-size: 24px;
  margin: 0px 0px 20px 0px;
`;
export const WrapperInput = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;
export const WrapperLabeInput = styled.label`
  font-size: 16px;
`;
export const WrapperTextInput = styled(Input)``;
export const WrapperButton = styled(Button)`
  width: 100%;
  background-color: blue;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
export const WrapperNavigateLogIn = styled.div`
  font-size: 14px;
  color: blue;
  text-decoration: underline;
  margin-top: 8px;
  text-align: right;
  cursor: pointer;
`;
