import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { notification } from "antd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
// import privateAxios from "../configAxios/privateAxios";
import { useEffect, useState } from "react";
import axios from "axios";
import privateAxios from "../configAxios/privateAxios";

interface Users {
  userName: string;
  email: string;
  phone: string;
  gender: string;
  statusUser: number;
  userId: string;
  role: number;
}

export default function UserAmin() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [users, setUsers] = useState<Users[]>([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    privateAxios
      .get("users/list")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  //   Khóa user
  const handleLock = async (id: string) => {
    let statusUser = 0;
    try {
      let response = await privateAxios.patch(`users/status/${id}`, {
        statusUser,
      });
      // let email = response.data.email;
      notification.error({
        message: "Đã khóa tài khoản!",
        placement: "top",
        duration: 2,
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  //   Mở khóa user
  const handleUnLock = async (id: string) => {
    let statusUser = 1;
    try {
      let response = await privateAxios.patch(`users/status/${id}`, {
        statusUser,
      });
      // let email = response.data.email;
      notification.success({
        message: "Đã mở khóa tài khoản!",
        placement: "top",
        duration: 2,
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Search người dùng
  const handleSearch = async () => {
    privateAxios
      .get(`users/search?key=${search}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsers();
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
              <div style={{ fontSize: 25 }}>{users?.length}</div>{" "}
              <PersonOutlineIcon style={{ fontSize: 30, color: "red" }} />
            </div>
          </div>
          <div className="div_table">
            <table className="table_users">
              <tbody>
                <tr className="tr_user1">
                  <th>Stt</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Giới tính</th>
                  <th>Hành động</th>
                </tr>
                {users &&
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.gender}</td>
                      {user.statusUser === 1 ? (
                        <td
                          className="icon_"
                          onClick={() => handleLock(user.userId)}
                        >
                          <LockOpenOutlinedIcon />
                        </td>
                      ) : user.role === 1 ? (
                        <td className="icon_">Admin</td>
                      ) : (
                        <td
                          className="icon_"
                          onClick={() => handleUnLock(user.userId)}
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
