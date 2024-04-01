import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

const NewPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const user = state?.user;
  const [email, setEmail] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const [allCaptcha, setAllCaptcha] = useState<string[]>([]);
  const [repeatCaptcha, setRepeatCaptcha] = useState<any>("");
  const [errorInput, setErrorInput] = useState({
    errPassword: "",
  });
  // validate
  const validateInput = () => {
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    let check = true;
    const err = {
      errPassword: "", // Updated property name from errPass to errPassword
    };
    if (!regexPass.test(newPassword)) {
      err.errPassword = "Mật khẩu ít nhất 6 ký tự chứa cả chữ cái và số";
      check = false;
    }
    setErrorInput(err);
    return check;
  };

  // tạo mã captcha
  const availableChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateCaptcha(length: any) {
    let captcha = "";
    while (captcha.length < length) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      const randomChar = availableChars[randomIndex];
      captcha += randomChar;
    }
    return captcha;
  }
  let enteredCaptcha = generateCaptcha(6);
  if (allCaptcha.length == 0) {
    allCaptcha.push(enteredCaptcha);
  }
  const handleUpdate = async () => {
    if (validateInput()) {
      console.log(enteredCaptcha);
      console.log(repeatCaptcha);
      if (allCaptcha[0] !== repeatCaptcha) {
        notification.error({
          message: "Khác mã captcha.",
          placement: "top",
          duration: 2,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return;
      }
      // Reset password
      publicAxios.patch(
        `users/resetPassword/${user.userId}`,
        {
          password: newPassword,
        }
      );
      notification.success({
        message: "Thay đổi mật khẩu thành công!",
        placement: "top",
        duration: 2,
      });
      navigate("/dangnhap");
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
                  to={"/resetPassword"}
                  style={{ backgroundColor: "FFFFFF", marginLeft: "0px" }}
                >
                  <ArrowBackIcon></ArrowBackIcon>
                </NavLink>
                <p style={{ marginLeft: "60px" }}>Nhập mật khẩu mới</p>
              </div>
              <div className="form__login--input">
                <Space.Compact>
                  <Input style={{ width: "25%" }} defaultValue="Captcha" />
                  <Input
                    style={{ width: "75%" }}
                    defaultValue={allCaptcha[0]}
                  />
                </Space.Compact>

                <div className="form__login--input--email input">
                  <Input
                    size="large"
                    placeholder="Nhập mã captcha"
                    className="input__Email"
                    prefix={<UserOutlined />}
                    name="email"
                    value={repeatCaptcha}
                    onChange={(e) => setRepeatCaptcha(e.target.value)}
                  />
                </div>
                <div className="form__login--input--email input">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input.Password
                      placeholder="nhập mật khẩu mới"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <p>
                      <span
                        id="userName-error"
                        style={{
                          paddingLeft: 150,
                          color: "red",
                          fontSize: "10px",
                        }}
                      >
                        {errorInput.errPassword}
                      </span>
                    </p>
                  </Space>
                </div>
                {/* <p
                  id="userName-error"
                  style={{ paddingLeft: 150, color: "red", fontSize: "10px" }}
                >
                  {errorInput.errMail}
                </p> */}
                <div className="form__login--input--password input"></div>
                <div className="form__login--input--button">
                  <button
                    className="form__login--input--button__login"
                    onClick={handleUpdate}
                  >
                    Lưu mật khẩu
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

export default NewPassword;
