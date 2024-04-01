import { useEffect, useState } from "react";
import { notification, Pagination } from "antd";
import { Button, Modal } from "antd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import ModalAdminCate from "../../components/modal/ModalAdminCate";
import privateAxios from "../configAxios/privateAxios";
interface Category {
  categoryId: number;
  categoryName: string;
  image: string;
}
export default function CategoryAdmin() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  // them anh
  const [categoryName, setCategoryName] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [selectCategory, setSelectCategory] = useState<Category>(
    {} as Category
  );
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [imageCategoryUrl, setImageCategoryUrl] = useState<string>("");
  const [flag, setFlag] = useState<number>(1);

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (category: any) => {
    if (category == 1) {
      setFlag(1);
    } else {
      setFlag(2);
    }
    setSelectCategory(category);
    setIsModalOpen(true);
    setCategoryId(category.categoryId);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // het modal
  const handleImageChange = async (event: any) => {
    const files = event.target.files;
    setImages(files);
  };
  console.log(images)
  const getUrl = async () => {
    console.log("ddddddddđ");
    const formDataMain = new FormData();
    formDataMain.append("file", images[0]);
    formDataMain.append("upload_preset", "shopee");
    const response1 = await axios.post(
      "https://api.cloudinary.com/v1_1/dqirycujn/image/upload",
      formDataMain
    );
    console.log(response1);
    setImageCategoryUrl(response1.data.secure_url);
  };
  console.log(imageCategoryUrl)
  // them cate
  const handlePost = async () => {
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
        setImageCategoryUrl(response1.data.secure_url);
        if (categoryName == "" || imageCategoryUrl == "") {
          notification.error({
            message: "Vui lý điền đầy đủ thông tin chủng loại",
            placement: "top",
            duration: 2,
          });
          return;
        }
        await privateAxios.post("categories", {
          categoryName,
          image: imageCategoryUrl,
        });

        notification.success({
          message: "Thêm sản chủng loại mới thành công!",
          placement: "top",
          duration: 2,
        });
        const formDataDetails = new FormData();
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
    }
    setImages([]);
    setCategoryName("");
    setIsModalOpen(false);
  };

  // het them anh
  const getAllCategories = async () => {
    privateAxios
      .get("categories")
      .then((res: any) => setCategories(res.data))
      .catch((err: any) => console.log(err));
  };

  // xoa category
  const handleCheck = () => {
    getAllCategories();
  };

  // sua category
  const handleEdit = async () => {
    const imageUrls: string[] = [];
    try {
      if (imageCategoryUrl) {
        await privateAxios.patch(
          `categories/${categoryId}`,
          {
            categoryName: categoryName || selectCategory.categoryName,
            image: imageCategoryUrl,
          }
        );
      } else {
        await privateAxios.patch(
          `categories/${categoryId}`,
          {
            categoryName: categoryName || selectCategory.categoryName,
            image: selectCategory.image,
          }
        );
      }
      notification.success({
        message: "Cập nhật thành công!",
        placement: "top",
        duration: 2,
      });
      setImages([]);
      setCategoryName("");
      setIsModalOpen(false);
      getAllCategories();
    } catch (error) {
      console.error(error);
    }
  };

  // Phân trang
  const shopsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    console.log(page);
    setCurrentPage(page);
  };
  const startShopIndex = (currentPage - 1) * shopsPerPage;
  const visibleShops = categories.slice(
    startShopIndex,
    startShopIndex + shopsPerPage
  );
  // het phan trang

  useEffect(() => {
    getAllCategories();
    getUrl();
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="main_admin">
          <div className="userAdmin111">
            <div className="search_admin">
              <input type="text" />
              <button>
                <SearchIcon />
              </button>
            </div>
            <div style={{ alignItems: "center", display: "flex" }}>
              <div style={{ fontSize: 25 }}>{categories?.length}</div>{" "}
              <StorefrontIcon style={{ fontSize: 30, color: "red" }} />
            </div>
          </div>
          <Button
            type="primary"
            style={{
              marginLeft: "20px",
              width: "200px",
              height: "40px",
              fontSize: "18px",
            }}
            onClick={() => showModal(1)}
          >
            Thêm loại mặt hàng
          </Button>
          <div className="div_table">
            <table className="table_users">
              <tbody>
                <tr className="tr_user1">
                  <th>Stt</th>
                  <th>Loại mặt hàng</th>
                  <th>Ảnh</th>
                  <th>Hành động</th>
                </tr>
                {visibleShops.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.categoryName}</td>
                    <td>
                      <img
                        src={category.image}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="primary"
                          onClick={() => showModal(category)}
                        >
                          <CreateOutlinedIcon className="icon111" />
                        </Button>
                        <ModalAdminCate
                          data={category.categoryId}
                          check={() => {
                            handleCheck();
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        title="Thêm chủng loại"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={""}
      >
        <table className="table">
          <tbody>
            <tr>
              <td className="label">Hình ảnh chủng loại</td>
              <td className="label1">
                <label
                  htmlFor="chonanh"
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    marginLeft: "70px",
                  }}
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
                    marginLeft: "60px",
                    display: "none",
                  }}
                  multiple
                  onChange={handleImageChange}
                />
              </td>
            </tr>
            <tr>
              <td className="label">Tên chủng loại</td>
              <td className="label1">
                <input
                  type="text"
                  id="chonanh"
                  placeholder="Nhập vào"
                  value={categoryName || selectCategory.categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="label"></td>
              <td className="label1">
                {flag == 2 ? (
                  <>
                    <button
                      style={{ marginLeft: "200px" }}
                      onClick={handleEdit}
                    >
                      Cập nhật
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ marginLeft: "200px" }}
                      onClick={handlePost}
                    >
                      Lưu
                    </button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
      <Pagination
        current={currentPage}
        pageSize={shopsPerPage}
        total={categories?.length}
        onChange={handlePageChange}
        style={{ marginLeft: "50%", marginTop: "-180px" }}
      />
    </div>
  );
}
