import "./Index.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { PlusOutlined } from "@ant-design/icons";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { isAuth } from "../axiosConfig/Auth";
import AddData from "./Modals/AddData";
import EditData from "./Modals/EditData";

export default function Index() {
  const componentRef = useRef();
  const [data, setData] = useState([]);
  // const [updated, setUpdated] = useState(false);

  const handleEdit = (item) => {
    alert("item: " + item);
  };

  const handleDelete = async (id) => {
    alert("id: " + id);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CATEGORY",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`http://127.0.0.1:8000/storage/${record.image}`}
          alt={record.name}
          style={{ width: "70px", height: "auto" }}
        />
      ),
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) => (
        <span className={item.status === 1 ? "active" : "inactive"}>
          {item.status === 1 ? "active" : "inactive"}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/data/show/${item.id}`}
            className="eyeIcon"
            data-tooltip="view"
            style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
          >
            <BsEye />
          </Link>
          <Link
            to="#"
            className="editIcon"
            data-tooltip="edit"
            onClick={() => handleEdit(item)}
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
          </Link>
          <Link
            to="#"
            className="trashIcon"
            data-tooltip="delete"
            onClick={() => handleDelete(item.id)}
            style={{ "--c": "#F15353", "--bg": "#FECACA" }}
          >
            <BiTrash />
          </Link>
        </>
      ),
    },
  ];

  const handleDisplayAddModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.toggle("visible");
  };

  return (
    <>
      <Header />

      <div className="Index">
        <div className="title">
          <h3>This is my data</h3>

          {isAuth() ? (
            <button className="btn btn-main" onClick={handleDisplayAddModel}>
              <PlusOutlined />
              Add data
            </button>
          ) : (
            false
          )}
        </div>

        <div className="tableItems" ref={componentRef}>
          {isAuth() ? (
            <Table columns={columns} dataSource={data} pagination={true} />
          ) : (
            <p>There is no data in the database.</p>
          )}

          {/* Add Data */}
          <AddData />

          {/* Edit Data */}
          <EditData />
        </div>
      </div>

      <Footer />
    </>
  );
}
