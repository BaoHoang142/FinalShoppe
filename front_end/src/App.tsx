import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ProfileUser from "./pages/profileUser/ProfileUser";
import OrderUser from "./pages/profileUser/OrderUser";
import ProductDetails from "./pages/productDetails/productDetails/ProductDetails";
import RegisterStore from "./pages/addStore/RegisterStore";
import AddStore from "./pages/addStore/AddStore";
import Cart from "./pages/cart/Cart";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import ShopAdmin from "./pages/admin/ShopAdmin";
import UserAmin from "./pages/admin/UserAmin";
import AddProducts from "./pages/shop/AddProducts";
import OrderDetail from "./pages/shop/OrderDetail";
import ShopProducts from "./pages/shop/ShopProducts";
import GirlFashion from "./pages/categories/GirlFashion";
import MenFashion from "./pages/categories/MenFashion";
import ShoesAndSandal from "./pages/categories/ShoesAndSandal";
import CategoryAdmin from "./pages/admin/CategoryAdmin";
import ResetPassword from "./pages/login/ResetPassword";
import NewPassword from "./pages/login/NewPassword";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/dangnhap" element={<Login></Login>}></Route>
        <Route path="/dangky" element={<Register></Register>}></Route>
        <Route path="/resetPassword" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="/newPassword" element={<NewPassword></NewPassword>}></Route>
        <Route path="/profile" element={<ProfileUser></ProfileUser>}></Route>
        <Route path="/donmua" element={<OrderUser></OrderUser>}></Route>
        <Route
          path="/dangky-cuahang"
          element={<RegisterStore></RegisterStore>}
        ></Route>
        <Route path="/them-cuahang" element={<AddStore></AddStore>}></Route>
        <Route
          path="/chitiet/:id"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/admin/products" element={<ProductsAdmin />} />
        <Route path="/admin/categories" element={<CategoryAdmin />} />
        <Route path="/admin/shop" element={<ShopAdmin />} />
        <Route path="/admin/users" element={<UserAmin />} />
        <Route path="/themsanpham" element={<AddProducts />} />
        <Route path="/order" element={<OrderDetail />} />
        <Route path="/danhsachsanpham" element={<ShopProducts />} />
        <Route path="/categories/3" element={<GirlFashion />} />
        <Route path="/categories/1" element={<MenFashion />} />
        <Route path="/categories/6" element={<ShoesAndSandal />} />
      </Routes>
    </div>
  );
}
