import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import classes from "./LoginForm.module.css";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { AuthLogin } from "../../services/AuthService";
import { parseJwtPayload } from "../../utils/JWTHelper";
import AuthStore from "../../store/AuthStore";

export default function LoginForm({
  title,
  isAbleToRegister,
  onSuccess,
  isLoading = false,
  setIsLoading,
}) {
  const setCredentials = AuthStore((state) => state.setCredentials);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const Navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await AuthLogin(email, password);
      if (response.status === 200) {
        const { access_token } = response.data.data;
        const payload = parseJwtPayload(access_token);
        setCredentials({
          token: access_token,
          role: payload.role,
          full_name: payload.full_name,
          email: payload.email,
          user_id: payload.user_id,
        });
        onSuccess();
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        {title}
      </Title>
      {isAbleToRegister && (
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Chưa có tài khoản?
          <Anchor
            onClick={() => {
              Navigate("/auth/register");
            }}
            size="sm"
            component="button"
            disabled={isLoading}
          >
            Tạo tài khoản
          </Anchor>
        </Text>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos="relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <TextInput
          label="Email"
          placeholder="nva@gmail.dev"
          required
          key={form.key("email")}
          {...form.getInputProps("email")}
          disabled={isLoading}
        />
        <PasswordInput
          label="Mật khẩu"
          key={form.key("password")}
          {...form.getInputProps("password")}
          placeholder="Mật khẩu bạn đã tạo"
          required
          mt="md"
          disabled={isLoading}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Lưu đăng nhập" disabled={isLoading} />
          <Anchor component="button" size="sm" disabled={isLoading}>
            Quên mật khẩu?
          </Anchor>
        </Group>
        <Button
          onClick={() => {
            let { email, password } = form.getValues();
            handleLogin(email, password);
          }}
          fullWidth
          mt="xl"
          loading={isLoading}
          disabled={isLoading}
        >
          Đăng nhập
        </Button>
      </Paper>
    </Container>
  );
}
