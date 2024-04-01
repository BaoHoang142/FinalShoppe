import "./ShopProducts.css";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button, Modal, Pagination, notification } from "antd";
import { useEffect, useState } from "react";
import HeaderOrder from "./HeaderOrder";
import ShopUser from "./ShopUser";
import axios from "axios";
import ModalProdudct from "../../components/modal/ModalProduct";

type Product = {
  productId: string;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  quantitySole: number;
  categoryId: string;
  storeId: string;
  imageProduct: string;
  statusProduct: number;
};

type Category = {
  categoryId: number;
  categoryName: string;
};
export default function ShopProducts() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  // modal
  const showModal = (product: any) => {
    setSelectedProduct(product);
    setProductId(product.productId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // het modal

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [imageProductUrl, setImageProductUrl] = useState<string>("");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  // Lấy category
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categories);
  useEffect(() => {
    getCategories();
  }, []);

  // // Lấy user trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Lấy dữ liệu sản phẩm của 1 cửa hàng
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/store/${flagUser.userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Cập nhật lại thông tin sản phẩm

  const handleImageChange = async (event: any) => {
    const files = event.target.files;
    setImages(files);
  };

  // lay link anh
  const getUrl = async () => {
    const formDataMain = new FormData();
    formDataMain.append("file", images[0]);
    formDataMain.append("upload_preset", "shopee");
    const response1 = await axios.post(
      "https://api.cloudinary.com/v1_1/dqirycujn/image/upload",
      formDataMain
    );
    setImageProductUrl(response1.data.secure_url);
  };
  const handleEdit = async () => {
    const imageUrls: string[] = [];
    try {
      if (imageProductUrl) {
        let response = await axios.patch(
          `http://localhost:8080/api/v1/products/${productId}`,
          {
            productName: productName || selectedProduct.productName,
            categoryId,
            description: description || selectedProduct.description,
            quantity: quantity || selectedProduct.quantity,
            price: price || selectedProduct.price,
            imageProduct: imageProductUrl,
          }
        );
      } else {
        let response = await axios.patch(
          `http://localhost:8080/api/v1/products/${productId}`,
          {
            productName: productName || selectedProduct.productName,
            categoryId,
            description: description || selectedProduct.description,
            quantity: quantity || selectedProduct.quantity,
            price: price || selectedProduct.price,
            imageProduct: selectedProduct.imageProduct,
          }
        );
      }
      const formDataDetails = new FormData();
      for (let i = 0; i < images.length; i++) {
        formDataDetails.delete("file");
        formDataDetails.append("file", images[i]);
        formDataDetails.append("upload_preset", "shopee");
        try {
          const imageUploadResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dqirycujn/image/upload",
            formDataDetails
          );
          const imageUrl = imageUploadResponse.data.secure_url;
          imageUrls.push(imageUrl);
        } catch (error) {
          notification.error({
            message: "Thêm ảnh thất bại",
            placement: "top",
            duration: 2,
          });
        }
      }

      const postPromises = imageUrls.map(async (imageUrl) => {
        try {
          await axios.post("http://localhost:8080/api/v1/images", {
            imageUrl,
          });
        } catch (error) {
          console.log(error);
        }
      });
      try {
        await Promise.all(postPromises);
      } catch (error) {
        console.error(error);
      }
      notification.success({
        message: "Cập nhật thông tin thành công!",
        placement: "top",
        duration: 2,
      });
      setIsModalOpen(false);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  // xoa san pham
  const handleCheck = () => {
    getProducts();
  };
  // Ẩn sản phẩm
  const handleEditStatus = async (id: string) => {
    setIsRotating(true);
    try {
      let response = await axios.patch(
        `http://localhost:8080/api/v1/products/status/${id}`,
        { statusProduct: 0 }
      );
      notification.success({
        message: "Cập nhật trạng thái sản phẩm thành công!",
        placement: "top",
        duration: 2,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  // Mở ẩn sản phẩm
  const handleUnlockStatus = async (id: string) => {
    setIsRotating(true);
    try {
      let response = await axios.patch(
        `http://localhost:8080/api/v1/products/status/${id}`,
        { statusProduct: 1 }
      );

      notification.success({
        message: "Cập nhật trạng thái sản phẩm thành công!",
        placement: "top",
        duration: 2,
      });

      getProducts();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };
  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    getProducts();
    getUrl();
  }, []);
  return (
    <div>
      <HeaderOrder />
      <div className="container_shop">
        <ShopUser />
        <div className="container_right1" style={{ width: "1300px" }}>
          <div className="order_header">
            <h2 style={{ color: "black" }}>{products?.length} Sản phẩm</h2>
            <div className="order_header2">
              <p style={{ color: "rgb(38,115,221)", cursor: "pointer" }}>
                Tối ưu sản phẩm
              </p>
              <p className="order_header5">Công cụ Xử lý hàng loạt</p>
              <div className="icon__shop">
                <ListOutlinedIcon style={{ color: "#ee4d2d" }} />
                <TuneOutlinedIcon />
              </div>
            </div>
          </div>
          <div className="order_table" style={{ width: "100%" }}>
            <div
              className="name_order"
              style={{ width: "140px", marginLeft: "20px" }}
            >
              Tên sản phẩm
            </div>
            <div
              className="sum_order"
              style={{ width: "140px", marginLeft: "370px" }}
            >
              Giá
            </div>
            <div className="status_order" style={{ width: "140px" }}>
              Kho hàng
            </div>
            <div className="active_order" style={{ width: "140px" }}>
              Thao tác
            </div>
          </div>
          <div className="order_table3" style={{ width: "100%" }}>
            {visibleProducts?.map((product: Product, index) => (
              <div key={index}>
                {product.statusProduct == 1 ? (
                  <div className="order_table2" style={{ width: "1171px" }}>
                    <div
                      className="name_order"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        className="name_order1"
                        style={{
                          paddingLeft: 20,
                          width: "300px",
                          height: "130px",
                          marginLeft: "80px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <img
                          src={product.imageProduct}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: "300px",
                            height: "30px",
                            marginTop: "20px",
                          }}
                        >
                          <p
                            style={{
                              width: "300px",
                              height: "30px",
                              marginLeft: "60px",
                            }}
                          >
                            {product.productName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="sum_order">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="status_order">{product.quantity}</div>
                    <div className="active_order" style={{ color: "#2673dd" }}>
                      <Button type="primary" onClick={() => showModal(product)}>
                        <CreateOutlinedIcon className="icon111" />
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => handleEditStatus(product.productId)}
                      >
                        <ChangeCircleIcon
                          className="icon111"
                          style={{
                            border: "none",
                            transform: isRotating ? "rotate(360deg)" : "none",
                            transition: "transform 1s",
                          }}
                        />
                      </Button>
                      {/* <Button
                        type="default"
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => deleteProduct(product.productId)}
                      >
                        <DeleteForeverIcon className="icon111" />
                      </Button> */}
                      <ModalProdudct
                        data={product.productId}
                        checkProduct={() => {
                          handleCheck();
                        }}
                      />
                    </div>
                  </div>
                ) : product.statusProduct == 2 ? (
                  <div
                    className="order_table2 order_table2222"
                    style={{ width: "1171px" }}
                  >
                    <div
                      className="name_order"
                      style={{ width: "500px", backgroundColor: "red" }}
                    >
                      <div
                        className="name_order1"
                        style={{
                          paddingLeft: 20,
                          width: "300px",
                          height: "130px",
                          marginLeft: "80px",
                          display: "flex",
                          gap: "90px",
                          justifyContent: "space-around",
                        }}
                      >
                        <img
                          src={product.imageProduct}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: "300px",
                            height: "30px",
                            marginTop: "20px",
                          }}
                        >
                          <p
                            style={{
                              width: "300px",
                              height: "30px",
                              marginLeft: "60px",
                            }}
                          >
                            {product.productName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="sum_order">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="status_order">
                      {product.quantity - product.quantitySole}
                    </div>
                    <div className="active_order">
                      <LockOutlinedIcon className="icon111" />
                    </div>
                  </div>
                ) : (
                  <div className="order_table2 order_table2222">
                    <div className="name_order">
                      <div
                        className="name_order1"
                        style={{
                          paddingLeft: 20,
                          width: "300px",
                          height: "130px",
                          marginLeft: "80px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <img
                          src={product.imageProduct}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: "300px",
                            height: "30px",
                            marginTop: "20px",
                          }}
                        >
                          <p
                            style={{
                              width: "300px",
                              height: "30px",
                              marginLeft: "60px",
                            }}
                          >
                            {product.productName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="sum_order" style={{ marginLeft: "-50px" }}>
                      {formatCurrency(product.price)}
                    </div>
                    <div
                      className="status_order"
                      style={{ marginLeft: "-120px" }}
                    >
                      {product.quantity}
                    </div>
                    <div
                      className="active_order"
                      style={{ marginLeft: "-50px" }}
                    >
                      <Button
                        type="primary"
                        onClick={() => handleUnlockStatus(product.productId)}
                      >
                        <ChangeCircleIcon
                          className="icon111"
                          style={{
                            border: "none",
                            transform: isRotating ? "rotate(360deg)" : "none",
                            transition: "transform 1s",
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                )}

                <hr />
              </div>
            ))}
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={products.length}
              onChange={handlePageChange}
              style={{ paddingBottom: 50, paddingTop: 20 }}
            />
          </div>{" "}
        </div>
      </div>
      {selectedProduct && (
        <Modal
          title="Cập Nhật Lại Sản Phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="add_products" style={{ paddingLeft: 10 }}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Hình ảnh sản phẩm</td>
                  <td className="label1">
                    <input
                      type="file"
                      style={{ border: "none", paddingTop: 10 }}
                      multiple
                      onChange={handleImageChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Tên sản phẩm</td>
                  <td className="label1">
                    <input
                      type="text"
                      placeholder="Nhập vào"
                      value={productName || selectedProduct.productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Ngành hàng</td>
                  <td className="label1">
                    <select
                      className="label3"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Chọn ngành hàng</option>
                      {categories.map((category: any) => (
                        <option
                          value={category.categoryId}
                          key={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className="label">Mô tả sản phẩm</td>
                  <td className="label1">
                    <textarea
                      value={description || selectedProduct.description}
                      className="textarea"
                      placeholder="Nhập mô tả"
                      name=""
                      id=""
                      cols={53}
                      rows={8}
                      style={{ resize: "none" }}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td className="label">Số lượng</td>
                  <td className="label1">
                    <input
                      type="number"
                      placeholder="Nhập số lượng"
                      value={quantity || selectedProduct.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Giá sản phẩm</td>
                  <td className="label1">
                    <input
                      type="number"
                      placeholder="Nhập giá sản phẩm"
                      value={price || selectedProduct.price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button onClick={handleEdit}>Cập nhật</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
}
