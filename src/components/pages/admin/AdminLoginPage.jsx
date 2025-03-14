import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../ui/LoginForm";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <LoginForm
      title="Quản trị viên đăng nhập"
      isAbleToRegister={false}
      onSuccess={() => navigate("/admin/dashboard")}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default AdminLoginPage;
