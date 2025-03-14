import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  LoadingOverlay,
  Radio,
  Group,
  Stack,
  SimpleGrid,
  Box,
} from "@mantine/core";
import classes from "./LoginForm.module.css";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({
  title,
  isAbleToLogin,
  registerHandler,
  isLoading = false,
}) {
  const [accountType, setAccountType] = useState("buyer");

  const form = useForm({
    mode: "onBlur",
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      tax_number: "",
      address: {
        street: "",
        city: "",
        province: "",
      },
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
      phone_number: (value) =>
        /^\d{10,11}$/.test(value) ? null : "Số điện thoại không hợp lệ",
      password: (value) =>
        value.length >= 6 ? null : "Mật khẩu phải có ít nhất 6 kí tự",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Mật khẩu không khớp",
    },
  });

  const handleSubmit = (values) => {
    const userData = {
      full_name: values.full_name,
      email: values.email,
      phone_number: values.phone_number,
      password: values.password,
      address: values.address,
    };

    if (accountType === "supplier") {
      userData.tax_number = values.tax_number;
    }

    registerHandler(userData, accountType);
  };

  const navigate = useNavigate();

  return (
    <Box px="md" py={40} className="w-full max-w-[1400px] mx-auto">
      <Title ta="center" className={classes.title}>
        {title}
      </Title>
      {isAbleToLogin && (
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Đã có tài khoản?{" "}
          <Anchor
            size="sm"
            component="button"
            disabled={isLoading}
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Đăng nhập
          </Anchor>
        </Text>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos="relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />

        <Radio.Group
          label="Loại tài khoản"
          value={accountType}
          onChange={setAccountType}
          name="accountType"
          mb="md"
        >
          <Group mt="xs">
            <Radio value="buyer" label="Người mua" />
            <Radio value="supplier" label="Nhà cung cấp" />
          </Group>
        </Radio.Group>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md">
            <TextInput
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              required
              {...form.getInputProps("full_name")}
              disabled={isLoading}
            />

            <TextInput
              label="Email"
              placeholder="example@gmail.com"
              required
              {...form.getInputProps("email")}
              disabled={isLoading}
            />

            <TextInput
              label="Số điện thoại"
              placeholder="0912345678"
              required
              {...form.getInputProps("phone_number")}
              disabled={isLoading}
            />

            {accountType === "supplier" && (
              <TextInput
                label="Mã số thuế"
                placeholder="Mã số thuế doanh nghiệp"
                {...form.getInputProps("tax_number")}
                disabled={isLoading}
              />
            )}
          </SimpleGrid>

          <Text fw={500} size="sm" mt="xl" mb="md">
            Địa chỉ
          </Text>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            <TextInput
              placeholder="Số nhà, đường"
              label="Đường"
              {...form.getInputProps("address.street")}
              disabled={isLoading}
            />
            <TextInput
              placeholder="Quận/Huyện"
              label="Quận/Huyện"
              {...form.getInputProps("address.district")}
              disabled={isLoading}
            />
            <TextInput
              placeholder="Tỉnh/Thành phố"
              label="Tỉnh/Thành phố"
              {...form.getInputProps("address.city")}
              disabled={isLoading}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mt="xl">
            <PasswordInput
              label="Mật khẩu"
              placeholder="Tối thiểu 6 kí tự"
              required
              {...form.getInputProps("password")}
              disabled={isLoading}
            />

            <PasswordInput
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              required
              {...form.getInputProps("confirmPassword")}
              disabled={isLoading}
            />
          </SimpleGrid>

          <Button
            type="submit"
            fullWidth
            mt="xl"
            loading={isLoading}
            disabled={isLoading}
            size="md"
          >
            Đăng ký
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
