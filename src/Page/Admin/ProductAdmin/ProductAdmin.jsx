import React, { useEffect, useRef, useState } from "react";
import {
  WrapperButtonProduct,
  WrapperContainerProduct,
  WrapperHeaderProduct,
  WrapperUploadAvatar,
} from "./style";
import TableComponet from "../../../componet/TableComponent/TableComponet";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Select, Space } from "antd";
import InputComponent from "../../../componet/InputComponet/InputComponent";
import { getBase64 } from "../../../utils/base64";
import { useMutation, useQuery } from "@tanstack/react-query";
import productAPI from "../../../Api/ProductAPI";
import { toast } from "react-toastify";
import LoadingComponent from "../../../componet/LoadingComponent/LoadingComponent";
import DrawerComponet from "../../../componet/DrawerComponet/DrawerComponet";
import { useSelector } from "react-redux";
import ModalComponent from "../../../componet/ModalComponent/ModalComponent";

export default function ProductAdmin() {
  const [form] = Form.useForm(); // Khởi tạo form instance
  const [form1] = Form.useForm(); // Khởi tạo form instance
  const [seclectRow, setSeclectRow] = useState("");
  const [selectRowKey, setSelectRowKey] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [disible, setDisible] = useState(false);

  const user = useSelector((state) => state.user);

  const [valueFormProduct, setValueFormProduct] = useState({
    name: "",
    image: "",
    type: "",
    rating: "",
    price: "",
    countInStock: "",
    decription: "",
    discountPrice: "",
  });

  const [valueFormProductDetail, setValueFormProductDetail] = useState({
    name: "",
    image: "",
    type: "",
    rating: "",
    price: "",
    countInStock: "",
    decription: "",
    discountPrice: "",
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
    onFilter: (value, record) => {
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
    },

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // end search

  // create Product
  const createMutation = useMutation({
    mutationFn: (data) => productAPI.createProduct(data),
  });

  const { isPending, data: dataCrete } = createMutation;

  // updateProduct
  const updateProductMutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token, ...rest } = data;

      productAPI.updateProduct(id, rest, access_token);
    },
  });

  // delete Product
  const deleteProductMutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token } = data;

      productAPI.deleteProduct(id, access_token);
    },
  });
  const { data: dataDlete, isSuccess } = deleteProductMutation;

  // delete many Product
  const deleteManyProductMutation = useMutation({
    mutationFn: (data) => {
      const { access_token, ...rest } = data;

      productAPI.deleteManyProduct(rest, access_token);
    },
  });
  const { isSuccess: isSuccessDeleteManyProduct } = deleteManyProductMutation;

  // get All product
  const {
    data: dataProduct,
    isPending: isPendingGetAllProduct,
    refetch,
  } = useQuery({
    queryKey: ["allproduct"],
    queryFn: () => productAPI.getAllProduct(),
  });
  useEffect(() => {
    if (isSuccess) {
      handleCancelDelete();
      refetch();
    }
  }, [isSuccess, refetch]);
  // get type product
  const {
    data: datatype,
    isPending: isPendingType,
    refetch: isRefetchType,
  } = useQuery({
    queryKey: ["typeProduct"],
    queryFn: () => productAPI.getTypeProduct(),
  });

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
      title: "Type",
      dataIndex: "type",
      filters: [
        {
          text: "Điện lạnh",
          value: "Điện lạnh",
        },
        {
          text: "Điện tử",
          value: "Điện tử",
        },
        {
          text: "Khác",
          value: "Khác",
        },
      ],
      onFilter: (value, record) => {
        if (value === "Điện tử") {
          return record.type === "Điện tử";
        } else if (value === "Điện lạnh") {
          return record.type === "Điện lạnh";
        } else {
          return record.type !== "Điện tử" && record.type !== "Điện lạnh";
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">=3",
          value: ">=",
        },
        {
          text: "<3",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 3;
        } else {
          return record.rating < 3;
        }
      },
      filterSearch: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">=50",
          value: ">=",
        },
        {
          text: "<50",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 50;
        } else {
          return record.rating < 50;
        }
      },
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">=50",
          value: ">=",
        },
        {
          text: "<50",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 50;
        } else {
          return record.rating < 50;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const data = dataProduct?.data?.data?.map((product) => ({
    ...product,
    key: product._id,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    refetch();
  };
  const handleOnChange = (e) => {
    setValueFormProduct({
      ...valueFormProduct,
      [e.target.name]: e.target.value,
    });
  };
  const onFinishProduct = () => {
    createMutation.mutate(valueFormProduct, {
      onSuccess: () => {
        toast.success("create product success", {
          position: "top-center",
          style: { fontSize: "16px" },
          autoClose: 2000,
        });
        form.resetFields();
        refetch();
        isRefetchType();
        setValueFormProduct({
          name: "",
          image: "",
          type: "",
          rating: "",
          price: "",
          countInStock: "",
          decription: "",
          discountPrice: "",
        });
        setDisible(false);
      },
      onError: (err) => {
        toast.error(err.response.data.message.message, {
          position: "top-center",
          style: { fontSize: "16px" },
          autoClose: 2000,
        });
      },
    });
  };
  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setValueFormProduct({
      ...valueFormProduct,
      image: file.preview,
    });
  };
  const handleChangeAvatarProductDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setValueFormProductDetail({
      ...valueFormProductDetail,
      image: file.preview,
    });
  };

  const handlegetProductDetail = async (id) => {
    const res = await productAPI.getProductDetail(id);
    return res;
  };

  useEffect(() => {
    form1.setFieldsValue(valueFormProductDetail);
  }, [form1, valueFormProductDetail]);

  useEffect(() => {
    if (seclectRow) {
      const resp = handlegetProductDetail(seclectRow);
      resp.then((res) => {
        const data = res.data.data;
        setValueFormProductDetail({
          name: data?.name,
          image: data.image,
          type: data.type,
          rating: data.rating,
          price: data.price,
          countInStock: data.countInStock,
          decription: data.decription,
          discountPrice: data.discountPrice,
        });
      });
    }
  }, [seclectRow, openDrawer]);

  const HandleEditProduct = () => {
    setOpenDrawer(true);
  };

  const handleOnChangeProdictDetail = (e) => {
    setValueFormProductDetail({
      ...valueFormProductDetail,
      [e.target.name]: e.target.value,
    });
  };

  const onFinishProductUpdate = () => {
    updateProductMutation.mutate(
      {
        id: seclectRow,
        ...valueFormProductDetail,
        access_token: user.access_token,
      },
      {
        onSuccess: (data) => {
          try {
            toast.success("update product success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
            form1.resetFields();
            setValueFormProductDetail({
              name: "",
              image: "",
              type: "",
              price: "",
              countInStock: "",
              decription: "",
              discountPrice: "",
            });
          } catch (error) {
            console.error(error);
          }
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
    form1.resetFields();
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
            toast.success("delete many product success", {
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
      setIsOpenModalDelete(false);
    } else {
      deleteProductMutation.mutate(
        { id: seclectRow, access_token: user.access_token },
        {
          onSuccess: () => {
            toast.success("delete product success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
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
  const handleSlected = (selected) => {
    setSelectRowKey(selected);
  };
  const handleDeleteManyProdut = () => {
    setIsOpenModalDelete(true);
  };
  const renderDataType = () => {
    let ArrayTemp = [];
    if (datatype) {
      datatype.data.data.map((type) =>
        ArrayTemp.push({ value: type, label: type })
      );
    }
    ArrayTemp.push({ value: "Add type", label: "thêm type" });
    return ArrayTemp;
  };
  const handleChange = (value) => {
    if (value === "Add type") {
      setDisible(true);
    } else {
      setValueFormProduct({ ...valueFormProduct, type: value });
    }
  };

  return (
    <>
      <WrapperContainerProduct>
        <WrapperHeaderProduct>Quản lý sản phẩm</WrapperHeaderProduct>
        <WrapperButtonProduct
          onClick={showModal}
          className="buttonTest"
          style={{ padding: "60px" }}>
          <PlusOutlined className="Plus" style={{ fontSize: "40px" }} />
        </WrapperButtonProduct>
      </WrapperContainerProduct>
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
      <TableComponet
        isSelect={true}
        handleSlected={handleSlected}
        data={data}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setSeclectRow(record._id);
            },
          };
        }}></TableComponet>
      <ModalComponent
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <LoadingComponent spinning={isPending}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishProduct}
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
                value={valueFormProduct.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>
            {!disible && (
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}>
                <Select
                  // defaultValue="lucy"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  options={renderDataType()}
                />
              </Form.Item>
            )}

            {disible && (
              <Form.Item
                label="Add type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}>
                <InputComponent
                  value={valueFormProduct.type}
                  onChange={handleOnChange}
                  name="type"
                />
              </Form.Item>
            )}

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormProduct.rating}
                onChange={handleOnChange}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormProduct.price}
                onChange={handleOnChange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="DiscountPrice"
              name="discountPrice"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormProduct.discountPrice}
                onChange={handleOnChange}
                name="discountPrice"
              />
            </Form.Item>
            <Form.Item
              label="CountInStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormProduct.countInStock}
                onChange={handleOnChange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="decription"
              name="decription"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <InputComponent
                value={valueFormProduct.decription}
                onChange={handleOnChange}
                name="decription"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
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
            {valueFormProduct.image && (
              <div
                style={{
                  textAlign: "end",
                  marginRight: "67px",
                  marginTop: "-70px",
                }}>
                <img
                  src={valueFormProduct.image}
                  alt={valueFormProduct.image}
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
      </ModalComponent>

      <DrawerComponet
        width="80%"
        openDrawer={openDrawer}
        title={"Chi tiết sản phẩm"}
        open={openDrawer}
        onClose={isCloseDrawer}>
        <Form
          form={form1}
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
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
              value={valueFormProduct.name}
              onChange={handleOnChangeProdictDetail}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <InputComponent
              value={valueFormProduct.type}
              onChange={handleOnChangeProdictDetail}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <InputComponent
              value={valueFormProduct.rating}
              onChange={handleOnChangeProdictDetail}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <InputComponent
              value={valueFormProduct.price}
              onChange={handleOnChangeProdictDetail}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="DiscountPrice"
            name="discountPrice"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <InputComponent
              value={valueFormProduct.discountPrice}
              onChange={handleOnChangeProdictDetail}
              name="discountPrice"
            />
          </Form.Item>
          <Form.Item
            label="CountInStock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <InputComponent
              value={valueFormProduct.countInStock}
              onChange={handleOnChangeProdictDetail}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item
            label="decription"
            name="decription"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <InputComponent
              value={valueFormProduct.decription}
              onChange={handleOnChangeProdictDetail}
              name="decription"
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <WrapperUploadAvatar
              onChange={handleChangeAvatarProductDetail}
              maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadAvatar>
          </Form.Item>
          {valueFormProductDetail.image && (
            <div
              style={{
                textAlign: "end",
                marginRight: "67px",
                marginTop: "-70px",
              }}>
              <img
                src={valueFormProductDetail.image}
                alt={valueFormProductDetail.image}
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
              Apply
            </Button>
          </Form.Item>
        </Form>
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
