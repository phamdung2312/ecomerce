import LayoutPayment from "../componet/LayoutPayment/LayoutPayment";
import AdminPage from "../Page/Admin/AdminPage/AdminPage";
import OrderDetailAdmin from "../Page/Admin/OrderDetailAdmin/OrderDetailAdmin";
import ForgotPassword from "../Page/ForgotPassword/ForgotPassword";
import HomePage from "../Page/HomePage/HomePage";
import MyOrderPage from "../Page/MyOrderPage/MyOrderPage";
import NotFoundPgae from "../Page/NotFoundPage/NotFoundPgae";
import OrderDetailPage from "../Page/OrderDetailPage/OrderDetailPage";
import OrderPage from "../Page/OrderPage/OrderPage";
import OrderSuccessPage from "../Page/OrderSuccessPage/OrderSuccessPage";
import PaymentPage from "../Page/PaymentPage/PaymentPage";
import ProductDetailsPage from "../Page/ProductDetailsPage/ProductDetailsPage";
import ProductPage from "../Page/ProductPage/ProductPage";
import ResetPassword from "../Page/ResetPassword/ResetPassword";
import SignInpage from "../Page/SignInPage/SignInpage";
import SignUpPage from "../Page/SignUpPage/SignUpPage";
import TypeProductPage from "../Page/TypeProductPage/TypeProductPage";
import ProfilePage from "../Page/UpdatePage/ProfilePage";

export const counters = [
  { path: "/", page: HomePage, isShowHeader: true },
  { path: "/order", page: OrderPage, isShowHeader: true },
  { path: "/product/:type", page: TypeProductPage, isShowHeader: true },
  { path: "/sign-up", page: SignUpPage, isShowHeader: false },
  { path: "/update", page: ProfilePage, isShowHeader: true },
  { path: "/sign-in", page: SignInpage, isShowHeader: false },
  { path: "/products", page: ProductPage, isShowHeader: true },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: false,
  },
  {
    path: "/order-success",
    page: OrderSuccessPage,
    isShowHeader: false,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/order-detail/:id",
    page: OrderDetailPage,
    isShowHeader: true,
  },
  {
    path: "/order-detail-admin/:id",
    page: OrderDetailAdmin,
    isShowHeader: true,
  },
  {
    path: "/forgot-password",
    page: ForgotPassword,
    isShowHeader: false,
  },
  {
    path: "/reset-password/:id/:token",
    page: ResetPassword,
    isShowHeader: false,
  },
  { path: "/sign-in", page: SignInpage, isShowHeader: true },
  { path: "*", page: NotFoundPgae, isShowHeader: false },
];
