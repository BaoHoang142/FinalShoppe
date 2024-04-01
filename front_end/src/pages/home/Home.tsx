import Header from "../../components/header/Header";
import "./Home.css";
import hourgold from "../../assets/icon/hourgold.png";
import extra from "../../assets/icon/extra.png";
import freeship from "../../assets/icon/freeship.png";
import freevoucher from "../../assets/icon/freevoucher.png";
import hangquocste from "../../assets/icon/hangquocste.png";
import outlet from "../../assets/icon/outlet.png";
import salecode from "../../assets/icon/salecode.png";
import shoppesieure from "../../assets/icon/shoppesieure.png";
import trend from "../../assets/icon/trend.png";
import card from "../../assets/icon/card.png";
import carousel from "../../assets/banner/vn-50009109-83bc013bfa6415d4df461bb53c626e80_xxhdpi.jpg";
import bannerright1 from "../../assets/banner/bannerright1.jpg";
import bannerright2 from "../../assets/banner/bannerright2.jpg";
import flashSale from "../../assets/flashSale.png";
import thuonghieulon from "../../assets/thuonghieulon.png";
import back7day from "../../assets/shopMall/6c502a2641457578b0d5f5153b53dd5d.png";
import protect from "../../assets/shopMall/protected.png";
import shipMall from "../../assets/shopMall/shipMall.png";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import publicAxios from "../configAxios/publicAxios";

