import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Home,
  Address,
  Register,
  AddAddress,
  UpdateAddress,
} from "../pages";
import { AuthGuard } from "../components/auth-guard";
import { ProtectedGuard } from "../components/protected-guard";
import { Layout } from "../components/layout";

export const routerItem = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ProtectedGuard>
        <Layout>
          <Login />
        </Layout>
      </ProtectedGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedGuard>
        <Layout>
          <Register />
        </Layout>
      </ProtectedGuard>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedGuard>
        <Layout>
          <Home />
        </Layout>
      </ProtectedGuard>
    ),
  },
  {
    path: "/address",
    element: (
      <AuthGuard>
        <Layout>
          <Address />
        </Layout>
      </AuthGuard>
    ),
  },
  {
    path: "/address/add",
    element: (
      <AuthGuard>
        <Layout>
          <AddAddress></AddAddress>
        </Layout>
      </AuthGuard>
    ),
  },
  {
    path: "/address/:id",
    element: (
      <AuthGuard>
        <Layout>
          <UpdateAddress></UpdateAddress>
        </Layout>
      </AuthGuard>
    ),
  },
]);
