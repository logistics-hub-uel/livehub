import React, { useTransition } from "react";
import RegisterForm from "../../ui/RegisterForm";
import AuthStore from "../../../store/AuthStore";
import { BuyerRegister, SupplierRegister } from "../../../services/AuthService";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const UserRegisterPage = () => {
  const { register } = AuthStore();
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const registerHandler = async (userData, accountType) => {
    startTransition(async () => {
      try {
        if (accountType === "supplier") {
          await SupplierRegister(userData);
        } else {
          await BuyerRegister(userData);
        }
        notifications.show({
          title: "Đăng ký thành công ✅",
          message: "Vui lòng đăng nhập để tiếp tục",
          color: "green",
          autoClose: 2000,
        });
        navigate("/auth/login");
      } catch (error) {
        notifications.show({
          title: "Đăng ký thất bại",
          message: error.message || "Có lỗi xảy ra khi đăng ký tài khoản",
          color: "red",
        });
      }
    });
  };

  return (
    <div className="min-h-screen items-center justify-center flex">
      <RegisterForm
        title={"Đăng ký tài khoản"}
        isLoading={isPending}
        isAbleToLogin={true}
        registerHandler={registerHandler}
      />
    </div>
  );
};

export default UserRegisterPage;
