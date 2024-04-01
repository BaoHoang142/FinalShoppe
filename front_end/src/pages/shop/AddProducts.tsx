import HeaderOrder from "./HeaderOrder";
import "./ShopProducts.css";
import { notification } from "antd";
import ShopUser from "./ShopUser";
import { useEffect, useState } from "react";
import axios from "axios";

type category = {
  categoryId: number;
  categoryName: string;
};
export default function AddProducts() {
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const [productName, setNameProduct] = useState("");
  const [categoryId, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stores, setStores] = useState<any>({});

  // // Lấy dữ liệu user lưu trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // // Lấy dữ liệu bảng categories
  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/categories"
      );
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(category);
  useEffect(() => {
    getCategory();
  }, []);

  // Lấy dữ liệu bảng stores về

  const handleImageChange = async (event: any) => {
    const files = event.target.files;
    setImages(files);
  };

  // Thêm dữ liệu vào bảng product
  const handlePost = async () => {
    let storeId: string = flagUser.userId;
    try {
      if (images && images.length > 0) {
        const imageUrls: string[] = [];
        const formDataMain = new FormData(); // Tạo instance mới của FormData

        // Thêm vào bảng products
        formDataMain.append("file", images[0]);
        formDataMain.append("upload_preset", "shopee");
        const response1 = await axios.post(
          "https://api.cloudinary.com/v1_1/dqirycujn/image/upload",
          formDataMain
        );
        const imageProductUrl = response1.data.secure_url;
        if (
          productName == "" ||
          categoryId == "" ||
          description == "" ||
          price == "" ||
          quantity == "" ||
          imageProductUrl == ""
        ) {
          notification.error({
            message: "Vui lý điền đầy đủ thông tin sản phẩm",
            placement: "top",
            duration: 2,
          });
        }
        const productResponse = await axios.post(
          "http://localhost:8080/api/v1/products",
          {
            productName,
            categoryId,
            description,
            price,
            quantity,
            storeId,
            imageProduct: imageProductUrl,
          }
        );
        console.log(productResponse);

        notification.success({
          message: "Thêm sản phẩm mới thành công!",
          placement: "top",
          duration: 2,
        });
        setImages([]);
        setDescription("");
        setNameProduct("");
        setQuantity("");
        setPrice("");
        setCategories("");
        // const productId1 = productResponse.data.product.productId;
        const formDataDetails = new FormData();
        // Thêm vào bảng images
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
              productId: productResponse.data.productId,
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <HeaderOrder />
      <div className="container_shop">
        <ShopUser />
        <div className="container_right2">
          <h3>Thông tin cơ bản</h3>
          <div className="add_products">
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Hình ảnh sản phẩm</td>
                  <td className="label1">
                    <label
                      htmlFor="chonanh"
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    >
                      {" "}
                      Click để chọn ảnh
                    </label>
                    <input
                      id="chonanh"
                      type="file"
                      style={{
                        border: "none",
                        paddingTop: 10,
                        marginLeft: "-10px",
                        display: "none",
                      }}
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
                      style={{ marginLeft: "0px" }}
                      value={productName}
                      onChange={(e) => setNameProduct(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Ngành hàng</td>
                  <td className="label1">
                    <select
                      className="label3"
                      style={{ marginLeft: "0px" }}
                      value={categoryId}
                      onChange={(e) => setCategories(e.target.value)}
                    >
                      <option value="">Chọn ngành hàng</option>
                      {category &&
                        category.map((categoryItem: category) => (
                          <option
                            value={categoryItem.categoryId}
                            key={categoryItem.categoryId}
                          >
                            {categoryItem.categoryName}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="label">Mô tả sản phẩm</td>
                  <td className="label1">
                    <textarea
                      className="textarea"
                      placeholder="Nhập mô tả"
                      name=""
                      id=""
                      cols={53}
                      rows={8}
                      style={{ resize: "none" }}
                      value={description}
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
                      style={{ marginLeft: "0px" }}
                      value={quantity}
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
                      style={{ marginLeft: "0px" }}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button style={{ cursor: "pointer" }} onClick={handlePost}>
                      Lưu & hiển thị
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
