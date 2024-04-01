import { useState } from "react";
import Header from "./Header";
import { notification } from "antd";
import "./Store.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import publicAxios from "../configAxios/publicAxios";
export default function AddStore() {
  const [addressStore, setAddressStore] = useState<string>("");
  const [phone, setPhone] = useState<any>("");
  const [storeName, setStoreName] = useState<string>("");
  const [emailStore, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  const [errorInput, setErrorInput] = useState<any>({
    errName: "",
    errPass: "",
    errPhone: "",
    errEmail: "",
  });
  //validate
  const validateInput = () => {
    const regexName = /^.{6,}$/;
    const regexPhone = /^(?:\+84|0)(?:\d{9,10})$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let check = true;
    const err = {
      errName: "",
      errPhone: "",
      errEmail: "",
    };

    if (!regexName.test(storeName.trim())) {
      err.errName = "Tên shop có 6 ký tự trở lên";
      check = false;
    }

    if (!regexPhone.test(phone)) {
      err.errPhone = "Số điện thoại không hợp lệ";
      check = false;
    }
    if (!regexEmail.test(emailStore)) {
      err.errEmail = "Email không hợp lệ";
      check = false;
    }
    setErrorInput(err);
    return check;
  };

  // Post thông tin vào bảng stores
  const handleStores = async () => {
    if (!flagUser) {
      notification.error({
        message: "Cần đăng nhập để đăng ký cửa hàng",
        placement: "top",
        duration: 2,
      });
      setTimeout(() => {
        navigate("/dangnhap");
      }, 2000);
      return;
    }
    console.log(phone, addressStore, storeName, emailStore);
    let check = validateInput();
    if (check) {
      try {
        await publicAxios.post(`stores`, {
          phone,
          addressStore,
          storeName,
          emailStore,
          storeId: flagUser.userId,
        });
        notification.success({
          message: "Đăng ký cửa hàng thành công!",
          placement: "top",
          duration: 2,
        });
        setTimeout(() => {
          navigate("/danhsachsanpham");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
    
  };
  return (
    <>
      <div>
        <div className="add_store">
          <Header />
          <div className="main_add">
            Cài đặt thông tin cửa hàng <hr />
          </div>
          <div className="main_left main_lefttt">
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Tên Shop</td>
                  <td className="label1">
                    <input
                      type="text"
                      onChange={(e) => setStoreName(e.target.value)}
                    />
                    <p
                      id="userName-error"
                      style={{
                        paddingLeft: 150,
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {errorInput.errName}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="label">Số điện thoại</td>
                  <td className="label1">
                    <input
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <p
                      id="userName-error"
                      style={{
                        paddingLeft: 150,
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {errorInput.errPhone}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="label">Địa chỉ lấy hàng</td>
                  <td className="label1">
                    <input
                      type="text"
                      onChange={(e) => setAddressStore(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Email</td>
                  <td className="label1">
                    <input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p
                      id="userName-error"
                      style={{
                        paddingLeft: 150,
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {errorInput.errEmail}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button
                      className="store_main3"
                      style={{ marginLeft: "70px" }}
                      onClick={handleStores}
                    >
                      Lưu
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
