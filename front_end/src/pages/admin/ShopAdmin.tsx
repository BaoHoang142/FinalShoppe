import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { notification } from "antd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import privateAxios from "../configAxios/privateAxios";
// import privateAxios from "../configAxios/privateAxios";

type Stores = {
  storeName: string;
  addressStore: string;
  phone: string;
  storeId: string;
  statusStore: number;
};
export default function ShopAdmin() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [stores, setStores] = useState<Stores[]>([]);
  const [search, setSearch] = useState<string>("");
  // lay tat ca store
  const getStores = async () => {
    privateAxios
      .get("stores")
      .then((res) => setStores(res.data))
      .catch((err) => console.log(err));
  };
  console.log(stores);
  //   Khóa Cửa hàng
  const handleLock = async (id: string) => {
    let statusStore = 0;
    try {
      let response = await privateAxios.patch(
        `stores/admin/statusAdmin/${id}`,
        {
          statusStore,
        }
      );
      notification.error({
        message: "Cửa hàng đã được khóa!",
        placement: "top",
        duration: 2,
      });
      getStores();
    } catch (error) {
      console.log(error);
    }
  };

  //   Mở khóa cửa hàng
  const handleUnLock = async (id: string) => {
    let statusStore = 1;
    try {
      let response = await privateAxios.patch(
        `stores/admin/statusAdmin/${id}`,
        {
          statusStore,
        }
      );
      notification.success({
        message: "Đã mở khóa cửa hàng!",
        placement: "top",
        duration: 2,
      });
      getStores();
    } catch (error) {
      console.log(error);
    }
  };

  // Search sản phẩm
  const handleSearch = async () => {
    privateAxios
      .get(`stores/search?key=${search}`)
      .then((res) => setStores(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStores();
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="main_admin">
          <div className="userAdmin111">
            <div className="search_admin">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>
                <SearchIcon />
              </button>
            </div>
            <div style={{ alignItems: "center", display: "flex" }}>
              <div style={{ fontSize: 25 }}>{stores?.length}</div>{" "}
              <StorefrontIcon style={{ fontSize: 30, color: "red" }} />
            </div>
          </div>

          <div className="div_table">
            <table className="table_users">
              <tbody>
                <tr className="tr_user1">
                  <th>Stt</th>
                  <th>Tên cửa hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Hành động</th>
                </tr>
                {stores &&
                  stores.map((store, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{store.storeName}</td>
                      <td>{store.phone}</td>
                      <td>{store.addressStore}</td>
                      {store.statusStore === 1 ? (
                        <td
                          className="icon_"
                          onClick={() => handleLock(store.storeId)}
                        >
                          <LockOpenOutlinedIcon />
                        </td>
                      ) : (
                        <td
                          className="icon_"
                          onClick={() => handleUnLock(store.storeId)}
                        >
                          <LockOutlinedIcon />
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