interface Categories {
  categoryName: string | undefined;
  categoryId: number;
  image: string;
}
interface Products {
  productName: string;
  price: number;
  imageProduct: string;
  productId: number;
  description: string;
  quantity: number;
  quantitySole: number;
  statusProduct: number;
  categoryId: number;
}
export default function Home() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  // lay tat ca cac category
  const navigate = useNavigate();
  const [flag, setFlag] = useState<boolean>(true);
  const [categories, setCategories] = useState<Categories[]>([]);
  console.log(categories);

  const getCate = async () => {
    publicAxios
      .get("categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  // lay tat ca product ban duoc nhieu
  const [products, setProducts] = useState<Products[]>([]);

  const getProducts = async () => {
    let res = await publicAxios.get(
      "products/hotProduct"
    );
    const result = res.data.filter(
      (product: any) => product.statusProduct == 1
    );
    setProducts(result);
  };

  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    getCate();
    getProducts();
  }, []);

  return (
    <>
      <Header></Header>
      <div id="home">
        <div className="banner">
          <div className="banner__show">
            <div className="banner__show--qc">
              <div className="banner__show--carousel">
                <img
                  src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711222208/banner/bmmjhbau6p1tm8fty8le.jpg"
                  alt=""
                />
              </div>
              <div className="banner__show--img">
                <div className="banner__show--img--top">
                  <img
                    src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711222208/banner/o2krsppxuiecfhiztwff.jpg"
                    alt=""
                  />
                </div>
                <div className="banner__show--img--bot">
                  <img
                    src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711222208/banner/dtrc4vqupvzsq7w3knqb.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="banner__show--icon">
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={hourgold} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Khung Giờ Săn Sale</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={extra} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Voucher Giảm Đến</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={freeship} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Miễn Hết Phí Ship</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={freevoucher} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Nhận Free Voucher</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={hangquocste} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Hàng Quốc Tế</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={outlet} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Hàng Hiệu Giảm 50%</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={card} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>
                    Nạp Thẻ,
                    <br /> Dịch Vụ
                  </p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={salecode} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Mã Giảm Giá</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={shoppesieure} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Shopee Siêu Rẻ</p>
                </div>
              </div>
              <div className="banner__show--icon--one icon__banner">
                <div className="icon__banner--img">
                  <img src={trend} alt="" />
                </div>
                <div className="icon__banner--text">
                  <p>Bắt Trend -Giá Sốc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home__main">
          <div className="home__category">
            <div className="home__category--text">
              <p>Danh mục</p>
            </div>
            <div className="home__category--item">
              {categories.map((category) => (
                <div
                  className="home__category--item--category1"
                  style={{ cursor: "pointer" }}
                  key={category.categoryId}
                  onClick={() => navigate(`/categories/${category.categoryId}`)}
                >
                  <div className="home__category--item--category1--img">
                    <img src={category.image} alt="" />
                  </div>
                  <div className="home__category--item--category1--text">
                    <p>{category.categoryName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="home__flashSale">
            <div className="home__flashSale--timeShow">
              <div className="home__flashSale--timeShow--time">
                <img src={flashSale} alt="" />
              </div>
              <div className="home__flashSale--timeShow--showAll">
                <p>Xem tất cả</p>
              </div>
            </div>
            <div className="home__flashSale--item">
              <div className="home__flashSale--item--sale1">
                <div className="home__flashSale--item--sale1--img">
                  <div className="home__flashSale--item--sale1--img--mall">
                    <div className="home__flashSale--item--sale1--img--mall--img"></div>
                  </div>
                  <div className="home__flashSale--item--sale1--img--percent">
                    <p>-38 %</p>
                  </div>
                  <div className="home__flashSale--item--sale1--img--imgSale1"></div>
                </div>
                <div className="home__flashSale--item--sale1--price">
                  <p>{formatCurrency("129000")}</p>
                </div>
                <div className="home__flashSale--item--sale1--bought">
                  <div className="home__flashSale--item--sale1--bought1">
                    <p>ĐÃ BÁN 20</p>
                  </div>
                  <div className="home__flashSale--item--sale1--pan"></div>
                </div>
              </div>
              <div className="home__flashSale--item--sale1">
                <div className="home__flashSale--item--sale1--img2">
                  <div className="home__flashSale--item--sale1--img--mall">
                    <div className="home__flashSale--item--sale1--img--mall--img"></div>
                  </div>
                  <div className="home__flashSale--item--sale1--img--percent">
                    <p>-38 %</p>
                  </div>
                  <div className="home__flashSale--item--sale1--img--imgSale1"></div>
                </div>
                <div className="home__flashSale--item--sale1--price">
                  <p>{formatCurrency("183000")}</p>
                </div>
                <div className="home__flashSale--item--sale1--bought">
                  <div className="home__flashSale--item--sale1--bought1">
                    <p>ĐANG BÁN CHẠY</p>
                  </div>
                  <div className="home__flashSale--item--sale1--pan2"></div>
                </div>
              </div>
              <div className="home__flashSale--item--sale1">
                <div className="home__flashSale--item--sale1--img3">
                  <div className="home__flashSale--item--sale1--img--mall">
                    <div className="home__flashSale--item--sale1--img--mall--img"></div>
                  </div>
                  <div className="home__flashSale--item--sale1--img--percent">
                    <p>-38 %</p>
                  </div>
                  <div className="home__flashSale--item--sale1--img--imgSale1"></div>
                </div>
                <div className="home__flashSale--item--sale1--price">
                  <p>{formatCurrency("5710000")}</p>
                </div>
                <div className="home__flashSale--item--sale1--bought">
                  <div className="home__flashSale--item--sale1--bought1">
                    <p>ĐANG BÁN CHẠY</p>
                  </div>
                  <div className="home__flashSale--item--sale1--pan3"></div>
                </div>
              </div>
              <div className="home__flashSale--item--sale1">
                <div className="home__flashSale--item--sale1--img4">
                  <div className="home__flashSale--item--sale1--img--mall">
                    <div className="home__flashSale--item--sale1--img--mall--img"></div>
                  </div>
                  <div className="home__flashSale--item--sale1--img--percent">
                    <p>-38 %</p>
                  </div>
                  <div className="home__flashSale--item--sale1--img--imgSale1"></div>
                </div>
                <div className="home__flashSale--item--sale1--price">
                  <p>{formatCurrency("292000")}</p>
                </div>
                <div className="home__flashSale--item--sale1--bought">
                  <div className="home__flashSale--item--sale1--bought1">
                    <p>ĐANG BÁN CHẠY</p>
                  </div>
                  <div className="home__flashSale--item--sale1--pan4"></div>
                </div>
              </div>
              <div className="home__flashSale--item--sale1">
                <div className="home__flashSale--item--sale1--img5">
                  <div className="home__flashSale--item--sale1--img--mall">
                    <div className="home__flashSale--item--sale1--img--mall--img"></div>
                  </div>
                  <div className="home__flashSale--item--sale1--img--percent">
                    <p>-38 %</p>
                  </div>
                  <div className="home__flashSale--item--sale1--img--imgSale1"></div>
                </div>
                <div className="home__flashSale--item--sale1--price">
                  <p>{formatCurrency("495000")}</p>
                </div>
                <div className="home__flashSale--item--sale1--bought">
                  <div className="home__flashSale--item--sale1--bought1">
                    <p>ĐANG BÁN CHẠY</p>
                  </div>
                  <div className="home__flashSale--item--sale1--pan5"></div>
                </div>
              </div>
              <div className="home__flashSale--item--sale1">
                <div className="home__flashSale--item--sale1--img6">
                  <div className="home__flashSale--item--sale1--img--mall">
                    <div className="home__flashSale--item--sale1--img--mall--img"></div>
                  </div>
                  <div className="home__flashSale--item--sale1--img--percent">
                    <p>-38 %</p>
                  </div>
                  <div className="home__flashSale--item--sale1--img--imgSale1"></div>
                </div>
                <div className="home__flashSale--item--sale1--price">
                  <p>{formatCurrency("1799900")}</p>
                </div>
                <div className="home__flashSale--item--sale1--bought">
                  <div className="home__flashSale--item--sale1--bought1">
                    <p>ĐANG BÁN CHẠY</p>
                  </div>
                  <div className="home__flashSale--item--sale1--pan6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="home__bigShop">
            <img src={thuonghieulon} alt="" />
          </div>
          <div className="home__shopMall">
            <div className="home__shopMall--header">
              <div className="home__shopMall--header--left">
                <div className="home__shopMall--header--left--shoppemall">
                  <p>SHOPPE MALL</p>
                </div>
                <div className="home__shopMall--header--left--back">
                  <div className="home__shopMall--header--left--back--img">
                    <img src={back7day} alt="" />
                  </div>
                  <p>7 Ngày Miễn Phí Trả Hàng</p>
                </div>
                <div className="home__shopMall--header--left--back">
                  <div className="home__shopMall--header--left--back--img">
                    <img src={protect} alt="" />
                  </div>
                  <p>Hàng Chính Hãng 100%</p>
                </div>
                <div className="home__shopMall--header--left--back">
                  <div className="home__shopMall--header--left--back--img">
                    <img src={shipMall} alt="" />
                  </div>
                  <p>Miễn Phí Vận Chuyển</p>
                </div>
              </div>
              <div className="home__shopMall--header--right">
                <p>Xem Tất Cả</p>
              </div>
            </div>
            <div className="home__shopMall--body">
              <div className="home__shopMall--body--left"></div>
              <div className="home__shopMall--body--right">
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img">
                    <p>Thời trang -50%</p>
                  </div>
                </div>
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img2">
                    <p>Giảm đến 50%</p>
                  </div>
                </div>
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img3">
                    <p>Mua 1 được 2</p>
                  </div>
                </div>
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img4">
                    <p>Giảm đến 50%</p>
                  </div>
                </div>
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img5">
                    <p>Giảm đến 50%</p>
                  </div>
                </div>
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img6">
                    <p>Mua là có quà</p>
                  </div>
                </div>
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img7">
                    <p>Mua 1 tặng 1</p>
                  </div>
                </div>
                <div className="home__shopMall--body--right--item">
                  <div className="home__shopMall--body--right--item--img8">
                    <p>Giảm đến 50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home__topSearch">
            <div className="home__topSearch--header">
              <div className="home__topSearch--header--text">
                <p>TÌM KIẾM HÀNG ĐẦU</p>
              </div>
              <div className="home__topSearch--header--showAll">
                <p>Xem Tất Cả</p>
              </div>
            </div>
            <div className="home__topSearch--body">
              <div className="home__topSearch--body--item">
                <div className="home__topSearch--body--item--img">
                  <div className="home__topSearch--body--item--img--icon"></div>
                  <div className="home__topSearch--body--item--img--text">
                    <p>Bán 29k+ / tháng</p>
                  </div>
                </div>
                <div className="home__topSearch--body--item--text">
                  <p>Quần Lót Nữ Cotton</p>
                </div>
              </div>
              <div className="home__topSearch--body--item">
                <div className="home__topSearch--body--item--img2">
                  <div className="home__topSearch--body--item--img--icon"></div>
                  <div className="home__topSearch--body--item--img--text">
                    <p>Bán 79k+ / tháng</p>
                  </div>
                </div>
                <div className="home__topSearch--body--item--text">
                  <p>Son lì</p>
                </div>
              </div>
              <div className="home__topSearch--body--item">
                <div className="home__topSearch--body--item--img3">
                  <div className="home__topSearch--body--item--img--icon"></div>
                  <div className="home__topSearch--body--item--img--text">
                    <p>Bán 33k+ / tháng</p>
                  </div>
                </div>
                <div className="home__topSearch--body--item--text">
                  <p>Ốp Điện Thoại Ip 5</p>
                </div>
              </div>
              <div className="home__topSearch--body--item">
                <div className="home__topSearch--body--item--img4">
                  <div className="home__topSearch--body--item--img--icon"></div>
                  <div className="home__topSearch--body--item--img--text">
                    <p>Bán 99k+ / tháng</p>
                  </div>
                </div>
                <div className="home__topSearch--body--item--text">
                  <p>Kem Nền</p>
                </div>
              </div>
              <div className="home__topSearch--body--item">
                <div className="home__topSearch--body--item--img5">
                  <div className="home__topSearch--body--item--img--icon"></div>
                  <div className="home__topSearch--body--item--img--text">
                    <p>Bán 87k+ / tháng</p>
                  </div>
                </div>
                <div className="home__topSearch--body--item--text">
                  <p>Áo Lót Nữ</p>
                </div>
              </div>
              <div className="home__topSearch--body--item">
                <div className="home__topSearch--body--item--img6">
                  <div className="home__topSearch--body--item--img--icon"></div>
                  <div className="home__topSearch--body--item--img--text">
                    <p>Bán 31k+ / tháng</p>
                  </div>
                </div>
                <div className="home__topSearch--body--item--text">
                  <p>Len</p>
                </div>
              </div>
            </div>
          </div>
          <div className="home__recommend">
            <div className="home__recommend--header">
              <p>GỢI Ý HÔM NAY</p>
            </div>
            <div className="home__recommend--body">
              <div className="home__recommend--body--item">
                {products?.map((product) => (
                  <div
                    className="home__recommend--body--item--product1"
                    key={product.productId}
                    onClick={() => navigate(`/chitiet/${product.productId}`)}
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
            <div className="home__recommend--footer">
              <div className="home__recommend--footer--showMore">
                <button className="btn__showMore">XEM THÊM</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
