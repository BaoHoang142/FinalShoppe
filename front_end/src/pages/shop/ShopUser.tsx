import { NavLink } from "react-router-dom";
import "./Shopuser.css";
import shop1 from "../../assets/shop/1.png";
import shop2 from "../../assets/shop/2.png";
import shop3 from "../../assets/shop/3.png";
export default function ShopUser() {
  return (
    <div>
      <div className="shop_left">
        <div>
          <div className="option_shop">
            <div
              className="option_shop1"
              style={{ marginRight: 10, marginTop: 10 }}
            >
              <img
                src={shop2}
                alt=""
                style={{ width: 18, marginTop: "10px" }}
              />
            </div>
            <div>
              <h4 style={{ marginTop: "-10px" }}>Quản Lý Sản Phẩm</h4>
              <NavLink
                to={"/danhsachsanpham"}
                style={{ textDecoration: "none", marginTop: "10px" }}
              >
                <p style={{ marginTop: "10px" }}>Tất Cả Sản Phẩm</p>
              </NavLink>
              <NavLink to={"/themsanpham"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Thêm Sản Phẩm</p>
              </NavLink>
              <NavLink to={"/vipham"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Sản Phẩm Vi Phạm</p>
              </NavLink>
              <NavLink to={"/caidatsanpham"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Cài Đặt Sản Phẩm</p>
              </NavLink>
            </div>
          </div>
          <div className="option_shop">
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <img src={shop1} alt="" style={{ width: 18 }} />
            </div>
            <div>
              <h4>Quản Lý Đơn Hàng</h4>
              <NavLink to={"/order"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Tất Cả Đơn Hàng</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Đã Hủy</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Trả Hàng/Hoàn tiền</p>
              </NavLink>
            </div>
          </div>
          <div className="option_shop">
            <div className="option_shop1" style={{ marginRight: 10 }}>
              <img src={shop3} alt="" style={{ width: 18 }} />
            </div>
            <div>
              <h4>Quản Lý Shop</h4>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Đánh Giá Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Hồ Sơ Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Trang Trí Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Danh Mục Của Shop</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Kho Hình Ảnh/Video</p>
              </NavLink>
              <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <p style={{ marginTop: "10px" }}>Báo Cáo Của Tôi</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
