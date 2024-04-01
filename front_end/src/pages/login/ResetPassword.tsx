import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./Login.css";
import { ChangeEvent, useEffect, useState } from "react";
import { notification } from "antd";
import google from "../../assets/111.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import publicAxios from "../configAxios/publicAxios";

const ResetPassword = () => {
  const [email, setEmail] = useState<any>("");
  const [errorInput, setErrorInput] = useState({
    errMail: "",
  });
  const navigate = useNavigate();
  // validate
  const validateInput = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let check = true;
    const err = {
      errMail: "",
    };

    if (!emailRegex.test(email)) {
      err.errMail = "email không đúng định dạng";
      check = false;
    }
    setErrorInput(err);
    return check;
  };

  const handleSearch = async () => {
    if (validateInput(email)) {
      try {
        const response = await publicAxios.get(
          `users/email?key=${email}`
        );
        if (!response.data.userId) {
          notification.error({
            message: "Email không tồn tại!",
            placement: "top",
            duration: 2,
          });
          return;
        } else {
          navigate("/newPassword", { state: { user: response.data } });
        }
      } catch (error) {}
    }
  };
  return (
    <>
      <div id="container">
        <div className="header__login">
          <div className="header__logo">
            <div className="header__logo--img">
              <img
                src="https://logospng.org/download/shopee/logo-shopee-icon-1024.png"
                alt=""
              />
            </div>
            <div className="header__logo--loginText">
              <p>Đặt lại mật khẩu</p>
            </div>
          </div>
          <div className="header__help">
            <a href="">Bạn cần giúp đỡ?</a>
          </div>
        </div>
        <div className="main">
          <div className="background__image">
            <div className="form__login">
              <div></div>
              <div
                className="form__login--text"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "347px",
                  padding: "0",
                }}
              >
                <NavLink
                  to={"/dangnhap"}
                  style={{ backgroundColor: "FFFFFF", marginLeft: "0px" }}
                >
                  <ArrowBackIcon></ArrowBackIcon>
                </NavLink>
                <p style={{ marginLeft: "60px" }}>Đặt lại mật khẩu</p>
              </div>
              <div className="form__login--input">
                <div className="form__login--input--email input">
                  <Input
                    size="large"
                    placeholder="Tìm kiếm email"
                    className="input__Email"
                    prefix={<UserOutlined />}
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p
                  id="userName-error"
                  style={{ paddingLeft: 150, color: "red", fontSize: "10px" }}
                >
                  {errorInput.errMail}
                </p>
                <div className="form__login--input--password input"></div>
                <div className="form__login--input--button">
                  <button
                    className="form__login--input--button__login"
                    onClick={handleSearch}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
              <div className="form__login--register"></div>
              <div className="form__login--Or"></div>
              <div className="form__login--social"></div>
              <div className="form__login--linkRegister"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ResetPassword;
