import { Input } from "antd";
import styled from "styled-components";

export const WarpperRegisterInput = styled(Input)`
  border-right: none;
  border-left: none;
  border-top: none;
  border-radius: 0px;
  margin-bottom: 10px;
  &:focus {
    background-color: rgba(232, 240, 254);
    border-radius: 3px;
  }
`;
