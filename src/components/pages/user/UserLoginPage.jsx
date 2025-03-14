import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../ui/LoginForm";

const UserLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <LoginForm
      title="User Login"
      isAbleToRegister={true}
      onSuccess={() => navigate("/dashboard")}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default UserLoginPage;
