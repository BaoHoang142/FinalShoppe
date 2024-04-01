import "./Header.css";
import logo from "../../assets/logo-full-white.png";
import {
  Button,
  Dropdown,
  Pagination,
  notification,
  Modal,
  Avatar,
} from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import avatar from "../../assets/avatarBlack.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  quantityCart: number;
  image: string;
  storeName: string;
  storeId: number;
  userId: number;
  quantitySole: number;
}

interface Stores {
  storeId: number;
  storeName: string;
  statusStore: number;
  addressStore: string;
  phone: string;
  emailStore: string;
  userId: number;
}

export default function Header() {
  // lay dữ liệu trên lcoal
  const [stores, setStores] = useState<Stores>({} as Stores);
  const [carts, setCarts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //het modal

  // Hàm đăng xuất về trang login
  const handleButton = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/dangnhap");
  };

  // Lấy dữ liệu bảng stores về
  const handleStore = async () => {
    try {
      let data = await axios.get(
        `http://localhost:8080/api/v1/stores/${flagUser.userId}`
      );
      setStores(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(stores);
  useEffect(() => {
    handleStore();
  }, []);

  // Lấy giá trị query hàm search
  const [search, setSearch] = useState<string | null>("");
  const [products, setProducts] = useState<Product[]>([]);
  const handleSearch = async () => {
    if (search == "") {
      notification.error({
        message: "Vui lòng nhập thông tin tìm kiếm!",
        placement: "top",
        duration: 2,
      });
      return;
    }
    showModal();
    try {
      let products = await axios.get(
        `http://localhost:8080/api/v1/products/search?key=${search}`
      );
      setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy dữ liệu giỏ hàng
  const getCart = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/cart/${flagUser.userId}`
      );

      setCarts(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(carts);
  // Thông báo cửa hàng bị khóa
  const handleAlertStores = () => {
    notification.error({
      message: "Cửa hàng bị khóa, liên hệ với admin!",
      placement: "top",
      duration: 2,
    });
  };
  // chuyen doi tien te
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  // Phân trang
  const shopsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    console.log(page);
    setCurrentPage(page);
  };

  const startShopIndex = (currentPage - 1) * shopsPerPage;
  const visibleShops = products.slice(
    startShopIndex,
    startShopIndex + shopsPerPage
  );
  // het phan trang
  useEffect(() => {
    getCart();
  }, [carts.length]);
  console.log(stores);
  return (
    <>
      <div id="header">
        <div className="header__navbar">
          <div className="header__navbar--left">
            <div className="nav__left textNav textNavShop">
              {stores?.statusStore == 1 ? (
                <p style={{ cursor: "pointer", color: "#fff" }}>
                  {" "}
                  <NavLink style={{ color: "#fff" }} to={"/danhsachsanpham"}>
                    Kênh Người Bán
                  </NavLink>
                </p>
              ) : stores?.statusStore == 0 ? (
                <p style={{ cursor: "pointer", color: "#fff" }}>
                  {" "}
                  <div style={{ color: "#fff" }} onClick={handleAlertStores}>
                    Kênh Người Bán
                  </div>
                </p>
              ) : (
                <p style={{ cursor: "pointer", color: "#fff" }}>
                  {" "}
                  <NavLink style={{ color: "#fff" }} to={"/dangky-cuahang"}>
                    Kênh Người Bán
                  </NavLink>
                </p>
              )}
            </div>
            <div className="nav__left textNav textNavBecameShop">
              <p>Về chúng tôi</p>
            </div>
            <div className="nav__left textNav textNavDown">
              <p>Tải ứng dụng</p>
            </div>
            <div
              className="nav__left textNav textNavConnect"
              style={{ display: "flex", gap: "3px", width: "100px" }}
            >
              <p style={{ border: "none" }}>
                Kết nối
                <i
                  className="fa-brands fa-facebook"
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                ></i>
                <i
                  className="fa-brands fa-instagram"
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                ></i>
              </p>
            </div>
          </div>
          <div className="header__navbar--right">
            <div className="nav__right textNav textNavNoti">
              <i className="fa-regular fa-bell" style={{ color: "#fff" }}></i>
              <p style={{ marginLeft: "5px" }}>Thông Báo</p>
            </div>
            <div className="nav__right textNav textNavSupport">
              <i
                className="fa-regular fa-circle-question"
                style={{ color: "#fff" }}
              ></i>
              <p style={{ marginLeft: "5px" }}>Hỗ Trợ</p>
            </div>
            <div className="nav__right textNav textNavLanguage">
              <i
                className="fa-solid fa-earth-americas"
                style={{ color: "#fff" }}
              ></i>
              <p style={{ marginLeft: "5px" }}>Tiếng Việt</p>
            </div>
            {flagUser ? (
              <>
                {flagUser.statusUser === 2 ? (
                  <div className="navbar__link--account__container">
                    <div className="shopee-avatar">
                      <img
                        src={flagUser.avatarUrl}
                        alt=""
                        className="shopee-avatar__img"
                      />
                    </div>
                    <NavLink to={"/admin/users"} className="navbar__username">
                      Admin
                    </NavLink>
                  </div>
                ) : (
                  <div className="navbar__link--account__container">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: (
                              <NavLink
                                to={"/profile"}
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 10,
                                }}
                              >
                                <NoteAltOutlinedIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                >
                                  Tài Khoản
                                </button>
                              </NavLink>
                            ),
                          },
                          {
                            key: "2",
                            label: (
                              <NavLink
                                to={"/donmua"}
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 15,
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                <ShoppingBagOutlinedIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                >
                                  Đơn Mua
                                </button>
                              </NavLink>
                            ),
                          },
                          {
                            key: "3",
                            label: (
                              <div
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 15,
                                }}
                              >
                                <LogoutIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                  onClick={handleButton}
                                >
                                  Đăng Xuất
                                </button>
                              </div>
                            ),
                          },
                        ],
                      }}
                      placement="bottom"
                      arrow
                    >
                      <Button
                        className="avatar__order"
                        style={{
                          backgroundColor: "#F7442E",
                          border: "none",
                          boxShadow: "none",
                        }}
                      >
                        {" "}
                        <Avatar
                          src={flagUser.avatarUrl}
                          className="shopee-avatar"
                          size={25}
                        >
                          ĐN
                        </Avatar>
                        <span
                          className="navbar__username"
                          style={{ color: "#FDFFFF" }}
                        >
                          {flagUser.userName}
                        </span>{" "}
                      </Button>
                    </Dropdown>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="nav__right textNav textNavRegister">
                  <NavLink className="nav__right--register" to={"/dangky"}>
                    Đăng ký{" "}
                  </NavLink>
                </div>
                <div className="nav__right textNav textNavLogin">
                  <NavLink
                    to={"/dangnhap"}
                    className="nav__right--register"
                    style={{ border: "none" }}
                  >
                    Đăng nhập{" "}
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="header__bot">
          <p
            className="header__bot--logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="" />
          </p>
          <div className="header__bot--search">
            <div className="header__bot--search--input">
              <div className="header__bot--search--input--box">
                <input
                  className="input__search"
                  placeholder="Săn deal thời trang và mỹ phẩm ngay"
                  type="text"
                  style={{ outline: "none" }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="header__bot--search--input--button">
                <button
                  className="btn__search"
                  onClick={handleSearch}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: "#fff", cursor: "pointer" }}
                  ></i>
                </button>
              </div>
            </div>
            <div className="header__bot--search--text">
              <p>Peripera Water Bare Tint</p>
              <p>Romand Glasting Water Tint</p>
              <p>Hoodie Stussy</p>
              <p>City Cycle</p>
              <p>Áo Thun Nocturnal</p>
              <p>Levents</p>
              <p>Thuốc Nhuộm Tóc</p>
              <p>Móc Khoá</p>
            </div>
          </div>
          <div className="header__bot--cart">
            {flagUser?.userId ? (
              <>
                <NavLink
                  to={"/cart"}
                  className="fa-solid fa-cart-shopping"
                  style={{ color: "#fff", fontSize: "25px" }}
                ></NavLink>
              </>
            ) : (
              <>
                <div
                  className="fa-solid fa-cart-shopping"
                  style={{ color: "#fff", fontSize: "25px" }}
                ></div>
              </>
            )}

            {/* <div className="header__bot--cart--number">0</div> */}
          </div>
        </div>
        <Modal
          title="Danh sách tìm kiếm "
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ width: "1000px", marginLeft: "500px" }}
        >
          {visibleShops?.length === 0 ? (
            <div>
              <p style={{ fontSize: 20 }}>Không có sản phẩm nào phù hợp!</p>
            </div>
          ) : (
            <>
              {visibleShops?.map((product: any) => (
                <div>
                  <div
                    className="list_search"
                    key={product.productId}
                    onClick={() => navigate(`/chitiet/${product.productId}`)}
                  >
                    <div
                      className="list_search_nameProduct"
                      style={{ width: "200px" }}
                    >
                      {product.productName}
                    </div>
                    <div className="list_search_imgProduct">
                      <img
                        src={product.imageProduct}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className="list_search_priceProduct">
                      {formatCurrency(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <Pagination
            current={currentPage}
            pageSize={shopsPerPage}
            total={products?.length}
            onChange={handlePageChange}
            style={{ paddingBottom: 50, paddingTop: 20, marginLeft: "5%" }}
          />
        </Modal>
      </div>
    </>
  );
}
