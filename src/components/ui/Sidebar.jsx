import { useEffect, useState } from "react";
import {
  AiOutlineBell,
  AiOutlineCreditCard,
  AiOutlineLock,
  AiOutlineKey,
  AiOutlineDatabase,
  AiOutlineSafety,
  AiOutlineSetting,
  AiOutlineSwap,
  AiOutlineLogout,
  AiOutlineFile,
} from "react-icons/ai";
import { Code, Group } from "@mantine/core";
import classes from "./Sidebar.module.css";
import AuthStore from "../../store/AuthStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarSimpleColored() {
  const {
    logout,
    credentials: { role },
  } = AuthStore();
  const [data, setData] = useState([]);
  const [active, setActive] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let newData = [];
    if (role === "admin") {
      newData.push(
        {
          link: "manage-services",
          label: "Quản lý dịch vụ",
          icon: AiOutlineCreditCard,
        },
        {
          link: "manage-demands",
          label: "Quản lý nhu cầu",
          icon: AiOutlineSafety,
        }
      );
      setActive("Quản lý dịch vụ");
    } else {
      if (role === "provider") {
        newData.push(
          { link: "service", label: "Dịch vụ", icon: AiOutlineDatabase },
          {
            link: "applications",
            label: "Ứng tuyển nhu cầu",
            icon: AiOutlineCreditCard,
          }
        );
        setActive("Dịch vụ");
      } else {
        newData.push(
          { link: "demand", label: "Yêu cầu", icon: AiOutlineDatabase },
          {
            link: "rentals",
            label: "Dịch vụ đang thuê",
            icon: AiOutlineCreditCard,
          }
        );
        setActive("Yêu cầu");
      }
    }
    setData(newData);
    if (role != null) {
      navigate(`${newData[0].link}`);
    }
  }, [role]);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(`${item.link}`);
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} size={20} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between"></Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            logout();
            navigate("/auth/login");
          }}
        >
          <AiOutlineLogout className={classes.linkIcon} size={20} />
          <span>Đăng xuất</span>
        </a>
      </div>
    </nav>
  );
}
