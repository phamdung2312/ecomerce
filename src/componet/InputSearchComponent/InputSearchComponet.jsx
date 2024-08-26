import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import InputComponent from "../InputComponet/InputComponent";
import ButtonComponent from "../ButtonComponet/ButtonComponent";
import { useDispatch } from "react-redux";
import { SearchValue } from "../../Redux/counter/ProductSlide";

export default function InputSearchComponet({ onClick }) {
  const dispatch = useDispatch();
  const handleChangeValue = (e) => {
    dispatch(SearchValue(e.target.value));
  };
  const handleClick = () => {
    onClick();
  };
  return (
    <div>
      <InputComponent
        placeholder="input search text"
        enterButton
        style={{ position: "relative" }}
        onChange={handleChangeValue}
      />
      <ButtonComponent
        onClick={handleClick}
        type="primary"
        icon={<SearchOutlined />}
        style={{ position: "absolute", top: "0", right: "0" }}>
        Search
      </ButtonComponent>
    </div>
  );
}
