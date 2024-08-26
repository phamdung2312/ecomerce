import React, { useEffect, useRef, useState } from "react";
import { WrapperContainer, WrapperHeader } from "./style";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponet from "../../../componet/TableComponent/TableComponet";
import ModalComponent from "../../../componet/ModalComponent/ModalComponent";
import { Button, Form, Space } from "antd";
import { WrapperUploadAvatar } from "../ProductAdmin/style";
import InputComponent from "../../../componet/InputComponet/InputComponent";
import DrawerComponet from "../../../componet/DrawerComponet/DrawerComponet";
import LoadingComponent from "../../../componet/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { getBase64 } from "../../../utils/base64";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { userAPI } from "../../../Api/UserAPI";
import { DownloadTableExcel } from "react-export-table-to-excel";

export default function UserAdmin() {
  const [form] = Form.useForm(); // Khởi tạo form instance

  const [seclectRow, setSeclectRow] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectRowKey, setSelectRowKey] = useState([]);

  const user = useSelector((state) => state.user);
  const [valueFormUserDetail, setValueFormUserDetail] = useState({
    name: "",
    email: "",
    isAdmin: "",
    phone: "",
    address: "",
    avatar: "",
  });

  // Search table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  // end search

  // updateProduct
  const updateUserMutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token, ...rest } = data;
      userAPI.updateUser(id, rest, access_token);
    },
  });

  const { isPending: isPendingUpdateUser } = updateUserMutation;

  // delete Product
  const deleteUserMutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token } = data;
      userAPI.deleteUser(id, access_token);
    },
  });
  // delete Product
  const deleteManyProductMutation = useMutation({
    mutationFn: (data) => {
      const { access_token, ...rest } = data;
      userAPI.deleteManyUser(rest, access_token);
    },
  });

  const {
    data: dataDlete,
    isSuccess,
    isPending: isPendingDeleteUser,
  } = deleteUserMutation;

  // get All User
  const {
    data: dataUser,
    isPending: isPendingGetAllUser,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: () => userAPI.getAllUser(user.access_token),
  });

  useEffect(() => {
    if (isSuccess) {
      handleCancelDelete();
      refetch();
    }
  }, [isSuccess, refetch]);

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{
            cursor: "pointer",
            marginRight: "10px",
            fontSize: "18px",
            color: "red",
          }}
          onClick={handleDeleteProduct}></DeleteOutlined>{" "}
        <EditOutlined
          style={{
            cursor: "pointer",
            marginRight: "10px",
            fontSize: "18px",
            color: "green",
          }}
          onClick={HandleEditProduct}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "IsAdmin",
      dataIndex: "isAdmin",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const data = dataUser?.data?.data?.map((user) => ({
    ...user,
    key: user._id,
    isAdmin: user.isAdmin ? "TRUE" : "FALSE",
  }));

  const handleOnChange = (e) => {
    setValueFormUserDetail({
      ...valueFormUserDetail,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setValueFormUserDetail({
      ...valueFormUserDetail,
      avatar: file.preview,
    });
  };
  const handlegetUserDetail = async (id) => {
    setIsLoading(true);
    const res = await userAPI.getUserDetail(id, user.access_token);
    setIsLoading(false);
    return res;
  };
  useEffect(() => {});

  useEffect(() => {
    form.setFieldsValue(valueFormUserDetail);
  }, [form, valueFormUserDetail]);

  useEffect(() => {
    if (seclectRow) {
      const resp = handlegetUserDetail(seclectRow);
      resp.then((res) => {
        const data = res.data.data;
        setValueFormUserDetail({
          name: data?.name,
          email: data?.email,
          isAdmin: data?.isAdmin,
          phone: data?.phone,
          address: data?.address,
          avatar: data?.avatar,
        });
      });
    }
  }, [seclectRow, openDrawer]);

  const HandleEditProduct = () => {
    setOpenDrawer(true);
  };

  const onFinishProductUpdate = () => {
    updateUserMutation.mutate(
      {
        id: seclectRow,
        ...valueFormUserDetail,
        access_token: user.access_token,
      },
      {
        onSuccess: (data) => {
          try {
            toast.success("Update User Success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
            form.resetFields();
            setValueFormUserDetail({
              name: "",
              email: "",
              isAdmin: "",
              phone: "",
              address: "",
              avatar: "",
            });
          } catch (error) {}
        },
        onError: (err) => {
          toast.error(err.response.data.message.message, {
            position: "top-center",
            style: { fontSize: "16px" },
            autoClose: 2000,
          });
        },
      }
    );
  };
  const isCloseDrawer = () => {
    form.resetFields();
    setOpenDrawer(false);
    refetch();
  };

  const handleOkeDelete = () => {
    if (selectRowKey.length > 0) {
      deleteManyProductMutation.mutate(
        {
          _id: selectRowKey,
          access_token: user.access_token,
        },
        {
          onSuccess: () => {
            toast.success("delete many user success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
            refetch();
          },
          onSettled: () => {
            refetch();
          },
          onError: (err) => {
            toast.error(err.response.data.message.message, {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
          },
        }
      );
      isOpenModalDelete(false);
    } else {
      deleteUserMutation.mutate(
        { id: seclectRow, access_token: user.access_token },
        {
          onSuccess: () => {
            toast.success("delete product success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
            setIsOpenModalDelete(false);
            handleCancelDelete();
          },
          onError: (err) => {
            toast.error(err.response.data.message.message, {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
          },
        }
      );
    }
  };
  const handleCancelDelete = () => {
    refetch();
    setIsOpenModalDelete(false);
  };
  const handleDeleteProduct = () => {
    setIsOpenModalDelete(true);
  };

  const handleSlectedUser = (select) => {
    setSelectRowKey(select);
  };
  const handleDeleteManyProdut = () => {
    setIsOpenModalDelete(true);
  };
  return (
    <>
      <WrapperContainer>
        <WrapperHeader>Quản lý người dùng</WrapperHeader>
      </WrapperContainer>
      {selectRowKey.length > 0 && (
        <div
          style={{
            marginBottom: "-20px",
            textAlign: "start",
            marginTop: "20px",
          }}>
          <Button
            style={{ cursor: "pointer" }}
            onClick={handleDeleteManyProdut}>
            Xóa tất cả
          </Button>
          <span
            style={{ fontSize: "18px", marginLeft: "10px", fontWeight: "500" }}>
            ({selectRowKey.length} user)
          </span>
        </div>
      )}
      <LoadingComponent spinning={isPendingGetAllUser}>
        <TableComponet
          isSelect={true}
          handleSlected={handleSlectedUser}
          data={data}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setSeclectRow(record._id);
              }, // click row
            };
          }}></TableComponet>
      </LoadingComponent>

      <DrawerComponet
        width="80%"
        openDrawer={openDrawer}
        title={"Chi tiết sản phẩm"}
        open={openDrawer}
        onClose={isCloseDrawer}>
        <LoadingComponent spinning={isPendingUpdateUser || isLoading}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishProductUpdate}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}>
              <InputComponent
                value={valueFormUserDetail.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormUserDetail.email}
                onChange={handleOnChange}
                name="type"
              />
            </Form.Item>
            <Form.Item label="IsAdmin" name="isAdmin">
              <InputComponent
                value={valueFormUserDetail.isAdmin}
                onChange={handleOnChange}
                name="isAdmin"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormUserDetail.phone}
                onChange={handleOnChange}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormUserDetail.address}
                onChange={handleOnChange}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <WrapperUploadAvatar onChange={handleChangeAvatar} maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </WrapperUploadAvatar>
            </Form.Item>
            {valueFormUserDetail.avatar && (
              <div
                style={{
                  textAlign: "end",
                  marginRight: "67px",
                  marginTop: "-70px",
                }}>
                <img
                  src={valueFormUserDetail.avatar}
                  alt={valueFormUserDetail.avatar}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}></img>
              </div>
            )}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponet>
      <ModalComponent
        title=""
        onOk={handleOkeDelete}
        onCancel={handleCancelDelete}
        open={isOpenModalDelete}>
        <span>Bạn có chắc chắn xóa không </span>
      </ModalComponent>
    </>
  );
}
