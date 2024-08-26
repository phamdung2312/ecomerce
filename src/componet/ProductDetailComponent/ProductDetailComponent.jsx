import React, { useEffect, useState } from "react";
import {
  CountProduct,
  Sold,
  StarCard,
  WarapperButton,
  WrapperAddress,
  WrapperCount,
  WrapperDetail,
  WrapperDetailEmage,
  WrapperInputNumber,
  WrapperPrice,
  WrapperReview,
  WrapperTitile,
} from "./style";
import { Button, Col, Image, InputNumber } from "antd";
import Product2 from "../../asset/ProductImage/product2.webp";
import productSmall3 from "../../asset/ProductImage/productSmall3.webp";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponet/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder } from "../../Redux/counter/OrderSlide";
import { Renderprice } from "../../utils/RenderPrice";
import { toast } from "react-toastify";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponet";
import { initFacebookSDK } from "../../utils/FBSKD";
export default function ProductDetailComponent({ data }) {
  const [dataProductDetail, setDataProductDetail] = useState({});
  const [countNumberInstock, setCountNumberInstock] = useState(0);

  const useInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setDataProductDetail(data?.data.data);
  }, [data]);

  const onChangeNumberOrder = (value) => {};
  const location = useLocation();
  const renderStar = (number) => {
    return Array.from({ length: number }, (_, index) => (
      <StarFilled key={index} />
    ));
  };
  const handleDecrease = () => {
    setCountNumberInstock(countNumberInstock - 1);
  };
  const handleIncrease = () => {
    setCountNumberInstock(countNumberInstock + 1);
  };
  const handleOrder = () => {
    if (
      useInfo.name.length > 0 &&
      dataProductDetail?.countInStock > 0 &&
      countNumberInstock > 0
    ) {
      dispatch(
        addOrder({
          orderItem: {
            name: dataProductDetail?.name,
            amount: countNumberInstock,
            image: dataProductDetail?.image,
            price: dataProductDetail?.price,
            product: dataProductDetail?._id,
            discount: dataProductDetail?.discountPrice,
            inStock: dataProductDetail?.countInStock,
          },
        })
      );
    } else if (dataProductDetail?.countInStock <= 0) {
      toast.error("Đã hết hàng", {
        position: "top-center",
        style: { fontSize: "16px" },
        autoClose: 2000,
      });
    } else if (countNumberInstock === 0) {
      toast.error("Chưa chọn số lượng", {
        position: "top-center",
        style: { fontSize: "16px" },
        autoClose: 2000,
      });
    } else {
      navigate("/sign-in", { state: location });
    }
  };
  useEffect(() => {
    initFacebookSDK();
  });
  return (
    <WrapperDetail>
      <Col
        span={10}
        style={{
          borderRadius: "5px",
          backgroundColor: "#fff",
          padding: "15px",
        }}>
        <Image
          src={dataProductDetail?.image}
          style={{
            borderRadius: "10px",
          }}
        />
        <WrapperDetailEmage>
          <Col span={4}>
            <Image
              src={productSmall3}
              style={{ width: "80px", height: "80px" }}
            />
          </Col>
          <Col span={4}>
            <Image
              style={{ width: "80px", height: "80px" }}
              src={productSmall3}
            />
          </Col>
          <Col span={4}>
            <Image
              style={{ width: "80px", height: "80px" }}
              src={productSmall3}
            />
          </Col>
          <Col span={4}>
            <Image
              style={{ width: "80px", height: "80px" }}
              src={productSmall3}
            />
          </Col>
          <Col span={4}>
            <Image
              style={{ width: "80px", height: "80px" }}
              src={productSmall3}
            />
          </Col>
          <Col span={4}>
            <Image
              style={{ width: "80px", height: "80px" }}
              src={productSmall3}
            />
          </Col>
        </WrapperDetailEmage>
      </Col>
      <Col
        span={14}
        style={{
          padding: "10px",
        }}>
        <WrapperTitile>{dataProductDetail?.name}</WrapperTitile>
        <WrapperReview>
          <StarCard>
            {renderStar(dataProductDetail?.rating)}
            <span className="review">(xem đánh giá)</span>
          </StarCard>
          <div
            style={{
              width: "1px",
              height: "15px",
              backgroundColor: "#ccc",
              margin: "0 10px",
            }}></div>
          <Sold style={{ color: "#787878" }}>Đã bán </Sold>
          <span style={{ color: "#787878", marginLeft: "4px" }}>20</span>
        </WrapperReview>
        <WrapperPrice>
          <span
            style={{
              color: "#27272A",
              fontSize: "20px",
              fontWeight: "600",
            }}>
            {Renderprice(dataProductDetail?.discountPrice)}
            <sup>₫</sup>
          </span>
        </WrapperPrice>
        <WrapperAddress>
          <span>Giao đến: </span>
          <span style={{ fontWeight: "600", textDecoration: "underline" }}>
            {useInfo.address}
          </span>
          <span style={{ color: "blue" }}> - Đổi địa chỉ</span>
        </WrapperAddress>
        <LikeButtonComponent
          dataHref={
            process.env.REACT_APP_ISLOCAL
              ? "https://developers.facebook.com/docs/plugins/"
              : window.location.href
          }></LikeButtonComponent>
        <WrapperCount>
          <span className="count">Số lượng</span>
          {dataProductDetail?.countInStock <= 0 ? (
            <p style={{ fontWeight: "600", fontSize: "16px", color: "red" }}>
              Đã hết hàng
            </p>
          ) : (
            <CountProduct>
              <button
                style={{
                  cursor: countNumberInstock <= 0 ? "no-drop" : "pointer",
                }}
                disabled={countNumberInstock <= 0 ? true : false}
                className="btn-count"
                onClick={handleDecrease}>
                <MinusOutlined />
              </button>
              <WrapperInputNumber
                min={0}
                max={dataProductDetail?.countInStock}
                defaultValue={countNumberInstock}
                value={countNumberInstock}
                onChange={onChangeNumberOrder}
              />
              <button
                className="btn-count"
                onClick={handleIncrease}
                style={{
                  cursor:
                    countNumberInstock === dataProductDetail?.countInStock
                      ? "no-drop"
                      : "pointer",
                }}
                disabled={
                  countNumberInstock === dataProductDetail?.countInStock
                    ? true
                    : false
                }>
                <PlusOutlined />
              </button>
            </CountProduct>
          )}
        </WrapperCount>
        <WarapperButton>
          <ButtonComponent
            onClick={handleOrder}
            style={{
              width: "328px",
              backgroundColor: "red",
              color: "white",
              fontWeight: "400",
              fontSize: "16px",
              height: "40px",
              marginRight: "10px",
            }}>
            Chọn mua
          </ButtonComponent>
          <ButtonComponent
            className="no-ripple"
            style={{
              width: "328px",
              backgroundColor: "white",
              color: "#0a68ff",
              fontWeight: "400",
              fontSize: "16px",
              height: "40px",
              marginRight: "10px",
              border: "1px solid #0a68ff",
            }}>
            Mua trước trả sau
          </ButtonComponent>
        </WarapperButton>
      </Col>
      <CommentComponent
        width={1318}
        dataHref={
          process.env.REACT_APP_ISLOCAL
            ? "https://developers.facebook.com/docs/plugins/comments#configurator"
            : window.location.href
        }></CommentComponent>
    </WrapperDetail>
  );
}
