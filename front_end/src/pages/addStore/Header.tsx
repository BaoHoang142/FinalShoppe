import "./Store.css";
import logo from "../../assets/ShopeeLogo.png";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div id="headerRegisterStore">
        <div className="headerRegisterStore__logo">
          <NavLink to={"/"} className="headerRegisterStore__logo--img" >
            <img src={logo} alt="" />
          </NavLink>
          <div className="headerRegisterStore__logo--text">
            <p>Đăng ký trở thành người bán Shoppe</p>
          </div>
        </div>
        <div className="headerRegisterStore__userName">
          {/* <div className="headerRegisterStore__userName--avatar">
            <span className="headerRegisterStore__userName--avatar--text">
              <img
                src={logo}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginLeft: "-7px",
                }}
                alt=""
              />
            </span>
          </div> */}
          <div>{/* <p>Kingsman</p> */}</div>
        </div>
      </div>
    </>
  );
}
