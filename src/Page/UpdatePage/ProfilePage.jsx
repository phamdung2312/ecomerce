import React, { useEffect, useState } from "react";
import {
  WrapperUpdatePage,
  WrapperBody,
  WrapperTitle,
  WrapperContent,
  WrapperUploadAvatar,
} from "./style";
import InputRegister from "../../componet/InputRegister/InputRegister";
import { Button, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userAPI } from "../../Api/UserAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser } from "../../Redux/counter/UserSlide";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils/base64";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";

export default function UpdatePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [avatar, setAvatar] = useState(user.avatar);
  const [phone, setPhone] = useState(user.phone);
  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setAddress(user.address);
    setAvatar(user.avatar);
    setPhone(user.phone);
  }, [user.email, user.name, user.address, user.avatar, user.phone]);

  const updateUserMutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token, ...rest } = data;
      userAPI.updateUser(id, rest, access_token);
    },
  });

  const {} = updateUserMutation;

  const handleChangeEmail = (value) => {
    setEmail(value);
  };
  const handleChangeName = (value) => {
    setName(value);
  };
  const handleChangeAddress = (value) => {
    setAddress(value);
  };
  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleChangePhone = (value) => {
    setPhone(value);
  };

  const handleUpdate = () => {
    updateUserMutation.mutate(
      {
        id: user.id,
        email,
        name,
        address,
        avatar,
        phone,
        access_token: user.access_token,
      },
      {
        onSuccess: () => {
          toast.success("login user success", {
            position: "top-center",
            style: { fontSize: "16px" },
            autoClose: 2000,
          });
          handleGetUserDetail(user.id, user.access_token);
        },
        onSettled: () => {},
      }
    );
  };

  const handleGetUserDetail = async (id, access_token) => {
    const res = await userAPI.getUserDetail(id, access_token);
    console.log("res", res);
    dispatch(updateUser(res.data));
  };

  // handle Upload image

  return (
    <WrapperUpdatePage>
      <WrapperContent>
        <WrapperTitle>
          <h2>Thông tin cá nhân</h2>
        </WrapperTitle>
        <WrapperBody>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "600px",
              justifyContent: "space-between",
            }}>
            <label style={{ fontSize: "15px", fontWeight: "600" }}>
              Email:
            </label>
            <InputRegister
              onChange={handleChangeEmail}
              value={email}
              width="350px"
              type="text"></InputRegister>
            <Button
              onClick={handleUpdate}
              style={{
                marginLeft: "10px",
                color: "blue",
                fontSize: "14px",
                fontWeight: "500",
              }}>
              {" "}
              Cập nhật
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "600px",
              justifyContent: "space-between",
            }}>
            <label style={{ fontSize: "15px", fontWeight: "600" }}>Name:</label>
            <InputRegister
              onChange={handleChangeName}
              value={name}
              width="350px"
              type="text"></InputRegister>
            <Button
              onClick={handleUpdate}
              style={{
                marginLeft: "10px",
                color: "blue",
                fontSize: "14px",
                fontWeight: "500",
              }}>
              Cập nhật
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "600px",
              justifyContent: "space-between",
            }}>
            <label style={{ fontSize: "15px", fontWeight: "600" }}>
              Address:
            </label>
            <InputRegister
              onChange={handleChangeAddress}
              value={address}
              width="350px"
              type="text"></InputRegister>
            <Button
              onClick={handleUpdate}
              style={{
                marginLeft: "10px",
                color: "blue",
                fontSize: "14px",
                fontWeight: "500",
              }}>
              Cập nhật
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "600px",
              justifyContent: "space-between",
            }}>
            <label style={{ fontSize: "15px", fontWeight: "600" }}>
              Avatar:
            </label>
            <WrapperUploadAvatar onChange={handleChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadAvatar>
            {avatar && (
              <img
                src={avatar}
                alt={avatar}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}></img>
            )}
            <Button
              onClick={handleUpdate}
              style={{
                marginLeft: "10px",
                color: "blue",
                fontSize: "14px",
                fontWeight: "500",
              }}>
              Cập nhật
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "600px",
              justifyContent: "space-between",
            }}>
            <label style={{ fontSize: "15px", fontWeight: "600" }}>
              Phone:
            </label>
            <InputRegister
              onChange={handleChangePhone}
              value={phone}
              width="350px"
              type="text"></InputRegister>
            <Button
              onClick={handleUpdate}
              style={{
                marginLeft: "10px",
                color: "blue",
                fontSize: "14px",
                fontWeight: "500",
              }}>
              Cập nhật
            </Button>
          </div>
        </WrapperBody>
      </WrapperContent>
    </WrapperUpdatePage>
  );
}
