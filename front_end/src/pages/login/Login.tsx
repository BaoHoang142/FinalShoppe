import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./Login.css";
import { ChangeEvent, useEffect, useState } from "react";
import { notification } from "antd";
import google from "../../assets/111.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import publicAxios from "../configAxios/publicAxios";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const handleGetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);
  //   // configfibaes
  const firebaseConfig = {
    apiKey: "AIzaSyCTeh8snjndcWcK91CfnHLGJvrlA1AGZ4Q",
    authDomain: "authen-c6580.firebaseapp.com",
    projectId: "authen-c6580",
    storageBucket: "authen-c6580.appspot.com",
    messagingSenderId: "969210547285",
    appId: "1:969210547285:web:73a1b1437edd63a223d8dc",
  };

  // Khởi tạo ứng dụng Firebase
  const app = initializeApp(firebaseConfig);

  // Lấy đối tượng auth từ Firebase
  const auth = getAuth();
  // Tạo một provider cho đăng nhập bằng Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;
      const userGoogle = {
        userName: user.displayName,
        email: user.email,
        password: user.uid,
      };
      // check xem co ton tai email hay chua
      try {
        const res: any = await publicAxios.get(
          `users/email?key=${userGoogle.email}`
        );
        console.log(res)
        if (res.data.userId) {
          const res = await publicAxios.post(
            "auth/sign-in",
            userGoogle
          );
          console.log(res);
          if (res.data.user.statusUser == 0) {
            notification.error({ message: "Tài khoản đã bị khóa!" });
            return;
          }
          if (res.data.user.role == 0) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/");
            return;
          }
          if (res.data.user.role == 1) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/admin/products");
            return;
          }
        } else {
          const res = await publicAxios.post(
            "auth/sign-up",
            userGoogle
          );
          const respone = await publicAxios.post(
            "auth/sign-in",
            userGoogle
          );
          localStorage.setItem("user", JSON.stringify(respone.data.user));
            localStorage.setItem("token", JSON.stringify(respone.data.token));
            navigate("/");
        }
      } catch (error: any) {
        console.log(error);
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };
  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(user);
    if (user.email.trim() === "" || user.password.trim() === "") {
      notification.error({ message: "Vui lòng điền đầy đủ thông tin!" });
    } else {
      try {
        const res = await publicAxios.post(
          "auth/sign-in",
          user
        );
        console.log(res);
        if (res.data.user.statusUser == 0) {
          notification.error({ message: "Tài khoản đã bị khóa!" });
          return;
        }
        if (res.data.user.role == 0) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/");
          return;
        }
        if (res.data.user.role == 1) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/admin/products");
          return;
        }
      } catch (error: any) {
        notification.error({
          message: "Sai thông tin. Vui lòng kiểm tra lại!",
        });
      }
    }
  };
  // check token và quyền
  const token = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      if (user.role == 0) {
        navigate("/");
      } else if (user.role == 1) {
        navigate("/admin/products");
      }
    }
  };
  useEffect(() => {
    token();
  }, []);
  return (
    <>
      <div id="container">
        <div className="header__login">
          <div className="header__logo">
            <NavLink to={"/"} className="header__logo--img">
              <img
                src="https://logospng.org/download/shopee/logo-shopee-icon-1024.png"
                alt=""
              />
            </NavLink>
            <div className="header__logo--loginText">
              <p>Đăng nhập</p>
            </div>
          </div>
          <div className="header__help">
            <a href="">Bạn cần giúp đỡ?</a>
          </div>
        </div>
        <div className="main">
          <div className="background__image">
            <div className="form__login">
              <div className="form__login--text">
                <p>Đăng nhập</p>
              </div>
              <div className="form__login--input">
                <div className="form__login--input--email input">
                  <Input
                    size="large"
                    placeholder="Email đăng nhập"
                    className="input__Email"
                    prefix={<UserOutlined />}
                    name="email"
                    value={user.email}
                    onChange={handleGetValue}
                  />
                </div>
                <div className="form__login--input--password input">
                  <Input.Password
                    placeholder="Nhập mật khẩu"
                    className="input__Email"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    name="password"
                    value={user.password}
                    onChange={handleGetValue}
                  />
                </div>
                <div className="form__login--input--button">
                  <button
                    className="form__login--input--button__login"
                    onClick={handleLogin}
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
              <div className="form__login--register">
                <NavLink to={"/resetPassword"}>Quên mật khẩu</NavLink>
                <a href="">Đăng nhập với sms</a>
              </div>
              <div className="form__login--Or">
                <div className="line1"></div>
                <span className="OrMid1">Hoặc</span>
                <div className="line1"></div>
              </div>
              <div className="form__login--social">
                <div className="form__login--social--facebook">
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
                  className="form__login--social--gmail"
                  onClick={signInWithGoogle}
                  style={{ cursor: "pointer" }}
                >
                  <div className="logo__google">
                    <img src={google} alt="" />
                  </div>
                  <div className="google__text">
                    <p>Google</p>
                  </div>
                </div>
              </div>
              <div className="form__login--linkRegister">
                <p className="form__login--register__text">
                  Bạn mới biết đến Shoppe?
                </p>
                <NavLink to={"/dangky"} className="form__login--register__link">
                  Đăng ký
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
