import { BankTwoTone, HomeTwoTone } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("h");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="h" icon={<HomeTwoTone />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="r" icon={<BankTwoTone />}>
          <Link to="/compras">Minhas compras</Link>
        </Menu.Item>
      </Menu>
      <Outlet />
    </>
  );
};
export default Header;
