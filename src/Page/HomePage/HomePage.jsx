import React, { useEffect, useState } from "react";
import TypeProduct from "../../componet/TypeProduct/TypeProduct";
import { ButtonCart, WarapperCart, WarapperHomePage } from "./style";
import SlideComponent from "../../componet/SlideComponent/SlideComponent";
import Cart from "../../componet/Cart/Cart";
import NavBarComponnet from "../../componet/NavBarComponent/NavBarComponnet";
import { Button } from "antd";
import ButtonComponent from "../../componet/ButtonComponet/ButtonComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import productAPI from "../../Api/ProductAPI";
import { UseDebounce } from "../../Hook/UseDebounce";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [limit, setLimit] = useState(6);
  const value = useSelector((state) => state.productSearch.search);
  const valueSearch = UseDebounce(value, 1000);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    data: dataGetAllprodutc,
    isPending,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["allproduct"],
    queryFn: () => productAPI.getAllProduct(valueSearch, limit),
    refetchOnWindowFocus: false,
  });
  const { data: datatype, isPending: isPendingType } = useQuery({
    queryKey: ["typeProduct"],
    queryFn: () => productAPI.getTypeProduct(),
  });
  useEffect(() => {
    refetch();
  }, [valueSearch, refetch, limit]);
  const handleLoadMore = () => {
    setLimit(limit + 6);
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      <WarapperHomePage>
        {datatype?.data.data.map((item, index) => {
          return <TypeProduct key={index} name={item}></TypeProduct>;
        })}
      </WarapperHomePage>
      <div
        style={{
          backgroundColor: "#efefef",
          padding: "0 100px",
        }}>
        <SlideComponent></SlideComponent>
        <LoadingComponent spinning={isPending || isLoading}>
          <WarapperCart>
            {dataGetAllprodutc?.data.data.map((product) => (
              <Cart
                onClick={() => navigate(`/product-details/${product._id}`)}
                key={product._id}
                data={product}></Cart>
            ))}
          </WarapperCart>
          <ButtonCart>
            <ButtonComponent
              disabled={dataGetAllprodutc?.data?.totalProduct <= limit}
              onClick={handleLoadMore}
              style={{
                marginTop: "10px",
                width: "240px",
                border:
                  dataGetAllprodutc?.data?.totalProduct <= limit
                    ? "none"
                    : "1px solid rgb(10, 104, 255)",
                color:
                  dataGetAllprodutc?.data?.totalProduct <= limit
                    ? "#ccc"
                    : "rgb(10, 104, 255)",
                fontSize: "16px",
                padding: "8px 12px",
                fontWeight: "500",
                lineHeight: "150%",
                height: "41px",
                hover: " rgba(0, 96, 255, 0.12)",
              }}>
              Xem thêm
            </ButtonComponent>
          </ButtonCart>
        </LoadingComponent>
      </div>
    </div>
  );
}
