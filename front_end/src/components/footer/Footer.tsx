import "./Footer.css";
import visa from "../../assets/pay/1.png";
import mastercard from "../../assets/pay/2.png";
import jcb from "../../assets/pay/3.png";
import shoppepay from "../../assets/pay/5.png";
import cod from "../../assets/pay/4.png";
import spx from "../../assets/ship/1.png";
import ghtk from "../../assets/ship/2.png";
import ghn from "../../assets/ship/3.png";
import vttpost from "../../assets/ship/4.png";
import vnpost from "../../assets/ship/5.png";
import jnt from "../../assets/ship/6.png";
import ninja from "../../assets/ship/7.png";
import grap from "../../assets/ship/7.png";
import bestex from "../../assets/ship/7.png";
import fb from "../../assets/done/4.png";
import x from "../../assets/done/2.png";
import pinteress from "../../assets/done/3.png";
import qr from "../../assets/qr/qr-code.png";
import appstore from "../../assets/qr/app-store.png";
import ggplay from "../../assets/qr/gg-play.png";
import appgalery from "../../assets/qr/app-gallery.png";
import bocongthuong from "../../assets/done/logoCCDV.png";

export default function Footer() {
  return (
    <>
      <div id="footer">
        <div className="service">
          <div className="service__support rows">
            <h5>Chăm sóc khách hàng</h5>
            <div className="service__support--content content">
              <p style={{ marginTop: "-5px" }}>Trung tâm trợ giúp</p>
              <p>Shopee Blog</p>
              <p>Shopee Mall</p>
              <p>Hướng Dẫn Mua Hàng</p>
              <p>Hướng Dẫn Bán Hàng</p>
              <p>Thanh Toán</p>
              <p>Shopee Xu</p>
              <p>Vận Chuyển</p>
              <p>Trả Hàng & Hoàn Tiền</p>
              <p>Chăm Sóc Khách Hàng</p>
              <p>Chính Sách Bảo Hành</p>
            </div>
          </div>
          <div className="service__about rows">
            <h5>Về shoppe</h5>
            <div className="service__about--content content">
              <p style={{ marginTop: "-5px" }}>Giới Thiệu Về Shopee Việt Nam</p>
              <p>Tuyển Dụng</p>
              <p>Shopee Mall</p>
              <p>Điều Khoản Shopee</p>
              <p>Chính Sách Bảo Mật</p>
              <p>Chính Hãng</p>
              <p>Kênh Người Bán</p>
              <p>Flash Sales</p>
              <p>Chương Trình Tiếp Thị Liên Kết Shopee</p>
              <p>Liên Hệ Với Truyền Thông</p>
            </div>
          </div>
          <div className="service__payment rows">
            <h5>thanh toán</h5>
            <div className="service__payment--icon">
              <div className="payment--icon">
                <img src={visa} alt="" />
              </div>
              <div className="payment--icon">
                <img src={mastercard} alt="" />
              </div>
              <div className="payment--icon">
                <img src={jcb} alt="" />
              </div>
              <div className="payment--icon">
                <img src={shoppepay} alt="" />
              </div>
              <div className="payment--icon">
                <img src={cod} alt="" />
              </div>
            </div>
            <br />
            <br />
            <h5>Vận chuyển</h5>
            <div className="service__payment--transform">
              <div className="transform--icon">
                <img src={spx} alt="" />
              </div>
              <div className="transform--icon">
                <img src={ghn} alt="" />
              </div>
              <div className="transform--icon">
                <img src={vttpost} alt="" />
              </div>
              <div className="transform--icon">
                <img src={vnpost} alt="" />
              </div>
              <div className="transform--icon">
                <img src={jnt} alt="" />
              </div>
              <div className="transform--icon">
                <img src={ninja} alt="" />
              </div>
              <div className="transform--icon">
                <img src={grap} alt="" />
              </div>
              <div className="transform--icon">
                <img src={bestex} alt="" />
              </div>
            </div>
          </div>
          <div className="service__follow rows">
            <h5>Theo dõi chúng tôi</h5>
            <div className="service__follow--icon">
              <div className="follow--icon__fb">
                <div className="divfb">
                  <img src={fb} alt="" />
                </div>
                <p style={{ marginLeft: "10px" }}>Facebook</p>
              </div>
              <div className="follow--icon__fb">
                <div className="divfb">
                  <img src={x} alt="" />
                </div>
                <p style={{ marginLeft: "10px" }}>Twitter</p>
              </div>
              <div className="follow--icon__fb">
                <div className="divfb">
                  <img src={pinteress} alt="" />
                </div>
                <p style={{ marginLeft: "10px" }}>Message</p>
              </div>
            </div>
          </div>
          <div className="service__app rows">
            <h5>Tải app</h5>
            <div className="service__app--icon">
              <div className="qrcode">
                <img src={qr} alt="" />
              </div>
              <div className="app__right">
                <div className="app_right--icon">
                  <img src={appstore} alt="" />
                </div>
                <br />
                <div className="app_right--icon">
                  <img src={ggplay} alt="" />
                </div>
                <br />
                <div className="app_right--icon">
                  <img src={appgalery} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ marginTop: "50px" }} />
        <div className="contact">
          <div className="contact__top">
            <div>
              <p>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
            </div>
            <div>
              <p>
                Quốc gia & Khu vực: Singapore| Indonesia| Thái Lan| Malaysia|
                Việt Nam| Philippines| Brazil| México| Colombia| Chile| Đài Loan
              </p>
            </div>
          </div>
          <div className="contact__mid">
            <div className="contact__mid--text">
              <p>
                CHÍNH SÁCH BẢO MẬT | QUY CHẾ HOẠT ĐỘNG | CHÍNH SÁCH VẬN CHUYỂN |
                CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN
              </p>
            </div>
            <div className="contact__mid--icon">
              <div className="mid__icon">
                <img src={bocongthuong} alt="" />
              </div>
              <div className="mid__icon">
                <img src={bocongthuong} alt="" />
              </div>
            </div>
          </div>
          <div className="contact__bot">
            <p>Công ty TNHH Shopee</p>
            <br />
            <br />
            <p>
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
              Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng
              đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn <br />
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại
              liên hệ: 024 73081221 (ext 4678) <br />
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội
              cấp lần đầu ngày 10/02/2015 <br />© 2015 - Bản quyền thuộc về Công
              ty TNHH Shopee
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
