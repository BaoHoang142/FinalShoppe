import "./ProductDetails.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { Avatar, notification, Button, Modal } from "antd";
import productDetail from "../../../assets/buy/vn-11134207-7r98o-lm7a3o35j8inca_tn.jpg";
import message from "../../../assets/done/3.png";
import facebook from "../../../assets/done/4.png";
import pinterest from "../../../assets/done/5.png";
import tw from "../../../assets/done/2.png";
import ship from "../../../assets/ship/10.png";
import avatar from "../../../assets/avatar.jpg";
import { Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
interface Store {
  storeId: number;
  storeName: string;
  addressStore: string;
  statusStore: number;
  phone: string;
  emailStore: string;
  userId: number;
  imageStore: string;
}

interface Category {
  categoryId: number;
  categoryName: string;
}
interface User {
  userId: number;
  userName: string;
  fullName: string;
  avatarUrl: string;
  gender: string;
  statusUser: number;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: string;
}

interface Product {
  category: Category;
  productId: number;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
  storeId: number;
  imageUrl: string;
  categoryName: string;
  userId: number;
  statusOrder: string;
  quantitySole: number;
  imageProduct: string;
  store: Store;
}
interface Comment {
  reviewId: number;
  avatarUrl: string;
  content: string;
  createDate: string;
  rate: Number;
  userName: string;
  user: User;
}

interface Cart {
  cartId: number;
  quantityCart: number;
  userId: string;
  products: Product[];
}
export default function ProductDetails() {
  // swipper
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  // chuyen trang
  const navigate = useNavigate();
  // lay dữ liệu trên lcoal
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  //
  const { id } = useParams();
  const [flag, setFlag] = useState<boolean>(true);
  const [products, setProducts] = useState<any>("");
  const [quantityCart, setQuantity] = useState(1);
  const [images, setImages] = useState<Product[]>([]);
  const [category, setCategory] = useState<Partial<Category>>({});
  const [Stores, setStores] = useState<any>({});
  const [storeProduct, setStoreProduct] = useState<any>({});
  const [productsStore, setProductsStore] = useState<Product[]>([]);
  const [UserStore, setUserStore] = useState<Partial<User>>({});
  const [status, setStatus] = useState<Product[]>([]);
  const [commentContent, setCommentContent] = useState<any>("");
  const [rating, setRating] = useState<any>(5);
  const [allcomments, setAllcomments] = useState<Comment[]>([]);
  const [cart, setCart] = useState<any>([]);
  const [addressOrder, setAddress] = useState<string>("");
  const [phoneOrder, setPhoneOrder] = useState<any>("");
  const [nameOrder, setNameOrder] = useState<string>("");
  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    if (!flagUser?.userId) {
      notification.error({
        message: "Vui lý đăng nhập để mua sản phẩm!",
        placement: "top",
        duration: 2,
      });
      return;
    }
    if (flagUser?.userId === storeProduct.storeId) {
      notification.error({
        message: "Không thể mua sản phẩm của chính mình!",
        placement: "top",
        duration: 2,
      });
      return;
    }
    if (storeProduct?.statusStore == 0) {
      notification.error({
        message: "Shop đã bị khóa, không thể mua sản phẩm này!",
        placement: "top",
        duration: 2,
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // het modal
  // lay store theo userId
  const getStores = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/stores/${flagUser?.userId}`
      );
      console.log(response);
      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Lấy chi tiết id của stores so sánh với id đang đăng nhập
  const getProductStores = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/products/storeId/products/${flagUser?.userId}`
      );
      setProductsStore(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // lay chi tiet 1 san pham
  const getProduct = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/products/productDetail/${id}`
      );
      console.log(response);
      setProducts(response.data.data);
      setCategory(response.data.data.category);
      setStores(response.data.data.stores[0]);
      setStoreProduct(response.data.data.stores[0]);
      setImages(response.data.data.images);
      setAllcomments(response.data.review[0].reviews);
    } catch (error) {
      console.log(error);
    }
  };

  // Tăng giảm số lượng
  const decreaseQuantity = () => {
    if (quantityCart > 1) {
      setQuantity(quantityCart - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantityCart < products?.quantity) {
      setQuantity(quantityCart + 1);
    } else {
      notification.error({
        message: "Đã vượt quá số lượng sản phẩm!",
        placement: "top",
        duration: 2,
      });
    }
    // setQuantity(quantityCart + 1);
  };
  // check xem có sản phẩm đã thêm vào giỏ hàng hay chưa
  const getAllCart = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/v1/carts/list/${flagUser?.userId}`
      );
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Thêm sản phẩm vào cart
  let userId = flagUser?.userId;
  let productId = id;
  // lay thong tin cua store
  const handleButton = async () => {
    if (!flagUser?.userId) {
      notification.error({
        message: "Vui lòng đăng nhập để mua sản phẩm!",
        placement: "top",
        duration: 2,
      });
      return;
    }
    if (flagUser?.userId === storeProduct.storeId) {
      notification.error({
        message: "Không thể mua sản phẩm của chính mình!",
        placement: "top",
        duration: 2,
      });
      return;
    }
    if (storeProduct?.statusStore == 0) {
      notification.error({
        message: "Shop đã bị khóa, không thể mua sản phẩm này!",
        placement: "top",
        duration: 2,
      });
      return;
    }

    let response = await axios.post("http://localhost:8080/api/v1/carts", {
      quantityCart,
      userId,
      productId,
    });
    notification.success({
      message: response.data.message,
      placement: "top",
      duration: 2,
    });
  };

  // Hàm tính trung bình rate
  const calculateAverageRating = (ratings: Comment[]) => {
    if (ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce(
      (sum: number, rate: any) => sum + rate.rate,
      0
    );
    const averageRating = totalRating / ratings.length;
    return averageRating;
  };

  const averageRating = calculateAverageRating(allcomments);

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
  // thanh toan ngay
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
    let check = validateInput();
    if (check) {
      try {
        // Tạo order và lấy orderId từ response
        let storeId = products.stores[0].storeId;
        let orderResponse = await axios.post(
          `http://localhost:8080/api/v1/orders`,
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
        // Tạo orderDetail cho từng sản phẩm trong giỏ hàng
        try {
          await axios.post(`http://localhost:8080/api/v1/order-details`, {
            productId: products.productId,
            quantityOrder: quantityCart,
            priceOrder: products.price,
            orderId: orderResponse.data.order.orderId,
          });
        } catch (error) {
          console.log(error);
        }
        // Cập nhật số lượng đã bán
        try {
          const updatedQuantitySole = products.quantitySole + quantityCart;
          await updateProductQuantitySole(
            products.productId,
            updatedQuantitySole
          );
        } catch (error) {
          console.log(error);
        }
        // Cập nhật số lượng sản phẩm
        try {
          const updatedQuantity = products.quantity - quantityCart;
          await updateProductQuantity(products.productId, updatedQuantity);
        } catch (error) {
          console.log(error);
        }
        notification.success({
          message: "Thanh toán thành công!",
          placement: "top",
          duration: 2,
        });
        setIsModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    }

    // navigate("/donmua");
  };
  // Hàm cập nhật lại số lượng tồn kho
  const updateProductQuantity = async (productId: number, quantity: number) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/products/quantity/${productId}`,
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
      await axios.patch(
        `http://localhost:8080/api/v1/products/quantitySole/${productId}`,
        {
          quantitySole: quantitySole,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Tính tổng thanh toán
  const calculateTotal = () => {
    let total: number = products.price * quantityCart;
    return total;
  };
  // su dung useEffect
  useEffect(() => {
    getProduct();
    getStores();
    getProductStores();
    getAllCart();
  }, []);
  console.log(products.quantity);
  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  console.log(products);
  console.log("33333", Stores);
  return (
    <>
      <Header></Header>
      <div className="container_detail">
        <div className="detail_hearder">
          <p>Shopee</p>
          <ChevronRightIcon />
          <p onClick={() => navigate(`/categories/${category.categoryId}`)}>
            {category.categoryName}
          </p>
        </div>
        <div className="detail_main">
          <div className="detail_letf">
            <div className="image_detailPr">
              <Swiper
                style={{
                  background: "white",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {images.map((image: any) => (
                  <SwiperSlide key={image.imageId}>
                    <img src={image.imageUrl} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="image_detailPr1">
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {images.map((image: any) => (
                  <SwiperSlide key={image.imageId}>
                    <img src={image.imageUrl} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <div
                style={{
                  display: "flex",
                  width: "475px",
                  justifyContent: "flex-end",
                  marginLeft: "-50px",
                }}
              >
                {" "}
                {images.map((image: any) => (
                  <img
                    key={image.imageId}
                    src={image.imageUrl}
                    alt=""
                    style={{ width: "75px", objectFit: "cover" }}
                  />
                ))}
              </div> */}
            </div>
            <div className="icon_detail" style={{ marginLeft: "-20px" }}>
              <p>Chia sẻ:</p>
              <img
                src={message}
                alt=""
                style={{ width: "26px", height: "26px" }}
              />
              <img
                src={facebook}
                alt=""
                style={{ width: "22px", height: "22px" }}
              />
              <img src={pinterest} alt="" style={{ width: "42px" }} />
              <img src={tw} alt="" style={{ width: "25px" }} />
              <div className="like_detail">
                <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
                <p>Đã thích (8k)</p>
              </div>
            </div>
          </div>
          <div className="detail_right">
            <div className="content_detail">
              <p>
                {" "}
                <span className="span1">Yêu Thích +</span>{" "}
                <span style={{ fontSize: "1.425rem" }}>
                  {products.productName}
                </span>
              </p>
              <div className="danhgia">
                <div className="danhgia1">
                  <div className="rate">
                    {!averageRating ? (
                      <p>Chưa có đánh giá</p>
                    ) : (
                      <>
                        <Rate
                          allowHalf
                          value={averageRating}
                          style={{ color: "#ee4d2d", marginTop: "5px" }}
                        />
                      </>
                    )}
                  </div>
                  <p>
                    {allcomments.length}{" "}
                    <span style={{ color: "#767676" }}>Đánh Giá</span>
                  </p>
                  <p>
                    {products.quantitySole}{" "}
                    <span style={{ color: "#767676" }}>Đã Bán</span>
                  </p>
                </div>
                <p
                  style={{
                    marginRight: 40,
                    cursor: "pointer",
                    color: "#767676",
                  }}
                >
                  Tố cáo
                </p>
              </div>
              <br />
            </div>
            <div className="price_detail">
              <span>Giá không đổi:</span>
              <span className="price_detail1">
                {" "}
                {formatCurrency(products.price)}
              </span>
              <br />
              <div className="price_detail2">
                <br />
                <p style={{ color: "#ee4d2d", fontSize: ".975rem" }}>
                  Gì Cũng Rẻ
                </p>
                <br />
                <br />
                <p style={{ color: "rgba(0,0,0,.54)", fontSize: ".85rem" }}>
                  Giá tốt nhất so với các sản phẩm cùng loại trên Shopee
                </p>
              </div>
            </div>
            <div className="insurance">
              <p style={{ color: "#757575", cursor: "pointer" }}>Bảo Hiểm</p>
              <p>
                Bảo hiểm Thời trang <span className="span2">Mới</span>
              </p>
              <p style={{ color: "#08f", cursor: "pointer" }}>Tìm hiểu thêm</p>
            </div>
            <div className="ship_detail">
              <div className="detail_ship">Vận Chuyển</div>
              <div>
                <div className="ship_detail2">
                  <div className="ship_detail1">
                    <img
                      src={ship}
                      alt=""
                      style={{ height: "20px", width: "25px" }}
                    />
                    <p> Miễn phí vận chuyển</p>
                  </div>
                  <br />
                  <span className="span3">
                    Miễn phí vận chuyển cho đơn hàng trên ₫99.000
                  </span>
                  <div className="ship_detail1" style={{ marginTop: 10 }}>
                    <img
                      src={ship}
                      alt=""
                      style={{ height: "20px", width: "25px" }}
                    />
                    <br />
                    <p style={{ marginLeft: "-10px" }}>
                      Vận chuyển tới: {flagUser?.address}
                    </p>
                    {/* <p style={{ marginLeft: "20px" }}> {flagUser?.address}</p> */}
                  </div>
                  <br />
                  <span className="span3">Phí vận chuyển: ₫100.000</span>
                </div>
              </div>
            </div>
            <div className="prire__detail">
              <p> Số Lượng</p>
              <div className="buttons_added">
                <button
                  className="minus is-form"
                  style={{ cursor: "pointer" }}
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  aria-label="quantity"
                  className="input-qty"
                  min={1}
                  name=""
                  value={quantityCart}
                  type="number"
                  readOnly
                />
                <button
                  className="plus is-form"
                  style={{ cursor: "pointer" }}
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <p> {products.quantity} sản phẩm sẵn có</p>
            </div>
            <div className="add_detail">
              <div className="btn_add">
                <button onClick={handleButton}>
                  <AddShoppingCartOutlinedIcon style={{ fontSize: 17 }} />{" "}
                  <span>Thêm Vào Giỏ Hàng</span>
                </button>
              </div>

              <div className="btn_buy">
                <button onClick={showModal}>Mua Ngay</button>
              </div>
            </div>
          </div>
        </div>
        <div className="detail__shop">
          <div className="detail__shop1">
            <div className="detail__shop111">
              <div className="shopp_user">
                <p style={{ textTransform: "uppercase" }}>
                  {storeProduct.storeName}
                </p>
                <br />
                <br />
                <br />
                <p style={{ color: "#757575" }}>Online 1 Giờ Trước</p>
              </div>
              <div className="shopp_user1">
                <button>
                  <MessageOutlinedIcon /> Chat Ngay
                </button>
                <button>
                  {" "}
                  <OtherHousesOutlinedIcon />
                  Xem Shop
                </button>
              </div>
            </div>
          </div>
          <div className="detail__shop2">
            <div className="detailshop_right">
              <label>Đánh Giá</label>
              <span>5k</span>
              <label htmlFor="">Tỉ Lệ Phản Hồi</label>
              <span>100%</span>
              <label htmlFor="">Tham Gia</label>
              <span>12 Tháng Trước</span>
            </div>
            <div className="detailshop_right">
              <label>Sản Phẩm</label>
              <span>400</span>
              <label htmlFor="">Thời Gian P.Hồi</label>
              <span>vài giờ</span>
              <label htmlFor="">Người Theo Dõi</label>
              <span>20 Nghìn Người</span>
            </div>
          </div>
        </div>
        <div className="descripttion">
          <div className="mota">MÔ TẢ SẢN PHẨM</div>
          <div className="content_mota" style={{ marginLeft: "15px" }}>
            {products.description}
          </div>
        </div>
        {allcomments.map((comment) => {
          return (
            <div className="binhluan" key={comment.reviewId}>
              <div className="map_comment">
                <div className="img">
                  <Avatar
                    src={comment.user.avatarUrl}
                    className="avatarrr"
                    style={{ fontSize: "60px" }}
                  >
                    ĐN
                  </Avatar>
                </div>
                <div className="thongtin">
                  <div className="thongtin1">
                    <p>{comment.user.userName}</p>
                    <Rate
                      allowHalf
                      defaultValue={Number(comment.rate)}
                      style={{ color: "#ee4d2d" }}
                    />
                    <p style={{ color: "rgba(0,0,0,.54)" }}>
                      {moment(comment.createDate).format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

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
                <td className="label1" style={{ fontSize: 20 }}>
                  Tổng thanh toán:{" "}
                  <span style={{ color: "rgb(238,77,45)" }}>
                    {formatCurrency(calculateTotal())}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="label"></td>
                <td className="label1">
                  <button onClick={handlePay}>Thanh Toán</button>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      </div>
      <Footer></Footer>
    </>
  );
}
