import { BankTwoTone, HomeTwoTone, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import services from "../../services";

const Header = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("h");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const onLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const hasLoggedIn = services.voo.getHasValidAuth();

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="h" icon={<HomeTwoTone />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="r" icon={<BankTwoTone />}>
          <Link to="/compras">Minhas compras</Link>
        </Menu.Item>
        {hasLoggedIn && (
          <Menu.Item key="r" icon={<LogoutOutlined />}>
            <button
              style={{
                backgroundColor: "#646cff",
                color: "white",
                cursor: "pointer",
              }}
              onClick={onLogout}
            >
              DESLOGAR
            </button>{" "}
          </Menu.Item>
        )}
      </Menu>
      <Outlet />
    </>
  );
};
export default Header;
