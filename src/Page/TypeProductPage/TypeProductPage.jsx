import React, { useEffect, useState } from "react";
import Cart from "../../componet/Cart/Cart";
import { WrapperTypeProduct } from "./style";
import { Col, Pagination } from "antd";
import NavBarComponnet from "../../componet/NavBarComponent/NavBarComponnet";
import { useQuery } from "@tanstack/react-query";
import productAPI from "../../Api/ProductAPI";
import { useLocation } from "react-router-dom";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { UseDebounce } from "../../Hook/UseDebounce";

export default function TypeProductPage() {
  const search = useSelector((state) => state.productSearch.search);
  const dataFilter = UseDebounce(search, 500);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const { state } = useLocation();
  const {
    data: dataTypeProduct,
    isPending: isPendingProductType,
    refetch,
  } = useQuery({
    queryKey: ["GetTypeProduct"],
    queryFn: () =>
      productAPI.getTypeProductFilter(state, panigate.page, panigate.limit),
  });

  useEffect(() => {
    if (state) {
      setPanigate({ ...panigate, total: dataTypeProduct?.data?.totalProduct });
      refetch();
    }
  }, [state, panigate.limit, panigate.page]);
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  return (
    <LoadingComponent spinning={isPendingProductType}>
      <WrapperTypeProduct>
        <Col
          span={4}
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            marginRight: "20px",
            borderRadius: "8px",
          }}>
          <NavBarComponnet></NavBarComponnet>
        </Col>
        <Col span={20} style={{}}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "11px",
            }}>
            {dataTypeProduct?.data.data
              .filter((product) =>
                product.name.toLowerCase().includes(dataFilter?.toLowerCase())
              )
              .map((product) => (
                <Cart key={product._id} data={product}></Cart>
              ))}
          </div>
          <Pagination
            showSizeChanger
            defaultCurrent={panigate.page + 1}
            total={panigate.total}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
            onChange={onChange}
          />
        </Col>
      </WrapperTypeProduct>
    </LoadingComponent>
  );
}
