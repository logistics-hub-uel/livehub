import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Container, 
  Text, 
  Box, 
  TextInput, 
  PasswordInput, 
  Button, 
  Checkbox, 
  Group, 
  Divider, 
  Title, 
  Paper,
} from "@mantine/core";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import AuthStore from "../../../store/AuthStore";

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = AuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py={80}>
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Title order={2} ta="center" mb="lg">Đăng nhập</Title>
        
        {error && (
          <Text color="red" ta="center" mb="md">
            {error}
          </Text>
        )}
        
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            required
            mb="md"
            leftSection={<FaEnvelope />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <PasswordInput
            label="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            required
            mb="md"
            leftSection={<FaLock />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Group position="apart" mb="lg">
            <Checkbox label="Ghi nhớ đăng nhập" />
            <Text component={Link} to="/auth/forgot-password" size="sm" color="primary">
              Quên mật khẩu?
            </Text>
          </Group>
          
          <Button 
            type="submit" 
            fullWidth 
            loading={loading}
            leftSection={<FaSignInAlt />}
            color="primary"
          >
            Đăng nhập
          </Button>
        </form>
        
        <Divider label="Hoặc" labelPosition="center" my="lg" />
        
        <Text ta="center">
          Bạn chưa có tài khoản?{" "}
          <Text 
            component={Link} 
            to="/auth/register" 
            variant="link" 
            color="primary"
          >
            Đăng ký ngay
          </Text>
        </Text>
      </Paper>
    </Container>
  );
};

export default UserLoginPage;
