import "./Admin.css";
import { Avatar } from "antd";
import ListIcon from "@mui/icons-material/List";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Dropdown } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import shoppeLogo from "../../assets/ShopeeLogo.png";
import avatar from "../../assets/avatarBlack.jpg";

export default function HeaderAdmin() {
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  console.log(flagUser)
  // Hàm đăng xuất về trang login
  const navigate = useNavigate();
  const handleButton = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/dangnhap");
  };

  return (
    <>
      <div className="container_header">
        <NavLink to={"/admin/users"} className="header_order">
          {" "}
          <img src={shoppeLogo} alt="" style={{ width: 120 }} />
          <p style={{ paddingTop: 10 }}>Admin</p>
        </NavLink>
        <div className="header_orderl">
          <div>
            <Dropdown
              menu={{
                items: [
                  {
                    key: "2",
                    label: (
                      <button
                        style={{
                          alignItems: "center",
                          display: "flex",
                          gap: 10,
                          background: "none",
                          border: "none",
                          fontSize: ".9125rem",
                        }}
                      >
                        <LogoutIcon />
                        <p
                          onClick={handleButton}
                          style={{ color: "rgba(0, 0, 0, 0.88)" }}
                        >
                          Log Out
                        </p>
                      </button>
                    ),
                  },
                ],
              }}
              placement="bottom"
              arrow
            >
              <Button className="avatar__order">
                {" "}
                {/* <Avatar
                  src={flagUser?.avatarUrl}
                  className="avatarrr"
                  size={40}
                >
                  ĐN
                </Avatar> */}
                <span>{flagUser?.userName}</span>{" "}
              </Button>
            </Dropdown>
          </div>
          <ListIcon />
          <NotificationsNoneOutlinedIcon />
          <div className="btn__order">
            <button>SHOPEE UNI</button>
          </div>
        </div>
      </div>
    </>
  );
}
