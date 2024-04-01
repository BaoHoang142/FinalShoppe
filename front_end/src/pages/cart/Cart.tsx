import "./Cart.css";
import { Avatar, notification } from "antd";
import { Dropdown } from "antd";
import MessageIcon from "@mui/icons-material/Message";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import { Button, Modal } from "antd";
import Footer from "../../components/footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import shoppeLogo from "../../assets/ShopeeLogo.png";
import ship from "../../assets/ship/10.png";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAntd from "../../components/modal/ModalAntd";
import privateAxios from "../configAxios/privateAxios";
interface Product {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  quantityCart: number;
  imageProduct: string;
  storeName: string;
  storeId: number;
  userId: number;
  quantitySole: number;
  cartId: number;
}
export default function Cart() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  // Lấy dữ liệu user lưu trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(true);
  const [carts, setCarts] = useState<any>([]);
  const [addressOrder, setAddress] = useState("");
  const [phoneOrder, setPhoneOrder] = useState("");
  const [nameOrder, setNameOrder] = useState("");
  const [chooseCart, setChooseCart] = useState<any>([]);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Hàm đăng xuất về trang login
  const handleButton = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/dangnhap");
  };

  // Lấy dữ liệu giỏ hàng
  const getCart = async () => {
      privateAxios.get(`carts/list/${flagUser.userId}`)
      .then((res) => setCarts(res.data))
      .catch((err) => console.log(err));
  };
  // Tăng giảm số lượng
  const decreaseQuantity = (productId: number) => {
    const updatedCarts = carts.map((cart: any) => {
      if (cart.product.productId === productId && cart.quantityCart > 1) {
        return {
          ...cart,
          quantityCart: cart.quantityCart - 1,
        };
      }
      return cart;
    });
    setCarts(updatedCarts);
  };

  const increaseQuantity = async (productId: number) => {
    // tim product xem quantity có vượt giới hạn không
    const respone = await privateAxios.get(
      `products/productDetail/${productId}`
    );

    const updatedCarts = carts.map((cart: any) => {
      if (cart.product.productId === productId) {
        if (respone.data.data.quantity == cart.quantityCart) {
          notification.error({
            message: "Đã vượt quá số lượng sản phẩm!",
            placement: "top",
            duration: 2,
          });
        } else {
          return {
            ...cart,
            quantityCart: cart.quantityCart + 1,
          };
        }
      }
      return cart;
    });
    setCarts(updatedCarts);
  };
  // Tính tổng thanh toán
  const calculateTotal = () => {
    let total = 0;
    newCarts.forEach((cart: any) => {
      total += cart.product.price * cart.quantityCart;
    });
    return total;
  };
  // Hàm xóa sản phẩm trong giỏ hàng

  // chọn hết

  // chọn thanh toán cart
  const getChooseCart = (e: any) => {
    if (e.target.checked === true) {
      setChooseCart([...chooseCart, e.target.value]);
    } else {
      setChooseCart(chooseCart.filter((item: any) => item !== e.target.value));
    }
    console.log(chooseCart);
  };
  // tao cart moi
  let newCarts: any = [];
  for (let i = 0; i < carts.length; i++) {
    if (chooseCart.includes(carts[i].cartId.toString())) {
      newCarts.push(carts[i]);
    }
  }

  // validate input
  const [errorInput, setErrorInput] = useState<any>({
    errPhone: "",
  });
  //validate
  const validateInput = () => {
    const regexName = /^.{6,}$/;
    const regexPhone = /^(?:\+84|0)(?:\d{9,10})$/;
    let check = true;
    const err = {
      errPhone: "",
    };
    if (!regexPhone.test(phoneOrder)) {
      err.errPhone = "Số điện thoại không hợp lệ";
      check = false;
    }
    setErrorInput(err);
    return check;
  };
  // Sự kiện xử lý thanh toán đơn hàng tạo bảng order và orderDetail
  const handlePay = async () => {
    let totalPrice = calculateTotal();
    let userId = flagUser.userId;
    if (addressOrder == "" || phoneOrder == "" || nameOrder == "") {
      notification.error({
        message: "Vui lòng điền đầy đủ thông tin!",
        placement: "top",
        duration: 2,
      });
      return;
    }
    if (newCarts?.length == 0) {
      notification.error({
        message: "Bạn chưa chọn sản phẩm nào!!",
        placement: "top",
        duration: 2,
      });
      setIsModalOpen(false);
    } else {
      let check = validateInput();
      if (check) {
        try {
          // Tạo order và lấy orderId từ response
          for (let i = 0; i < newCarts.length; i++) {
            let cart = newCarts[i];
            let storeId = cart.product.stores[0].storeId;
            let orderResponse = await privateAxios.post(
              `orders`,
              {
                addressOrder,
                phoneOrder,
                nameOrder,
                totalPrice,
                storeId,
                userId,
              }
            );
            setAddress("");
            setPhoneOrder("");
            setNameOrder("");
            console.log(orderResponse);
            // Tạo orderDetail cho từng sản phẩm trong giỏ hàng
            try {
              await privateAxios.post(`order-details`, {
                productId: cart.product.productId,
                quantityOrder: cart.quantityCart,
                priceOrder: cart.product.price,
                orderId: orderResponse.data.order.orderId,
              });
            } catch (error) {
              console.log(error);
            }
            // Cập nhật số lượng đã bán
            try {
              const updatedQuantitySole =
                cart.product.quantitySole + cart.quantityCart;
              await updateProductQuantitySole(
                cart.product.productId,
                updatedQuantitySole
              );
            } catch (error) {
              console.log(error);
            }
            // Cập nhật số lượng sản phẩm
            try {
              const updatedQuantity = cart.product.quantity - cart.quantityCart;
              await updateProductQuantity(
                cart.product.productId,
                updatedQuantity
              );
            } catch (error) {
              console.log(error);
            }
            notification.success({
              message: "Thanh toán thành công!",
              placement: "top",
              duration: 2,
            });
            setIsModalOpen(false);
            // Xóa khỏi giỏ hàng
            try {
              let response = await privateAxios.delete(
                `carts/${cart.cartId}`
              );
              getCart();
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // navigate("/donmua");
  };
  // Hàm cập nhật lại số lượng tồn kho
  const updateProductQuantity = async (productId: number, quantity: number) => {
    try {
      await privateAxios.patch(
        `products/quantity/${productId}`,
        {
          quantity: quantity,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Hàm cập nhật lại số lượng đã bán
  const updateProductQuantitySole = async (
    productId: number,
    quantitySole: number
  ) => {
    try {
      await privateAxios.patch(
        `products/quantitySole/${productId}`,
        {
          quantitySole: quantitySole,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //modal

  const handleCheck = () => {
    getCart();
  };

  // chuyen doi tien te
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    getCart();
  }, [!flag]);
  return (
    <div>
      <div className="header11">
        <nav className="header__navbar hide-on-mobile-tablet">
          <ul className="header__nav-list" style={{ marginTop: 15 }}>
            <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
              <NavLink
                to={"/danhsachsanpham"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  listStyle: "none",
                }}
              >
                Kênh Người Bán
              </NavLink>
            </li>
            <li
              className="header__nav-item header__nav-item--hover header__nav-item--separate header__show-qr"
              style={{
                textDecoration: "none",
                color: "white",
                listStyle: "none",
              }}
            >
              Tải ứng dụng
            </li>
            <li
              className="header__nav-item"
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Kết nối
              <a
                href="#"
                className="header__nav-icon-link"
                style={{ color: "white" }}
              >
                <i className="header__nav-icon fab fa-facebook" />
              </a>
              <a
                href="#"
                className="header__nav-icon-link"
                style={{ color: "white" }}
              >
                <i className="header__nav-icon fab fa-instagram" />
              </a>
            </li>
          </ul>
          <ul className="header__nav-list" style={{ marginTop: 15 }}>
            <li className="header__nav-item header__show-note">
              <a
                href="#"
                className="header__nav-item-link"
                style={{ color: "white" }}
              >
                <i className="header__nav-icon far fa-bell" />
                Thông báo
              </a>
            </li>
            <li className="header__nav-item">
              <a
                href="#"
                className="header__nav-item-link"
                style={{ color: "white" }}
              >
                <i className="header__nav-icon far fa-question-circle" />
                Hỗ trợ
              </a>
            </li>
            <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
              <a
                href="#"
                className="header__nav-item-link"
                style={{ color: "white" }}
              >
                <i className="header__nav-icon fa-solid fa-globe"></i>
                Tiếng việt
              </a>
            </li>
            <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
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
                            gap: "10px",
                          }}
                          className="btn__logout"
                        >
                          <button style={{ fontSize: "1rem" }}>
                            Hồ sơ shop
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
                            gap: "10px",
                          }}
                          className="btn__logout"
                        >
                          <button style={{ fontSize: "1rem" }}>Đơn mua</button>
                        </NavLink>
                      ),
                    },
                    {
                      key: "3",
                      label: (
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "1rem",
                          }}
                          onClick={handleButton}
                        >
                          Đăng xuất
                        </button>
                      ),
                    },
                  ],
                }}
                placement="bottom"
                arrow
              >
                <Button className="avatar__order111">
                  {" "}
                  <Avatar
                    src={flagUser.avatarUrl}
                    className="avatarrr"
                    size={25}
                  >
                    ĐN
                  </Avatar>
                  <span style={{ paddingLeft: "5px" }}>
                    {flagUser.userName}
                  </span>
                </Button>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </div>
      <div className="avatar__cart">
        <NavLink to={"/"} style={{ cursor: "pointer" }}>
          <img src={shoppeLogo} alt="" style={{ width: 120 }} />
        </NavLink>
        <div className="avatar__cart1">Giỏ Hàng</div>
      </div>
      <div className="cart__ship">
        <div className="ship__cart">
          <img src={ship} alt="" style={{ width: 32 }} />
          <p>
            Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
            bạn nhé!
          </p>
        </div>
        <div className="th_table">
          <div className="th_table1">Sản Phẩm</div>
          <div className="th_table2">Đơn Giá</div>
          <div className="th_table3">Số Lượng</div>
          <div className="th_table4">Số Tiền</div>
          <div className="th_table5">Thao Tác</div>
        </div>
        {/* Các mặt hàng */}
        {carts &&
          carts.map((cart: any) => (
            <div className="th_table111" key={cart.cartId}>
              <div className="th_table1111" style={{ paddingTop: 20 }}>
                <div className="th__table222">
                  <div className="yeuthich"> Yêu thích</div>
                  <div style={{ color: "black", cursor: "pointer" }}>
                    {cart.product.stores[0].storeName}
                  </div>
                  <MessageIcon
                    style={{ color: "#ee4d2d", cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="th__table">
                <div style={{ cursor: "pointer", marginLeft: -10 }}>
                  <input
                    type="checkbox"
                    style={{
                      cursor: "pointer",
                      width: 20,
                      height: 20,
                      backgroundColor: "red",
                    }}
                    value={cart.cartId}
                    onChange={getChooseCart}
                  />
                </div>
                <div className="th_table1">
                  <img
                    src={cart.product.imageProduct}
                    alt=""
                    style={{ width: 100 }}
                  />
                  <p>{cart.product.productName}</p>
                </div>
                <div
                  className="th_table2"
                  style={{ color: "black", fontSize: 20 }}
                >
                  {formatCurrency(cart.product.price)}
                </div>
                <div className="th_table3">
                  <div className="buttons_added">
                    <button
                      className="minus is-form"
                      onClick={() => decreaseQuantity(cart.product.productId)}
                      style={{ cursor: "pointer" }}
                    >
                      -
                    </button>
                    <input
                      aria-label="quantity"
                      className="input-qty"
                      min={1}
                      value={cart.quantityCart}
                      readOnly
                    />
                    <button
                      className="plus is-form"
                      onClick={() => increaseQuantity(cart.product.productId)}
                      style={{ cursor: "pointer" }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className="th_table4"
                  style={{ color: "#ee4d2d", fontSize: 20 }}
                >
                  {formatCurrency(cart.product.price * cart.quantityCart)}
                </div>
                <div className="th_table6">
                  <ModalAntd
                    data={cart.cartId}
                    check={() => {
                      handleCheck();
                    }}
                  />
                </div>
              </div>
              <div className="voucher">
                <BrandingWatermarkOutlinedIcon
                  style={{ color: "#ee4d2d", cursor: "pointer" }}
                />
                <div style={{ cursor: "pointer" }}>
                  Shop Voucher giảm đến ₫20k
                </div>
                <p style={{ color: "#05a", cursor: "pointer" }}>
                  Xem thêm voucher
                </p>
              </div>
              <div className="voucher1">
                <img src={ship} alt="" style={{ width: 30 }} />
                <div style={{ cursor: "pointer" }}>
                  Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm
                  ₫25.000 phí vận chuyển đơn tối thiểu ₫99.000
                </div>
                <p style={{ color: "#05a", cursor: "pointer" }}>
                  Tìm hiểu thêm
                </p>
              </div>
            </div>
          ))}
        {/* End */}

        <div className="thanhtoan">
          <div className="muahang1"></div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className="sum">
              Tổng thanh toán: <span>{formatCurrency(calculateTotal())}</span>
            </div>
            <div className="muahang">
              <>
                <button onClick={showModal}>
                  Thanh toán({newCarts?.length})
                </button>
                <Modal
                  title="Thông tin nhận hàng"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={""}
                >
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="label">Tên người nhận</td>
                        <td className="label1">
                          <input
                            type="text"
                            onChange={(e) => setNameOrder(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Số điện thoại</td>
                        <td className="label1">
                          <input
                            type="text"
                            onChange={(e) => setPhoneOrder(e.target.value)}
                          />
                          <p
                            id="userName-error"
                            style={{
                              paddingLeft: 150,
                              color: "red",
                              fontSize: "10px",
                            }}
                          >
                            {errorInput.errPhone}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Địa chỉ</td>
                        <td className="label1">
                          <input
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="label"></td>
                        <td
                          className="label1"
                          style={{
                            fontSize: 20,
                            marginLeft: "150px",
                            width: "100px",
                          }}
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tổng
                          thanh toán:{" "}
                          <span
                            style={{
                              color: "rgb(238,77,45)",
                            }}
                          >
                            {formatCurrency(calculateTotal())}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="label"></td>
                        <td className="label1">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <button
                            onClick={handlePay}
                            style={{ cursor: "pointer" }}
                          >
                            Thanh Toán
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Modal>
              </>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
