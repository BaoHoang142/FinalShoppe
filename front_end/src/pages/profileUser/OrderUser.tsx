import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ProfileUser.css";
import { Avatar, Rate, notification } from "antd";
import sweater from "../../assets/buy/vn-11134207-7r98o-lm7a3o35j8inca_tn.jpg";
import { useEffect, useState } from "react";
import avatarBlack from "../../assets/avatarBlack.jpg";
import axios from "axios";
import { Button, Modal } from "antd";
import formatDate from "../../config/formDate";

interface Product {
  address: string;
  avatarURL: string;
  createdDate: string;
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
  storeName: string;
  price: number;
  priceOrder: number;
}
interface Review {
  content: string;
  rate: number;
  productId: number;
  userId: number;
}
export default function OrderUser() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [groupOrders, setGroupOrders] = useState<any>([]);
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  // binh luan
  const [review, setReview] = useState<Review>({} as Review);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(5);
  const [idProduct, setIdProduct] = useState<any>("");
  // Modal
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
  // het modal

  // Lấy tất cả những đơn hàng đã mua
  const getOrder = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/order-details/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(groupOrders);
  useEffect(() => {
    getOrder();
  }, []);

  //xác nhận đơn hàng hoàn thành
  const handleChangeStatus = async (id: any) => {
    let statusOrder: number = 3;
    try {
      let response = await axios.patch(
        `http://localhost:8080/api/v1/orders/${id}`,
        {
          statusOrder,
        }
      );

      notification.success({
        message: "Xác nhận đơn hàng đã giao!",
        placement: "top",
        duration: 2,
      });
      getOrder();
    } catch (error) {
      console.log();
    }
  };
  // xác nhận đơn hàng đã đánh giá
  const handleChangeReview = async (id: any) => {
    console.log(id);
    let statusOrder: number = 4;
    try {
      let response = await axios.patch(
        `http://localhost:8080/api/v1/orders/${id}`,
        {
          statusOrder,
        }
      );
      getOrder();
    } catch (error) {
      console.log();
    }
  };

  //hủy đơn hàng
  const handleChangeStatusDelete = async (id: any) => {
    console.log(id);
    let statusOrder: number = 0;
    try {
      let response = await axios.patch(
        `http://localhost:8080/api/v1/orders/${id}`,
        {
          statusOrder,
        }
      );

      notification.error({
        message: "Đã hủy đơn hàng!",
        placement: "top",
        duration: 2,
      });
      getOrder();
    } catch (error) {
      console.log();
    }
  };
  // thêm đánh giá sản phẩm
  const handleReview = (e: any) => {
    console.log(e);
    setIsModalOpen(true);
    setIdProduct(e.product.productId);
    handleChangeReview(e.order.orderId);
  };
  // Thêm bình luận
  const postRatingAndComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/reviews",
        {
          rate: rating,
          content: reviewContent,
          userId: flagUser.userId,
          productId: idProduct,
        }
      );
      notification.success({
        message: "Đánh giá thành công!",
        placement: "top",
        duration: 2,
      });
      setRating(5);
      setReviewContent("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // lọc đơn hàng đang chờ
  const handleWaitOrder = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/order-details/waitOrder/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // lọc đơn
  // handleShipOrder
  const handleShipOrder = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/order-details/shipOrder/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // handleSuccessOrder
  const handleSuccessOrder = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/order-details/successOrder/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // handleSuccessReview
  const handleSuccessReview = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/order-details/sucessReview/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // handleWaitReview
  const handleWaitReview = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/order-details/waitReview/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // handleWaitReview
  const handleCancerOrder = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/order-details/cancerOrder/${flagUser.userId}`
      );
      console.log(response);
      setGroupOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <>
      <Header></Header>
      <div className="profileUser">
        <div className="profileUser__main">
          <div className="profileUser__main--left">
            <div className="profileUser__main--left--avatar">
              <div className="profileUser__main--left--avatar--img">
                <img
                  src={flagUser.avatarUrl}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  alt=""
                />
              </div>
              <div className="profileUser__main--left--avatar--name">
                <p style={{ marginTop: "5px", fontWeight: "700" }}>
                  {flagUser.userName}
                </p>
                <p style={{ opacity: "0.6" }}>
                  {" "}
                  <i className="fa-solid fa-pen"></i>Sửa hồ sơ
                </p>
              </div>
            </div>
            <div className="profileUser__main--left--navbar">
              <div className="profileUser__main--left--navbar--sale">
                <div className="profileUser__main--left--navbar--sale--img"></div>
                <div className="profileUser__main--left--navbar--sale--text">
                  <p>
                  25.3 Lương về Sale thôi <br /> 
                  </p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--user">
                <div className="profileUser__main--left--navbar--user--img"></div>
                <div className="profileUser__main--left--navbar--user--text">
                  <p>Tài Khoản Của Tôi</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--order">
                <div className="profileUser__main--left--navbar--order--img"></div>
                <div className="profileUser__main--left--navbar--order--text">
                  <p>Đơn Mua</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--alert">
                <div className="profileUser__main--left--navbar--alert--img"></div>
                <div className="profileUser__main--left--navbar--alert--text">
                  <p>Thông Báo</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--voucher">
                <div className="profileUser__main--left--navbar--voucher--img"></div>
                <div className="profileUser__main--left--navbar--voucher--text">
                  <p>Kho Vouver</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--coin">
                <div className="profileUser__main--left--navbar--coin--img"></div>
                <div className="profileUser__main--left--navbar--coin--text">
                  <p>Shoppe Xu</p>
                </div>
              </div>
            </div>
          </div>
          <div className="profileUser__main--right">
            <div className="profileUser__main--right--body">
              <div className="profileUser__main--right--body--order">
                <div className="profileUser__main--right--body--order--header">
                  <div
                    className="profileUser__main--right--body--order--header--navbar"
                    onClick={getOrder}
                  >
                    <span>Tất cả</span>
                  </div>
                  <div
                    className="profileUser__main--right--body--order--header--navbar"
                    onClick={handleWaitOrder}
                  >
                    <span>Chờ xác nhận</span>
                  </div>
                  <div
                    className="profileUser__main--right--body--order--header--navbar"
                    onClick={handleShipOrder}
                  >
                    <span>Đang giao</span>
                  </div>
                  <div
                    className="profileUser__main--right--body--order--header--navbar"
                    onClick={handleSuccessOrder}
                  >
                    <span>Hoàn thành</span>
                  </div>
                  <div
                    className="profileUser__main--right--body--order--header--navbar"
                    onClick={handleSuccessReview}
                  >
                    <span>Đã đánh giá</span>
                  </div>
                  {/* <div
                    className="profileUser__main--right--body--order--header--navbar"
                    onClick={handleWaitReview}
                  >
                    <span>Chưa đánh giá</span>
                  </div> */}
                  <div
                    className="profileUser__main--right--body--order--header--navbar"
                    onClick={handleCancerOrder}
                  >
                    <span>Đã hủy</span>
                  </div>
                </div>
                <div className="profileUser__main--right--body--order--body">
                  {groupOrders.length == 0 ? (
                    <>
                      <div style={{ textAlign: "center", fontSize: 20 }}>
                        Chưa có đơn nào
                      </div>
                    </>
                  ) : (
                    <>
                      {groupOrders.map((order: any) => (
                        <div
                          className="profileUser__main--right--body--order--body--item"
                          key={order.orderDetailId}
                        >
                          <div className="profileUser__main--right--body--order--body--item--infor">
                            <div className="profileUser__main--right--body--order--body--item--infor--inner">
                              <section>
                                <div className="profileUser__main--right--body--order--body--item--infor--inner--header">
                                  <div className="profileUser__main--right--body--order--body--item--infor--inner--header--left">
                                    <div className="profileUser__main--right--body--order--body--item--infor--inner--header--left--favorite">
                                      <span>Yêu thích</span>
                                    </div>
                                    <div className="profileUser__main--right--body--order--body--item--infor--inner--header--left--nameShop">
                                      {order.order.store.storeName}
                                    </div>
                                    <div className="profileUser__main--right--body--order--body--item--infor--inner--header--left--chat">
                                      <button className="profileUser__main--right--body--order--body--item--infor--inner--header--left--chat--button">
                                        <i
                                          className="fa-regular fa-message"
                                          style={{
                                            fill: "white",
                                            verticalAlign: "middle",
                                            fontSize: "10px",
                                          }}
                                        ></i>
                                        <span style={{ marginLeft: "5px" }}>
                                          Thời gian mua:
                                          {formatDate(order.order.creatAt)}
                                        </span>
                                      </button>
                                    </div>
                                    <div className="profileUser__main--right--body--order--body--item--infor--inner--header--left--showShop">
                                      <div className="profileUser__main--right--body--order--body--item--infor--inner--header--left--showShop--button">
                                        <i
                                          className="fa-solid fa-store"
                                          style={{
                                            fill: "white",
                                            verticalAlign: "middle",
                                            fontSize: "10px",
                                          }}
                                        ></i>
                                        <span style={{ marginLeft: "5px" }}>
                                          Xem Shop
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="profileUser__main--right--body--order--body--item--infor--inner--header--right">
                                    {order.order.statusOrder === 1 ? (
                                      <>
                                        <div className="LY5oll">
                                          <a href="" className="lXbYsi">
                                            <span className="O2yAdQ">
                                              <i className="fa-solid fa-truck "></i>
                                              Chờ xác nhận từ shop
                                            </span>
                                          </a>
                                          <div className="shopee-drawer">
                                            <i
                                              className="fa-regular fa-circle-question"
                                              style={{
                                                fontSize: "15px",
                                                verticalAlign: "middle",
                                              }}
                                            ></i>
                                          </div>
                                        </div>
                                        <div
                                          className="bv3eJE"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleChangeStatusDelete(
                                              order.order.orderId
                                            )
                                          }
                                        >
                                          Hủy đơn
                                        </div>
                                      </>
                                    ) : order.order.statusOrder === 2 ? (
                                      <>
                                        <div className="LY5oll">
                                          <a href="" className="lXbYsi">
                                            <span className="O2yAdQ">
                                              <i className="fa-solid fa-truck "></i>
                                              Đang giao hàng
                                            </span>
                                          </a>
                                          <div className="shopee-drawer">
                                            <i
                                              className="fa-regular fa-circle-question"
                                              style={{
                                                fontSize: "15px",
                                                verticalAlign: "middle",
                                              }}
                                            ></i>
                                          </div>
                                        </div>
                                        <div
                                          className="bv3eJE"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleChangeStatus(
                                              order.order.orderId
                                            )
                                          }
                                        >
                                          Đã nhận hàng
                                        </div>
                                      </>
                                    ) : order.order.statusOrder === 3 ? (
                                      <>
                                        <div className="LY5oll">
                                          <a href="" className="lXbYsi">
                                            <span className="O2yAdQ">
                                              <i className="fa-solid fa-truck "></i>
                                              Đơn hàng đã giao thành công
                                            </span>
                                          </a>
                                          <div className="shopee-drawer">
                                            <i
                                              className="fa-regular fa-circle-question"
                                              style={{
                                                fontSize: "15px",
                                                verticalAlign: "middle",
                                              }}
                                            ></i>
                                          </div>
                                        </div>
                                        <div
                                          className="bv3eJE"
                                          style={{ cursor: "pointer" }}
                                          onClick={() => handleReview(order)}
                                        >
                                          Đánh giá ngay
                                        </div>
                                      </>
                                    ) : order.order.statusOrder === 0 ? (
                                      <>
                                        <div className="LY5oll">
                                          <a href="" className="lXbYsi">
                                            <span className="O2yAdQ">
                                              <i className="fa-solid fa-truck "></i>
                                              Bạn đã hủy đơn hàng
                                            </span>
                                          </a>
                                          <div className="shopee-drawer">
                                            <i
                                              className="fa-regular fa-circle-question"
                                              style={{
                                                fontSize: "15px",
                                                verticalAlign: "middle",
                                              }}
                                            ></i>
                                          </div>
                                        </div>
                                        <div className="bv3eJE">Đã hủy</div>
                                      </>
                                    ) : order.order.statusOrder === 4 ? (
                                      <>
                                        <div className="LY5oll">
                                          <a href="" className="lXbYsi">
                                            <span className="O2yAdQ">
                                              <i className="fa-solid fa-truck "></i>
                                              Đơn hàng đã giao thành công
                                            </span>
                                          </a>
                                          <div className="shopee-drawer">
                                            <i
                                              className="fa-regular fa-circle-question"
                                              style={{
                                                fontSize: "15px",
                                                verticalAlign: "middle",
                                              }}
                                            ></i>
                                          </div>
                                        </div>
                                        <div className="bv3eJE">
                                          Đã đánh giá
                                        </div>
                                      </>
                                    ) : (
                                      order.order.statusOrder
                                    )}
                                  </div>
                                </div>
                              </section>

                              <section>
                                <a href="">
                                  <div>
                                    <div className="bdAfgU">
                                      <div className="FNHV0p">
                                        <div>
                                          <section>
                                            <div className="mZ1OWk">
                                              <div className="dJaa92">
                                                <img
                                                  src={
                                                    order.product.imageProduct
                                                  }
                                                  alt=""
                                                  className="gQuHsZ"
                                                />
                                                <div className="nmdHRf">
                                                  <div>
                                                    <div className="zWrp4w">
                                                      <span className="DWVWOJ">
                                                        {
                                                          order.product
                                                            .productName
                                                        }
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div></div>
                                                </div>
                                              </div>
                                              <div className="ylYzwa"></div>
                                            </div>
                                          </section>
                                        </div>
                                        <div className="PB3XKx"></div>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </section>

                              <section>
                                <div className="LwXnUQ">
                                  <div className="NWUSQP">
                                    <span className="R_ufN9">
                                      <div className="afBScK">
                                        <i
                                          className="fa-solid fa-shield"
                                          style={{
                                            width: "20px",
                                            height: "17px",
                                            fill: "none",
                                            color: "#EF5E41",
                                          }}
                                        ></i>
                                      </div>
                                    </span>
                                    <label htmlFor="" className="juCcT0">
                                      Thành tiền:
                                    </label>
                                    <div className="t7TQaf">
                                      {formatCurrency(
                                        order.quantityOrder * order.priceOrder
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Thêm đánh giá sản phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={""}
        >
          <div className="ratee">
            <div className="ratee1">
              <p>Đánh giá: </p>{" "}
              <Rate
                allowHalf
                defaultValue={5}
                style={{ color: "#ee4d2d" }}
                onChange={setRating}
              />
            </div>
            <div className="texe">
              <textarea
                name=""
                id=""
                cols={60}
                rows={8}
                style={{ resize: "none" }}
                placeholder="Nhập Bình Luận ..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    postRatingAndComment();
                  }
                }}
              ></textarea>
            </div>
            <button onClick={postRatingAndComment}>Gửi Đánh Giá</button>
          </div>
        </Modal>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>
    </>
  );
}
