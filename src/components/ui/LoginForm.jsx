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

export default function LoginForm({
  title,
  isAbleToRegister,
  loginHandler,
  isLoading = false,
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const Navigate = useNavigate();
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
            loginHandler(email, password);
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
