import { Avatar, notification } from "antd";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import MessageIcon from "@mui/icons-material/Message";
import { Modal } from "antd";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import moment from "moment";
import { useEffect, useState } from "react";
import HeaderOrder from "./HeaderOrder";
import "./Order.css";
import ShopUser from "./ShopUser";
import avatar from "../../assets/avatarBlack.jpg";
import product from "../../assets/buy/vn-11134207-7r98o-lm7a3o35j8inca_tn.jpg";
import axios from "axios";

interface Store {
  storeId: number;
}
interface Product {
  addressOrder: string;
  avatarUrl: string;
  createDateOrder: string;
  imageProduct: string;
  nameOrder: string;
  orderId: string;
  phoneOrder: string;
  productId: number;
  quantityOrder: number;
  statusOrder: string;
  storeId: number;
  totalPrice: number;
  userId: number;
  productName: string;
  userName: string;
  price: number;
  priceOrder: number;
}
export default function OrderDetail() {
  const [groupOrders, setGroupOrders] = useState<any>([]);
  const [currentOrder, setCurrentOrder] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id: any) => {
    for (let i = 0; i < groupOrders.length; i++) {
      if (groupOrders[i].orderId === id) {
        const order = groupOrders[i];
        setCurrentOrder(order);
        break;
      }
    }
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Lấy user đang đăng nhập
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Lấy tất cả đơn hàng đã order
  const getOrder = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/orders/stores/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm cập nhật trạng thái
  const handleUpdate = async (id: string) => {
    let statusOrder: number = 2;
    try {
      let response = await axios.patch(
        `http://localhost:8080/api/v1/orders/${id}`,
        {
          statusOrder,
        }
      );

      notification.success({
        message: "Xác nhận đơn hàng thành công!",
        placement: "top",
        duration: 2,
      });
      getOrder();
    } catch (error) {
      console.log();
    }
  };
  console.log(currentOrder);
  useEffect(() => {
    getOrder();
  }, []);
  console.log(groupOrders);
  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div>
      <HeaderOrder />
      <div className="container_shop">
        <ShopUser />
        <div className="container_right1" style={{ width: "1300px" }}>
          <div className="order_header">
            <h2 style={{ color: "black" }}>{groupOrders.length} Đơn hàng</h2>
            <div className="order_header1" style={{ color: "white" }}>
              Giao Hàng Loạt
            </div>
          </div>
          <div className="order_table" style={{ width: "100%" }}>
            <div className="name_order" style={{ marginLeft: "-180px" }}>
              Sản phẩm
            </div>
            <div className="sum_order" style={{ marginLeft: "150px" }}>
              Tổng đơn hàng
            </div>
            <div className="status_order" style={{ marginLeft: "-80px" }}>
              Trạng thái
            </div>
            <div className="active_order" style={{ marginLeft: "-30px" }}>
              Thao tác
            </div>
          </div>
          {groupOrders?.map((order: any) => (
            <div className="order_table1" key={order.orderId}>
              <div
                className="order_name"
                style={{ width: "190px", marginLeft: "20px" }}
              >
                <Avatar
                  src={order.user.avatarUrl}
                  className="avatarrr"
                  style={{ width: "40px", height: "40px", marginLeft: "-30px" }}
                >
                  ĐN
                </Avatar>
                <p style={{ marginLeft: "-20px" }}>{order.user.userName}</p>
                <MessageIcon style={{ color: "red", cursor: "pointer" }} />
              </div>

              <div
                className="order_table2"
                style={{ marginLeft: "20px", width: "1200px" }}
              >
                <div className="name_order">
                  <div className="name_order1">
                    <img
                      src={order.orderDetails[0].product.imageProduct}
                      alt=""
                      style={{ width: "110px", height: "100px" }}
                    />
                    <textarea
                      value={order.orderDetails[0].product.productName}
                      rows={1}
                      cols={35}
                      style={{
                        outline: "none",
                        border: "none",
                        overflow: "hidden",
                        resize: "none",
                        marginTop: "20px",
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="sum_order" style={{ marginLeft: "0px" }}>
                  {formatCurrency(
                    order.orderDetails[0].priceOrder *
                      order.orderDetails[0].quantityOrder
                  )}
                </div>
                <div className="status_order" style={{ marginLeft: "-10px" }}>
                  {order.statusOrder === 1 ? (
                    <button
                      style={{
                        color: "rgb(238,77,45)",
                        cursor: "pointer",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                      }}
                      onClick={() => handleUpdate(order.orderId)}
                    >
                      Xác nhận đơn hàng
                    </button>
                  ) : order.statusOrder === 2 ? (
                    <span style={{ color: "#2673dd" }}>Đang Giao</span>
                  ) : order.statusOrder === 3 || order.statusOrder === 4 ? (
                    <span style={{ color: "#2673dd" }}>Đã Giao</span>
                  ) : order.statusOrder === 0 ? (
                    <span style={{ color: "red" }}>Đã Hủy</span>
                  ) : (
                    order.statusOrder
                  )}
                </div>

                <div
                  className="active_order"
                  style={{
                    color: "#2673dd",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <ManageSearchOutlinedIcon />
                  <p
                    onClick={() => showModal(order.orderId)}
                    style={{ padding: 0 }}
                  >
                    Xem chi tiết
                  </p>
                  <Modal
                    // title=" Tạo Mới Thông Tin Cửa Hàng"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={""}
                  >
                    {currentOrder && (
                      <>
                        <div className="address">
                          <PinDropOutlinedIcon style={{ color: "#ee4d2d" }} />{" "}
                          <p>ĐỊA CHỈ NHẬN HÀNG</p>
                        </div>
                        <table className="table table_table">
                          <tbody>
                            <tr>
                              <td className="label">Ngày tạo đơn: </td>
                              <td className="label1">
                                {moment(currentOrder.createDateOrder).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Tên người nhận: </td>
                              <td className="label1">
                                {currentOrder.nameOrder}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Số điện thoại: </td>
                              <td className="label1">
                                {currentOrder.phoneOrder}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Địa chỉ: </td>
                              <td className="label1">
                                {currentOrder.addressOrder}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                  </Modal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
