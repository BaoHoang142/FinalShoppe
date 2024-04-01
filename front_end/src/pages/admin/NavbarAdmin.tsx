import "../shop/Shopuser.css";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { NavLink } from "react-router-dom";
export default function NavbarAdmin() {
  return (
    <div>
      <div className="shop_left shop_left1">
        <div style={{ paddingTop: 30 }}>
          <div className="option_shop" style={{ alignItems: "center" }}>
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <AccountBoxOutlinedIcon style={{ color: "#757575" }} />
            </div>
            <div>
              <NavLink
                to={"/admin/users"}
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <h4 style={{ fontSize: 14 }}>Quản Lý Người Dùng</h4>
              </NavLink>
            </div>
          </div>
          <div className="option_shop" style={{ alignItems: "center" }}>
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <CardMembershipOutlinedIcon style={{ color: "#757575" }} />
            </div>
            <div>
              <NavLink
                to={"/admin/products"}
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <h4 style={{ fontSize: 14 }}>Quản Lý Sản Phẩm</h4>
              </NavLink>
            </div>
          </div>
          <div className="option_shop" style={{ alignItems: "center" }}>
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <StorefrontIcon style={{ color: "#757575" }} />
            </div>
            <div>
              <NavLink
                to={"/admin/shop"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4 style={{ fontSize: 14 }}>Quản Lý Shop</h4>
              </NavLink>
            </div>
          </div>
          <div className="option_shop" style={{ alignItems: "center" }}>
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <CategoryIcon style={{ color: "#757575" }} />
            </div>
            <div>
              <NavLink
                to={"/admin/categories"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4 style={{ fontSize: 14 }}>Quản Lý Mặt Hàng</h4>
              </NavLink>
            </div>
          </div>
          <div className="option_shop" style={{ alignItems: "center" }}>
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <AccountBalanceIcon style={{ color: "#757575" }} />
            </div>
            <div>
              <NavLink
                to={"/admin/marketing"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4 style={{ fontSize: 14 }}>Kênh Marketing</h4>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
