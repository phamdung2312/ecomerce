import React, { useEffect, useRef, useState } from "react";
import { WrapperContainer, WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import { useSelector } from "react-redux";
import InputComponent from "../../../componet/InputComponet/InputComponent";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userAPI } from "../../../Api/UserAPI";
import { getBase64 } from "../../../utils/base64";
import { toast } from "react-toastify";
import LoadingComponent from "../../../componet/LoadingComponent/LoadingComponent";
import TableComponet from "../../../componet/TableComponent/TableComponet";
import DrawerComponet from "../../../componet/DrawerComponet/DrawerComponet";
import { WrapperUploadAvatar } from "../ProductAdmin/style";
import ModalComponent from "../../../componet/ModalComponent/ModalComponent";
import { OrderAPI } from "../../../Api/OrderAPI";
import { convertDatetime } from "../../../utils/convertDateTime";
import { useNavigate } from "react-router-dom";
import Step from "../../../componet/Steps/Step";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function OrderAdmin() {
  const [form] = Form.useForm(); // Khởi tạo form instance
  const [form1] = Form.useForm(); // Khởi tạo form instance
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

  const navigate = useNavigate();

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

  // get All User
  const {
    data: dataUser,
    isPending: isPendingGetAllUser,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: () => userAPI.getAllUser(user.access_token),
  });

  // get All User
  const { data: getAllProductAdmin, isPending: isPendinGetAllProductAdmin } =
    useQuery({
      queryKey: ["allUserAdmin"],
      queryFn: () => OrderAPI.getAllOrderAdmin(user.access_token),
    });

  const handleShow = (record) => {
    navigate(`/order-detail-admin/${record._id}`, { state: record });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      //   ...getColumnSearchProps("name"),
    },
    {
      title: "Name",
      dataIndex: "name",
      //   ...getColumnSearchProps("email"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "DateAt",
      dataIndex: "dateat",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <EyeOutlined
          onClick={() => handleShow(record)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  const data = getAllProductAdmin?.data?.data?.map((order) => ({
    ...order,
    status: order.status,
    name: order.shippingAddress.fullName,
    key: order._id,
    id: order._id,
    dateat: convertDatetime(order.createdAt),
  }));
  const handlegetUserDetail = async (id) => {
    setIsLoading(true);
    const res = await userAPI.getUserDetail(id, user.access_token);
    setIsLoading(false);
    return res;
  };

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

  const handleSlectedUser = (select) => {
    setSelectRowKey(select);
  };
  const handleDeleteManyProdut = () => {
    setIsOpenModalDelete(true);
  };
  const renderDataChart = () => {
    const dataRender = [];

    data?.forEach((item) => {
      // Tìm kiếm xem phương thức thanh toán đã tồn tại trong dataRender hay chưa
      const existingItem = dataRender.find(
        (entry) => entry.name === item.paymentMethod
      );

      if (existingItem) {
        // Nếu đã tồn tại, tăng giá trị value
        existingItem.value += 1;
      } else {
        // Nếu chưa tồn tại, thêm mới vào mảng với value là 1
        dataRender.push({
          name: item.paymentMethod,
          value: 1,
        });
      }
    });

    return dataRender;
  };
  const dataChart = renderDataChart();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <WrapperContainer>
        <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      </WrapperContainer>
      <ResponsiveContainer width="100%" height="27%">
        <PieChart width={400} height={400}>
          <Pie
            data={dataChart}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {dataChart?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
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
          isSelect={false}
          handleSlected={handleSlectedUser}
          data={data}
          columns={columns}></TableComponet>
      </LoadingComponent>
    </>
  );
}
