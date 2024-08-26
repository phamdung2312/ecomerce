import React from "react";
import ProductDetailComponent from "../../componet/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import productAPI from "../../Api/ProductAPI";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetailsPage() {
  const navigate = useNavigate();
  const productId = useParams();
  const { data } = useQuery({
    queryKey: ["getProductDetail"],
    queryFn: () => productAPI.getProductDetail(productId.id),
  });

  return (
    <div
      style={{
        padding: "0 100px",
        backgroundColor: "#efefef",
      }}>
      <h2
        style={{
          textAlign: "start",
        }}>
        <span onClick={() => navigate("/")}>Trang chủ</span> / chi tiết sản phẩm
      </h2>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
        }}>
        <ProductDetailComponent data={data}></ProductDetailComponent>
      </div>
    </div>
  );
}
