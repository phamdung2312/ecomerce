import { Button, Divider, Table } from "antd";
import React, { useState } from "react";
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from "react";

export default function TableComponet(props) {
  const {
    selectionType = "checkbox",
    data,
    columns,
    handleSlected,
    isSelect,
  } = props;
  const [selectedRowKeysData, setSelectedRowKeysData] = useState([]);
  // rowSelection object indicates the need for row selection

  const FilterColumns = useMemo(() => {
    const filter = columns.filter((column) => column.title !== "Action");
    return filter;
  }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeysData(selectedRowKeys);
      handleSlected(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  // handle export excel
  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(FilterColumns)
      .addDataSource(data, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <div>
      <Divider />
      <div
        style={{
          marginBottom: "10px",
          textAlign: "start",
          marginTop: "10px",
        }}>
        <Button
          style={{
            cursor: "pointer",
            backgroundColor: "#0096ff",
            color: "white",
          }}
          onClick={handleClick}>
          Export Excel
        </Button>
      </div>
      <Table
        rowSelection={
          isSelect && {
            type: selectionType,
            ...rowSelection,
          }
        }
        columns={columns}
        dataSource={data}
        {...props}
      />
    </div>
  );
}
