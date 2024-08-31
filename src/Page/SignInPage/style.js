import styled from "styled-components";

export const WarpperRegistereLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  padding: 84px 45px 24px;
  justify-content: flex-start;
`;
export const WarpperRegistereHeading = styled.div`
  margin-bottom: 30px;
  h4.headingTitle {
    text-align: left;
    font-size: 30px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 8px;
  }
  span.decription {
    font-size: 17px;
    font-weight: 400;
  }
`;
export const WarpperRegisterInput = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const WarpperRegistereRight = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(219, 238, 255) 85%
  );
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const WrapperRegisterContent = styled.div`
  color: #0b74e5;
  h4.headingContent {
    margin: 25px 0 5px 0;

    font-size: 17px;
    font-weight: 600;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
export const WrapperRegisterDirect = styled.div`
  font-size: 15px;
  margin-top: 25px;
  p.Passwod {
    text-align: left;
    color: #0d5cb6;
    margin: 0;
    margin-bottom: 8px;
  }
  p.directSignUp {
    color: #0d5cb6;
    margin: 0;
    margin-left: 10px;
  }
  span {
    display: flex;
    align-items: center;
  }
`;
