import "./Smart.css";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Card } from "antd";
const { Meta } = Card;
import { Rate } from "antd";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SlideGirlFaShion from "../slide/SlideGirlFashion";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import product from "../../assets/thoitrangnu/1.jpg";
import SlideMenFaShion from "../slide/SlideMenFashion";
import publicAxios from "../configAxios/publicAxios";
interface Product {
  productId: number;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  quantitySole: number;
  statusProduct: number;
  storeId: string;
  imageProduct: string;
  categoryId: number;
  categoryName: string;
  image: string;
}
const MenFashion = () => {
  const [flag, setFlag] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const getProduct = async () => {
    try {
      const res = await publicAxios.get(`products/category/${1}`);
      // lọc sản phẩm bị khóa
      const result = res.data.filter(
        (product: Product) => product.statusProduct == 1
      );
      setProducts(result);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    getProduct();
  }, [!flag]);
  // sap xep theo gia
  const handleUp = () => {
    const newProducts = products;
    newProducts.sort((a, b) => a.price - b.price);
    setProducts([...newProducts]);
  };
  const handleDown = () => {
    const newProducts = products;
    newProducts.sort((a, b) => b.price - a.price);
    setProducts([...newProducts]);
  };
  // san pham ban chay
  const handleProductHot = () => {
    const newProducts = products;
    newProducts.sort((a, b) => b.quantitySole - a.quantitySole);
    setProducts([...newProducts]);
  };

  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="container">
      <Header />
      <SlideMenFaShion />
      <>
        {/* container */}
        <div className="container3">
          <div className="grid wide">
            <div className="row sm-gutter container1">
              <div className="container_left">
                {/* category */}
                <nav className="category">
                  <div className="icon_1">
                    <FilterAltOutlinedIcon style={{ fontSize: 18 }} />
                    <h5 className="category-heading">Bộ lọc tìm kiếm</h5>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Theo Danh Mục</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Quần
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Quần Đùi
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Chân Váy
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Quần jeans
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Đầm/Váy
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Nơi Bán</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hà Nội
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hồ Chí Minh
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Đà Nẵng
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">
                      Đơn Vị Vận Chuyển
                    </div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hoả tốc
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Nhanh
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Tiết kiệm
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Thương Hiệu</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Minh Châu
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        DELIZ
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        EVA
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Khoảng Giá</div>
                    <div className="category-group-filter">
                      <input
                        type="number"
                        placeholder="đ TỪ"
                        className="category-group-filter-input"
                      />
                      <div className="toPrice"></div>
                      <input
                        type="number"
                        placeholder="đ ĐẾN"
                        className="category-group-filter-input"
                      />
                    </div>
                    <button className="btn btn--primary category-group-filter-btn">
                      ÁP DỤNG
                    </button>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Loại Shop</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Shoppee
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Shoppee Mail
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Shop yêu thích
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Tình Trạng</div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Mới
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Đã sử dụng
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">
                      Các lựa chọn thanh toán
                    </div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        0% TRẢ GÓP
                      </li>
                    </ul>
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">Đánh Giá</div>
                    <Rate allowHalf defaultValue={5} />
                    <Rate allowHalf defaultValue={4} /> trở lên
                    <Rate allowHalf defaultValue={3} /> trở lên
                    <Rate allowHalf defaultValue={2} /> trở lên
                    <Rate allowHalf defaultValue={1} /> trở lên
                  </div>
                  <div className="category-group">
                    <div className="category-group-title">
                      Dịch Vụ &amp; Khuyến Mãi
                    </div>
                    <ul className="category-group-list">
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Voucher Xtra
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Đang giảm giá
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Gì cũng rẻ
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Miễn phí vận chuyển
                      </li>
                      <li className="category-group-item">
                        <input
                          type="checkbox"
                          className="category-group-item-check"
                        />
                        Hàng có sẵn
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn--primary category-group-filter-btn category-group--margin">
                    XÓA TẤT CẢ
                  </button>
                </nav>
              </div>
              <div className="container_right">
                {/* home filter */}
                <div className="home-filter hide-on-mobile-tablet">
                  <div className="home-filter-control">
                    <p className="home-filter-title">Sắp xếp theo</p>
                    <button
                      className="btn home-filter-btn"
                      onClick={getProduct}
                    >
                      Tất cả
                    </button>
                    <button
                      className="btn home-filter-btn"
                      onClick={handleProductHot}
                    >
                      Bán chạy
                    </button>
                    <div
                      className="btn home-filter-sort"
                      style={{ boxShadow: "none" }}
                    >
                      <div className="price">
                        <p className="home-filter-sort-btn">Giá</p>
                        <KeyboardArrowDownOutlinedIcon />
                      </div>

                      <ul className="home-filter-sort-list">
                        <li>
                          <button
                            className="home-filter-sort-item-link"
                            onClick={handleUp}
                            style={{ cursor: "pointer" }}
                          >
                            Giá: Thấp đến cao
                          </button>
                        </li>
                        <li>
                          <button
                            className="home-filter-sort-item-link"
                            style={{ cursor: "pointer" }}
                            onClick={handleDown}
                          >
                            Giá: Cao đến thấp
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* home product */}
                <div className="home-product">
                  <div id="list-product" className="row sm-gutter" />
                  <div id="list-product" className="row sm-gutter">
                    <div className=" home-product-item">
                      <div
                        className="cart_today"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "20px",
                        }}
                      >
                        {products?.map((product) => (
                          <div
                            className="home__recommend--body--item--product1"
                            key={product.productId}
                            onClick={() =>
                              navigate(`/chitiet/${product.productId}`)
                            }
                          >
                            <div
                              className="home__recommend--body--item--product1--img"
                              style={{
                                backgroundImage: `url(${product.imageProduct})`,
                              }}
                            >
                              <div className="home__recommend--body--item--product1--img--iconLike"></div>
                              <div className="home__recommend--body--item--product1--img--iconPercent">
                                <p style={{ fontSize: 12, paddingTop: "2px" }}>
                                  Sale++
                                </p>
                              </div>
                              <div className="home__recommend--body--item--product1--img--iconSale"></div>
                            </div>
                            <div className="home__recommend--body--item--product1--text">
                              <div className="home__recommend--body--item--product1--text--name">
                                {/* <textarea>[ Ảnh thật ] {product.productName}</textarea> */}
                                <textarea
                                  value={product.productName}
                                  cols={25}
                                  rows={2}
                                  style={{
                                    outline: "none",
                                    border: "none",
                                    overflow: "hidden",
                                    resize: "none",
                                    fontFamily: "Helvetica Neue",
                                  }}
                                ></textarea>
                              </div>
                              <div className="home__recommend--body--item--product1--text--sale">
                                <p>Hot Sale</p>
                              </div>
                              <div className="home__recommend--body--item--product1--text--price">
                                <div className="home__recommend--body--item--product1--text--price--left">
                                  <p>{formatCurrency(product.price)}</p>
                                </div>
                                <div className="home__recommend--body--item--product1--text--price--right">
                                  <p>Đã bán {product.quantitySole}+</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default MenFashion;
