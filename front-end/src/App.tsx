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
import { useUserStore } from "./store";
import axios from "axios";
import UsersPage from "./pages/admin-page/users-page";
import CategoriesPage from "./pages/admin-page/categories-page";
import ProductsPage from "./pages/admin-page/products-page";
import BlogsPage from "./pages/admin-page/blogs-page";
import OneUserPage from "./pages/admin-page/oneUser-page";
import { Toaster } from "sonner";
import { SERVER_API } from "../config";
import callManager from "./hooks/callManager";
import OneCategoryPage from "./pages/admin-page/oneCategory-page";
import OneProductPage from "./pages/admin-page/oneProduct-page";
import VerifyPage from "./pages/verify-page";
import VerifyRoute from "./components/private-route-components/verifyRoute";
import PassRestorePage from "./pages/passRestore-page";
import PassRestoreRoute from "./components/private-route-components/passRestoreRoute";
import PassRestoreFormPage from "./pages/passRestoreForm-page";
import useLoadUser from "./hooks/useLoadUser";
import PropertiesPage from "./pages/admin-page/properties-page";
import OnePropertyPage from "./pages/admin-page/oneProperty-page";
import PropertyvalsPage from "./pages/admin-page/propertyvals-page";
import OnePropertyvalPage from "./pages/admin-page/onePropertyval-page";
import BannersPage from "./pages/admin-page/banners-page";
import TrustsPage from "./pages/admin-page/trusts-page";
import { handleGoUp } from "./helpers/handleGoUp";

function App() {
  const { user, userLoading, getAuthedUser } = useLoadUser();

  const location = useLocation(); // Detects route changes
  useEffect(() => {
    axios.defaults.withCredentials = true; //sends httponly cookies to the server by default
  }, []);
  useEffect(() => {
    getAuthedUser(); //if token exist , set the user
    handleGoUp("instant");
  }, [location.pathname]);

  if (userLoading) return <p>Loading defaults...</p>; //waiting to read some values from server
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/single-shop/:productId" element={<SingleShopPage />} />
        <Route path="/shop/:categoryId" element={<ShopPage />} />
        <Route path="/single-archive" element={<SingleArchivePage />} />
        <Route path="/archive/:categoryId" element={<ArchivePage />} />
        <Route element={<VerifyRoute user={user} />}>
          <Route path="/verify" element={<VerifyPage />} />
        </Route>
        <Route element={<PassRestoreRoute user={user} />}>
          <Route path="/pass-restore" element={<PassRestorePage />} />
          <Route
            path="/pass-restore-form/:token"
            element={<PassRestoreFormPage />}
          />
        </Route>
        <Route element={<AdminRoute user={user} />}>
          <Route path="/admin/page/banners" element={<BannersPage />} />
          <Route path="/admin/page/trusts" element={<TrustsPage />} />
          <Route path="/admin/properties" element={<PropertiesPage />} />
          <Route path="/admin/update-property" element={<OnePropertyPage />} />
          <Route path="/admin/propertyvals" element={<PropertyvalsPage />} />
          <Route
            path="/admin/update-propertyval"
            element={<OnePropertyvalPage />}
          />
          <Route path="/admin/blogs" element={<BlogsPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/admin/update-product" element={<OneProductPage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/update-category" element={<OneCategoryPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/update-user" element={<OneUserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<UserRoute user={user} />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route element={<CartRoute user={user} />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route element={<AuthRoute user={user} />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
