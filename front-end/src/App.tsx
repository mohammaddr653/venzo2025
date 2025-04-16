import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home-page";
import UserPage from "./pages/user-page";
import AdminPage from "./pages/admin-page/admin-page";
import ArchivePage from "./pages/archive-page";
import SingleArchivePage from "./pages/single-archive-page";
import ShopPage from "./pages/shop-page";
import SingleShopPage from "./pages/single-shop-page";
import CartPage from "./pages/cart-page";
import AuthRoute from "./components/private-route-components/authRoute";
import CartRoute from "./components/private-route-components/cartRoute";
import UserRoute from "./components/private-route-components/userRoute";
import AdminRoute from "./components/private-route-components/adminRoute";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import { useEffect } from "react";
import { getMe } from "./helpers/getMe";
import { useUserStore } from "./store";
import axios from "axios";
import UsersPage from "./pages/admin-page/users-page";
import CategoriesPage from "./pages/admin-page/categories-page";
import ProductsPage from "./pages/admin-page/products-page";
import BlogsPage from "./pages/admin-page/blogs-page";
import OneUserPage from "./pages/admin-page/oneUser-page";

function App() {
  const { user, userLoading, setUserLoading, setUser } = useUserStore();
  const location = useLocation(); // Detects route changes
  useEffect(() => {
    axios.defaults.withCredentials = true; //sends httponly cookies to the server by default
  }, []);
  useEffect(() => {
    getAuthedUser(); //if token exist , set the user
  }, [location.pathname]);

  async function getAuthedUser() {
    try {
      const response = await getMe();
      const me = response.data?.data?.user;
      me ? setUser(me) : setUser(null);
      setUserLoading(false);
    } catch (error: any) {
      setUser(null);
      setUserLoading(false);
    }
  }

  if (userLoading) return <p>Loading defaults...</p>; //waiting to read some values from server
  return (
    <Routes>
      <Route path="/single-shop" element={<SingleShopPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/single-archive" element={<SingleArchivePage />} />
      <Route path="/archive" element={<ArchivePage />} />
      <Route element={<AdminRoute user={user} />}>
        <Route path="/admin/blogs" element={<BlogsPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/update-user" element={<OneUserPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route element={<UserRoute user={user} />}>
        <Route path="/user" element={<UserPage />} />
      </Route>
      <Route element={<CartRoute />}>
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route element={<AuthRoute user={user} />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
