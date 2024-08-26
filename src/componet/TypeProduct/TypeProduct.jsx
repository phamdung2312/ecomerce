import React from "react";
import { useNavigate } from "react-router-dom";

export default function TypeProduct({ name }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(
      `/product/${name
        .normalize("NFD")
        .replace(/[\u3000-\u336f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: name }
    );
  };
  return (
    <div style={{ cursor: "pointer" }} onClick={handleNavigate}>
      {name}
    </div>
  );
}
