import React, { useState } from "react";
import { Table, Space, Input, Pagination } from "antd";

import { traverseTwoPhase } from "react-dom/test-utils";

const TableComponent = ({
  totalStateWiseCount,
  loading,
  loadData,
  totalStateArrayLength,
  filteredData,
  stateSearch,
}) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [searchText ,setSearchText] = useState("");

  const handleChange = (_, filters, sorter) => {
    const { order, field } = sorter;
    setSortedInfo({ columnKey: field, order });
  };

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentSateCovidCount = totalStateWiseCount.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a className="text-primary">Previous</a>;
    }
    if (type === "next") {
      return <a className="text-info">Next</a>;
    }
    return originalElement;
  };

  const columns = [
    {
      title: "State/UT",
      dataIndex: "state",
      sorter: (a, b) => a.state.length - b.state.length,
      sortOrder: sortedInfo.columnKey === "state" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Confirmed",
      dataIndex: "confirmed",
      sorter: (a, b) => a.confirmed.length - b.confirmed.length,
      sortOrder: sortedInfo.columnKey === "confirmed" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Active",
      dataIndex: "active",
      sorter: (a, b) => a.active.length - b.active.length,
      sortOrder: sortedInfo.columnKey === "active" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Recovered",
      dataIndex: "recovered",
      sorter: (a, b) => a.recovered.length - b.recovered.length,
      sortOrder: sortedInfo.columnKey === "recovered" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Deaths",
      dataIndex: "deaths",
      sorter: (a, b) => a.deaths.length - b.deaths.length,
      sortOrder: sortedInfo.columnKey === "deaths" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Daily confirmed",
      dataIndex: "deltaconfirmed",
      sorter: (a, b) => a.deltaconfirmed.length - b.deltaconfirmed.length,
      sortOrder: sortedInfo.columnKey === "deltaconfirmed" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Daily Recovered",
      dataIndex: "deltaRecovered",
      sorter: (a, b) => a.deltaRecovered.length - b.deltaRecovered.length,
      sortOrder: sortedInfo.columnKey === "deltaRecovered" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Daily Death",
      dataIndex: "deltadeath",
      sorter: (a, b) => a.deltadeath.length - b.deltadeath.length,
      sortOrder: sortedInfo.columnKey === "deltadeath" && sortedInfo.order,
      width: 120,
    },
  ];

  const handleSearch = (e) => {
      setSearchText(e.target.value);
      if (e.target.value === "") {
          loadData();
      }
  };

  const clearAll = () => {
      setSortedInfo({});
      setSearchText("");
      loadData();
  };

  const refresh = () => {
      window.location.reload();
  };


  return (
    <>
    <Space style={{marginBottom: 10, marginTop:10}}>
        <Input
        placeholder="Search State"
        onChange={handleSearch}
        type="text"
        style={{height: "35px"}}
        value={searchText}
        />
        <button onClick={() => stateSearch(searchText)} className="btn btn-raised btn-success">
            Search
        </button>
        <button onClick={clearAll} className="btn btn-raised btn-info">
            Clear
        </button>
        <button onClick={refresh} className="btn btn-raised btn-warning">
            Refresh
        </button>

    </Space>
      <Table
        columns={columns}
        dataSource={
            filteredData && filteredData.length ? filteredData :
          currentSateCovidCount.length !== 0
            ? currentSateCovidCount
            : totalStateWiseCount
        }
        pagination={false}
        loading={loading}
        bordered
        onChange={handleChange}
      />
      <Space style={{ marginBottom: 16, marginTop: 10 }}>
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={postPerPage}
          total={totalStateArrayLength}
          current={page}
          showSizeChanger
          showQuickJumper
          onShowSzieChange={onShowSizeChange}
          itemRender={itemRender}
        />
      </Space>
    </>
  );
};

export default TableComponent;
