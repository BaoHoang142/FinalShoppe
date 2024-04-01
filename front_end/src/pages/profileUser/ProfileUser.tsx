import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ProfileUser.css";
import avatarBlack from "../../assets/avatarBlack.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, notification } from "antd";

interface User {
  userId: string | number;
  userName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl: string;
  gender: string;
  statusUser: number;
  address: string;
  role: number;
}
export default function ProfileUser() {
  // scroll top
  window.scrollTo({ top: 0, behavior: "smooth" });
  const [flag, setFlag] = useState<boolean>(true);
  const [user, setUser] = useState<User>({} as User);
  const [selectedMedia, setSelectedMedia] = useState<string>("");
  const [isAvatarHandled, setIsAvatarHandled] = useState(false);
  const [preview, setPreviewSrc] = useState("");
  const [selectedUser, setSelectedUser] = useState<User>({} as User);
  const navigate = useNavigate();

  const [changeInfor, setChangeInfor] = useState<any>({
    userId: user.userId,
    password: user.password,
    statusUser: user.statusUser,
    avatarUrl: user.avatarUrl,
    email: user.email,
    role: user.role,
    userName: "",
    phone: "",
    gender: "",
    address: "",
  });
  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(userLocal);
    setUser(userLocal);
    setChangeInfor({
      ...changeInfor,
      userId: userLocal.userId,
      email: userLocal.email,
      userName: userLocal.userName,
      password: userLocal.password,
      statusUser: userLocal.statusUser,
      role: userLocal.role,
      gender: userLocal.gender,
      phone: userLocal.phone,
      address: userLocal.address,
    });
  }, [!flag]);
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // het modal
  const handleChangeInput = (e: any) => {
    console.log(e.target.value);
    setChangeInfor({ ...changeInfor, [e.target.name]: e.target.value });
  };
  const [errorInput, setErrorInput] = useState({
    errName: "",
    errPhone: "",
    errAddress: "",
  });
  // validate
  const validateInput = () => {
    const regexName = /^.{6,}$/;
    const regexPhone = /^(?:\+84|0)(?:\d{9,10})$/;
    let check = true;
    const err: any = {
      errName: "",
      errPhone: "",
    };

    if (!regexName.test(changeInfor.userName.trim())) {
      err.errName = "Tên có 6 ký tự trở lên";
      check = false;
    }

    if (!regexPhone.test(changeInfor.phone)) {
      err.errPhone = "Số điện thoại không hợp lệ";
      check = false;
    }
    setErrorInput(err);
    return check;
  };
  const handleUpdate = async () => {
    let check = validateInput();
    if (check) {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/users/${user.userId}`,
        changeInfor
      );
      localStorage.setItem("user", JSON.stringify(changeInfor));
      notification.success({
        message: "Cập nhật thành công",
      });
      setIsModalOpen(false);
      navigate("/profile");
    }
  };
  const handleAddMedia = (event: any) => {
    console.log("first");
    setSelectedMedia(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event: any) {
      setPreviewSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const handleAvatar = async () => {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "shopee");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dqirycujn/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;
      console.log(media);
      let response = await axios.patch(
        `http://localhost:8080/api/v1/users/avatar/${changeInfor.userId}`,
        {
          avatarUrl: media,
        }
      );
      if (response.data.status === 200) {
        notification.success({
          message: "Cập nhật avatar thành công!",
          placement: "top",
          duration: 2,
        });
      }
      const updatedUser = { ...changeInfor, avatarUrl: media };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setChangeInfor(updatedUser);
      setUser(updatedUser);
      setIsAvatarHandled(true);
    };

    if (selectedMedia && !isAvatarHandled) {
      handleAvatar();
    }
  }, [selectedMedia, changeInfor, isAvatarHandled]);
  return (
    <>
      <Header></Header>
      <div id="profileUser">
        <div className="profileUser__main">
          <div className="profileUser__main--left">
            <div className="profileUser__main--left--avatar">
              <div className="profileUser__main--left--avatar--img">
                <img
                  src={user.avatarUrl}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="profileUser__main--left--avatar--name">
                <p style={{ marginTop: "15px", fontWeight: "700" }}>
                  {user.userName}
                </p>
                <p style={{ opacity: "0.6" }}>
                  {" "}
                  <i className="fa-solid fa-pen"></i>Sửa hồ sơ
                </p>
              </div>
            </div>
            <div className="profileUser__main--left--navbar">
              <div className="profileUser__main--left--navbar--sale">
                <div className="profileUser__main--left--navbar--sale--img"></div>
                <div className="profileUser__main--left--navbar--sale--text">
                  <p>
                    25.3 Lương về Sale thôi <br />
                  </p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--user">
                <div className="profileUser__main--left--navbar--user--img"></div>
                <div className="profileUser__main--left--navbar--user--text">
                  <p>Tài Khoản Của Tôi</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--order">
                <div className="profileUser__main--left--navbar--order--img"></div>
                <div className="profileUser__main--left--navbar--order--text">
                  <p>Đơn Mua</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--alert">
                <div className="profileUser__main--left--navbar--alert--img"></div>
                <div className="profileUser__main--left--navbar--alert--text">
                  <p>Thông Báo</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--voucher">
                <div className="profileUser__main--left--navbar--voucher--img"></div>
                <div className="profileUser__main--left--navbar--voucher--text">
                  <p>Kho Vouver</p>
                </div>
              </div>
              <div className="profileUser__main--left--navbar--coin">
                <div className="profileUser__main--left--navbar--coin--img"></div>
                <div className="profileUser__main--left--navbar--coin--text">
                  <p>Shoppe Xu</p>
                </div>
              </div>
            </div>
          </div>
          <div className="profileUser__main--right">
            <div className="profileUser__main--right--body">
              <div className="profileUser__main--right--body--yourAccount">
                <div className="profileUser__main--right--body--yourAccount--yourProfile">
                  <h1>HỒ SƠ CỦA TÔI</h1>
                </div>
                <div className="profileUser__main--right--body--yourAccount--yourContent">
                  <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
              </div>
              <div className="profileUser__main--right--body--yourInfor">
                <div className="profileUser__main--right--body--yourInfor--left">
                  <form action="">
                    <table className="profileUser__main--right--body--yourInfor--left--table">
                      <tr>
                        <td className="profileUser__main--right--body--yourInfor--left--table--userLogin">
                          <label>Tên người dùng</label>
                        </td>
                        <td className="profileUser__main--right--body--yourInfor--left--table--userName">
                          <p>{user.userName}</p>
                        </td>
                      </tr>

                      <tr>
                        <td className="profileUser__main--right--body--yourInfor--left--table--email">
                          <label htmlFor="">Email</label>
                        </td>
                        <td className="profileUser__main--right--body--yourInfor--left--table--emailText">
                          <div
                            className="profileUser__main--right--body--yourInfor--left--table--emailText--input"
                            style={{ border: "none" }}
                          >
                            {user.email}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="profileUser__main--right--body--yourInfor--left--table--phone">
                          <label htmlFor="">Số điện thoại</label>
                        </td>
                        <td className="profileUser__main--right--body--yourInfor--left--table--phoneText">
                          <div className="profileUser__main--right--body--yourInfor--left--table--phoneText--input">
                            {user.phone}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="profileUser__main--right--body--yourInfor--left--table--sex">
                          <label htmlFor="">Giới tính</label>
                        </td>
                        <td className="profileUser__main--right--body--yourInfor--left--table--sexText">
                          <div className="profileUser__main--right--body--yourInfor--left--table--sexText--input">
                            {user.gender}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="profileUser__main--right--body--yourInfor--left--table--sex">
                          <label htmlFor="">Địa chỉ</label>
                        </td>
                        <td className="profileUser__main--right--body--yourInfor--left--table--sexText">
                          <div className="profileUser__main--right--body--yourInfor--left--table--sexText--input">
                            {user.address}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="espR83">
                          <label htmlFor=""></label>
                        </td>
                        <td className="Tmj5Z6">
                          <button
                            type="button"
                            className="btn btn-solid-primary btn--m btn--inline"
                            aria-disabled="false"
                            onClick={showModal}
                          >
                            Cập nhật thông tin
                          </button>
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
                <div className="profileUser__main--right--body--yourInfor--right">
                  <div className="profileUser__main--right--body--yourInfor--right--img">
                    <div className="XWsmVn">
                      <div className="LoNm4g">
                        <img
                          src={user?.avatarUrl}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </div>
                    <input
                      type="file"
                      name="uploadMedia"
                      id="uploadMedia"
                      style={{ display: "none" }}
                      onChange={handleAddMedia}
                    />
                    {/* <button
                      type="button"
                      className="btn btn-light btn--m btn--inline"
                    >
                      Chọn ảnh
                    </button> */}
                    <label
                      htmlFor="uploadMedia"
                      className="btn btn-light btn--m btn--inline"
                    >
                      Chọn Ảnh
                    </label>{" "}
                    <div className="L4SAGB">
                      <div className="SlaeTm">Dung lượng file tối đa 1 MB</div>

                      <div className="SlaeTm">Định dạng:.JPEG, .PNG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Cập Nhật Thông Tin"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="add_products" style={{ paddingLeft: 10 }}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Tên người dùng</td>
                  <td className="label1">
                    <input
                      type="text"
                      name="userName"
                      placeholder="Nhập vào"
                      value={changeInfor.userName}
                      onChange={handleChangeInput}
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
                  <td
                    className="label"
                    style={{ width: "50px", float: "right" }}
                  >
                    Số điện thoại
                  </td>
                  <td className="label1">
                    <input
                      type="text"
                      placeholder="Nhập vào"
                      name="phone"
                      value={changeInfor.phone}
                      onChange={handleChangeInput}
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
                  <td
                    className="label"
                    style={{ width: "50px", float: "right" }}
                  >
                    Giới tính
                  </td>
                  <td className="label1">
                    <input
                      type="text"
                      placeholder="Nhập vào"
                      name="gender"
                      value={changeInfor.gender}
                      onChange={handleChangeInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Địa chỉ</td>
                  <td className="label1">
                    <input
                      type="text"
                      name="address"
                      placeholder="Nhập vào"
                      value={changeInfor.address}
                      onChange={handleChangeInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button onClick={handleUpdate}>Lưu</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      </div>
      <Footer></Footer>
    </>
  );
}
