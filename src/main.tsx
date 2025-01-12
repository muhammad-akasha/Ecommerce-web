import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./themeprovider/themeprovider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoPage from "./pages/NoPage.tsx";
import Home from "./pages/Home.tsx";
import AddProduct from "./pages/AddProducts.tsx";
import MyProduct from "./pages/MyProducts.tsx";
import Layout from "./Layout.tsx";
import Profile from "./pages/Profile.tsx";
import { Login } from "./pages/Login.tsx";
import { SignUp } from "./pages/Signup.tsx";
import { LoginUserProvider } from "./context/userContext.auth.tsx";
import SingleProduct from "./pages/SingleProduct.tsx";
import Order from "./pages/Order.tsx";
import EditAd from "./pages/EditAd.tsx";
import { HomeProductsProvider } from "./context/HomePageProduct.context.tsx";
import { UserProductsProvider } from "./context/UserProducts.Context.tsx";
import { SingleProductProvider } from "./context/SingleProduct.Context.tsx";
import { CartProvider } from "./context/Cart.context.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "myproduct",
        element: <MyProduct />,
      },
      {
        path: "updateprofile",
        element: <Profile />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "edit/:id",
        element: <EditAd />,
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        <SingleProductProvider>
          <UserProductsProvider>
            <HomeProductsProvider>
              <LoginUserProvider>
                <RouterProvider router={route} />
              </LoginUserProvider>
            </HomeProductsProvider>
          </UserProductsProvider>
        </SingleProductProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
