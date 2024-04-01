import { Avatar, Pagination, notification } from "antd";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import avatar from "../../assets/avatarBlack.jpg";
import product from "../../assets/buy/12.jpg";
import "./Admin.css";
// import privateAxios from "../configAxios/privateAxios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import privateAxios from "../configAxios/privateAxios";

interface Product {
  avatarUrl: string;
  storeName: string;
  imageProduct: string;
  productId: string;
  storeId: string;
  userId: string;
  productName: string;
  statusProduct: number;
  role: number;
}

export default function ProductsAdmin() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const flaguserJSON = localStorage.getItem("user");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (flaguser?.role != 1) {
      navigate("/");
    }
  }, [flaguser]);

  // Phân trang
  const shopsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startShopIndex = (currentPage - 1) * shopsPerPage;
  const visibleShops = products.slice(
    startShopIndex,
    startShopIndex + shopsPerPage
  );

  // Lấy tất cả sản phẩm
  const getProducts = async () => {
    privateAxios
      .get(`products/admin/findAll`)
      .then((res: any) => setProducts(res.data))
      .catch((err: any) => console.log(err));
  };
  console.log(products);
  // Ẩn sản phẩm
  const handleLock = async (productId: string, storeId: string) => {
    try {
      let response = await privateAxios.patch(`products/admin/statusProduct`, {
        statusProduct: 2,
        productId: productId,
        storeId: storeId,
      });
      notification.success({
        message: "Đã ẩn sản phẩm thành công!",
        placement: "top",
        duration: 2,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Mở Ẩn sản phẩm
  const handleUnLock = async (productId: string, storeId: string) => {
    try {
      let response = await axios.patch(
        `http://localhost:8080/api/v1/products/admin/statusProduct`,
        {
          statusProduct: 1,
          productId: productId,
          storeId: storeId,
        }
      );

      notification.success({
        message: "Đã mở sản phẩm thành công!",
        placement: "top",
        duration: 2,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Search sản phẩm
  const handleSearch = async () => {
    try {
      let products = await axios.get(
        `http://localhost:8080/api/v1/products/search?key=${search}`
      );
      setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="container_right1">
          <div className="userAdmin111">
            <div className="search_admin">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>
                <SearchIcon />
              </button>
            </div>
            <div style={{ alignItems: "center", display: "flex" }}>
              <div style={{ fontSize: 25 }}>{products?.length}</div>{" "}
              <ListAltIcon style={{ fontSize: 30, color: "red" }} />
            </div>
          </div>

          <div className="order_table">
            <div className="name_order3">Sản phẩm</div>
            <div className="sum_order1">Tên sản phẩm</div>
            <div className="active_order1">Trạng thái</div>
            <div className="active_order10">Hành động</div>
          </div>
          {visibleShops.map((product: any) => (
            <div className="order_table1" key={product.productId}>
              <div className="order_name">
                <p style={{ color: "red", fontSize: 17 }}>Tên shop</p>
                <p style={{ color: "black", cursor: "pointer" }}>
                  {product.stores[0].storeName}
                </p>
              </div>

              <div className="order_table2 products_table2">
                <div
                  className="name_order3"
                  style={{ width: "10px", height: "10px" }}
                >
                  <img
                    src={product.imageProduct}
                    alt="123"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginTop: "-50px",
                    }}
                  />
                </div>
                <div className="sum_order1">{product.productName}</div>
                {product.statusProduct === 1 ? (
                  <>
                    <div className="active_order1">
                      <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                        Đang hoạt động
                      </p>
                    </div>
                    <div className="active_order10 active_order11">
                      <p
                        onClick={() =>
                          handleLock(
                            product.productId,
                            product.stores[0].storeId
                          )
                        }
                      >
                        <LockOpenOutlinedIcon />
                      </p>
                    </div>
                  </>
                ) : product.statusProduct === 0 ? (
                  <>
                    <div className="active_order1">
                      <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                        Ngừng hoạt động
                      </p>
                    </div>
                    <div className="active_order10 active_order11">
                      <p style={{ color: "gray" }}>Ẩn bởi Shop</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="active_order1">
                      <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                        Ngừng hoạt động
                      </p>
                    </div>
                    <div className="active_order10 active_order11">
                      <p
                        onClick={() =>
                          handleUnLock(
                            product.productId,
                            product.stores[0].storeId
                          )
                        }
                      >
                        <LockOutlinedIcon />
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <Pagination
            current={currentPage}
            pageSize={shopsPerPage}
            total={products?.length}
            onChange={handlePageChange}
            style={{ paddingBottom: 50, paddingTop: 20, marginLeft: "35%" }}
          />
        </div>
      </div>
    </div>
  );
}
