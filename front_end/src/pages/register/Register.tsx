import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./Register.css";
import { ChangeEvent, useState } from "react";
import { notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import axios from "axios";

interface User {
  userName: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
}
export default function Register() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<User>({
    userName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  });
  const [errorInput, setErrorInput] = useState({
    errName: "",
    errPass: "",
    errPhone: "",
    errEmail: ""
  });
  // validate
  const validateInput = () => {
    const regexName = /^.{6,}$/;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const regexPhone = /^(?:\+84|0)(?:\d{9,10})$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let check = true;
    const err = {
      errName: "",
      errPass: "",
      errPhone: "",
      errEmail: ""
    };
  
    if (!regexName.test(newUser.userName.trim())) {
      err.errName = "Tên có 6 ký tự trở lên";
      check = false;
    }
    if (!regexPass.test(newUser.password)) {
      err.errPass = "Mật khẩu ít nhất 6 ký tự chứa cả chữ cái và số";
      check = false;
    }
    if (!regexPhone.test(newUser.phone)) {
      err.errPhone = "Số điện thoại không hợp lệ";
      check = false;
    }
    if (!regexEmail.test(newUser.email)) {
      err.errEmail = "Email không hợp lệ";
      check = false;
    }
    setErrorInput(err);
    return check;
  };
  
  // lay du lieu nhap vao
  const handleGetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  console.log(newUser);
  //   // configfibaes
  

 
  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!newUser.userName || !newUser.password) {
      notification.error({
        message: "Vui lòng nhập đủ thông tin",
      });
      return;
    }
    if (newUser.password !== newUser.rePassword) {
      notification.error({
        message: "Xác nhận lại mật khẩu",
      });
      return;
    }
    let isValidate = validateInput();
    if (isValidate) {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/sign-up",
          newUser
        );
        console.log("111111");
        notification.success({
          message: "Đăng ký thành công!",
          placement: "top",
          duration: 2,
        });
        navigate("/dangnhap");
      } catch (error: any) {
        console.log(error);
        notification.error({
          message: "Email đã tồn tại!",
          placement: "top",
          duration: 2,
        });
      }
    }
  };
  return (
    <>
      <div id="container">
        <div className="header">
          <div className="header__logo">
            <div className="header__logo--img">
              <img
                src="https://logospng.org/download/shopee/logo-shopee-icon-1024.png"
                alt=""
              />
            </div>
            <div className="header__logo--text" style={{ marginTop: "20px" }}>
              <p>Shoppe</p>
            </div>
            <div
              className="header__logo--registerText"
              style={{ marginTop: "20px" }}
            >
              <p>Đăng ký</p>
            </div>
          </div>
          <div className="header__help">
            <a href="">Bạn cần giúp đỡ?</a>
          </div>
        </div>
        <div className="main">
          <div className="background__image">
            <div className="form__register">
              <div className="form__register--text">
                <p>Đăng ký</p>
              </div>
              <div className="form__register--input">
                <div
                  className="form__register--input--email input"
                  style={{ marginTop: "-20px" }}
                >
                  <Input
                    size="large"
                    placeholder="Tên đăng nhập"
                    className="input__Email"
                    prefix={<UserOutlined />}
                    name="userName"
                    value={newUser.userName}
                    onChange={handleGetValue}
                  />
                  <p
                    id="userName-error"
                    style={{ paddingLeft: 150, color: "red", fontSize: "10px" }}
                  >
                    {errorInput.errName}
                  </p>
                </div>
                <div className="form__register--input--email input">
                  <Input
                    size="large"
                    placeholder="Email"
                    className="input__Email"
                    name="email"
                    value={newUser.email}
                    onChange={handleGetValue}
                  />
                 <p
                    id="userName-error"
                    style={{ paddingLeft: 150, color: "red", fontSize: "10px" }}
                  >
                    {errorInput.errEmail}
                  </p>
                </div>
                <div className="form__register--input--email input">
                  <Input
                    size="large"
                    placeholder="Số điện thoại"
                    className="input__Email"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleGetValue}
                  />
                  <p
                    id="userName-error"
                    style={{ paddingLeft: 150, color: "red", fontSize: "10px" }}
                  >
                    {errorInput.errPhone}
                  </p>
                </div>
                <div className="form__register--input--email input">
                  <Input.Password
                    placeholder="Nhập mật khẩu"
                    className="input__Email"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    name="password"
                    value={newUser.password}
                    onChange={handleGetValue}
                  />
                  <p
                    id="userName-error"
                    style={{ paddingLeft: 150, color: "red", fontSize: "10px" }}
                  ></p>
                </div>
                <div className="form__register--input--email input">
                  <Input.Password
                    placeholder="Nhập lại mật khẩu"
                    className="input__Email"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    name="rePassword"
                    value={newUser.rePassword}
                    onChange={handleGetValue}
                  />
                  <p
                    id="userName-error"
                    style={{ paddingLeft: 150, color: "red", fontSize: "10px" }}
                  >
                    {errorInput.errPass}
                  </p>
                </div>
                <div className="form__register--input--button">
                  <button
                    className="form__register--input--button__register"
                    onClick={handleRegister}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>

              <div className="form__register--Or" >
                <div className="line"></div>
                <span className="OrMid">Và</span>
                <div className="line"></div>
              </div>
              <div className="form__register--social">
                {/* <div className="form__register--social--facebook">
                  <div className="logo__facebook">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
                      alt=""
                    />
                  </div>
                  <div className="fabebook__text">
                    <p>Facebook</p>
                  </div>
                </div>
                <div
                  className="form__register--social--gmail"
                >
                  <div className="logo__google">
                    <img
                      src="https://pngimg.com/uploads/google/google_PNG19635.png"
                      alt=""
                    />
                  </div>
                  <div className="google__text">
                    <p>Google</p>
                  </div>
                </div> */}
              </div>
              <div className="form__register--acceptLaw">
                <p>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</p>
                <div>
                  <a href="">Điều khoản và dịch vụ</a> và{" "}
                  <a href="">Chính sách bảo mật</a>
                </div>
              </div>
              <div className="form__register--linkRegister">
                <p className="form__register--register__text">
                  Bạn đã có tài khoản?
                </p>
                <Link
                  to={"/dangnhap"}
                  className="form__register--register__link"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
