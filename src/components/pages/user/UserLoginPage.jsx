import React, { useTransition } from "react";
import LoginForm from "../../ui/LoginForm";
import AuthStore from "../../../store/AuthStore";
import { notifications, showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const UserLoginPage = () => {
  const {
    login,
    credentials: { role },
  } = AuthStore();
  const [isPending, startTransition] = useTransition();
  // Form data
  const navigate = useNavigate();
  const formData = {
    email: "",
    password: "",
  };

  const loginHandler = async (email, password) => {
    startTransition(async () => {
      try {
        await login(email, password);
        // Redirect to admin page if user is admin
        if (role === "admin") {
          notifications.show({
            title: "Đăng nhập thành công ✅",
            message: "Chuyển hướng đến trang quản trị...",
            color: "green",
            autoClose: 2000,
          });
          navigate("/admin");
        } else {
          showNotification({
            title: "Đăng nhập thành công ✅",
            message: "Chuyển hướng đến trang chính...",
            color: "blue",
            autoClose: 2000,
          });
          navigate("/");
        }
      } catch (error) {
        alert(error);
        notifications.show({
          title: "Đăng nhập thất bại",
          message: "Mật khẩu hoặc tài khoản không đúng",
          color: "red",
        });
      }
    });
  };
  return (
    <div className="h-screen items-center justify-center flex">
      <LoginForm
        title={"Đăng nhập"}
        isLoading={isPending}
        isAbleToRegister={true}
        loginHandler={loginHandler}
      />
    </div>
  );
};

export default UserLoginPage;
