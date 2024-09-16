import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from "./contexts/ThemeContext";
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isHeaderFixed, setHeaderFixed] = useState(true);
  const [activeButton, setActiveButton] = useState("fixed");
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  const toggleWidget = () => setIsWidgetOpen(!isWidgetOpen);
  const { theme, switchTheme } = useTheme();
  
  let toggleHeaderFixed = () => {
    setHeaderFixed(true);
    setActiveButton("fixed");
  }

  let toggleHeaderStatic = () => {
    setHeaderFixed(false);
    setActiveButton("static");
  }
  

  return (
    <div className="relative flex flex-col overflow-hidden bg-white">
      {/* Button to open the widget */}
      <button
        className={`fixed ${
          isWidgetOpen ? " top-[300px] left-[252px] " : " top-[300px] left-0"
        } z-50 p-2 w-11 h-11 bg-black text-white rounded-full shadow`}
        onClick={toggleWidget}
      >
            <SettingsIcon />

      </button>

      {/* Widget */}
      <div
        className={`fixed top-[192px] left-0 h-64 w-64 bg-white rounded-tr-[40%] rounded-br-[40%] text-black transform ${
          isWidgetOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        
        <div className="p-4 relative top-8">
        <div className="fixed bottom-20 p-2 bg-white shadow-lg rounded-lg">
      <button onClick={() => switchTheme('bg-blue-600')} className="p-2 bg-blue-500 text-white rounded mr-2">Blue</button>
      <button onClick={() => switchTheme('bg-pink-600')} className="p-2 bg-pink-500 text-white rounded mr-2">Pink</button>
      <button onClick={() => switchTheme('bg-green-600')} className="p-2 bg-green-500 text-white rounded">Green</button>
    </div>

          <div className="flex space-x-2">
          <h4 className="text-lg font-semibold	">Header</h4>
          <div className="flex justify-between bg-gray-500 w-[120px] rounded-md">
            
            <button   className={`w-14 rounded-md ${activeButton === "fixed" ? "bg-black  text-white " : "bg-gray-400"}`} onClick={toggleHeaderFixed}>Fixed</button>
            <button className={`w-14 rounded-md ${activeButton === "static" ? "bg-black  text-white " : "bg-gray-400"}`}onClick={toggleHeaderStatic}>Static</button>
          </div>

          </div>
         
        </div>
      </div>

      {/* Overlay to hide content */}
      {isWidgetOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleWidget}
        ></div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isWidgetOpen ? "overflow-hidden" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user} />
            }
          />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout isHeaderFixed={isHeaderFixed}/>
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
          </Route>
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

