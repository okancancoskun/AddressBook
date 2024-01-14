import { Menubar } from "primereact/menubar";
import { PropsWithChildren } from "react";
import { Button } from "primereact/button";
import { logout } from "../store/auth.store";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "primereact/menuitem";
export const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/");
  };
  const navItems: MenuItem[] = [
    {
      label: "Home",
      url: "/",
      icon: "pi pi-home",
      visible: !user ? true : false,
    },
    {
      label: "Add new Address",
      visible: user ? true : false,
      template: (
        <Button
          label="Add New Address"
          icon="pi pi-plus"
          onClick={() => navigate("/address/add")}
          style={{ marginLeft: "4px" }}
        />
      ),
    },

    {
      label: "My Addresses",
      url: "/address",
      visible: user ? true : false,
    },
  ];
  const endItems = (
    <>
      {user ? (
        <Button
          label="Logout"
          icon="pi pi-power-off"
          onClick={() => handleLogout()}
          style={{ marginLeft: "4px" }}
        />
      ) : null}
    </>
  );
  return (
    <div>
      <Menubar model={navItems} end={endItems}></Menubar>
      <div className="container">{children}</div>
    </div>
  );
};
