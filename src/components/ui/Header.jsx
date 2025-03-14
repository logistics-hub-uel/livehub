import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Image,
  Text,
  Divider,
  Menu,
  UnstyledButton,
  HoverCard,
  SimpleGrid,
  ThemeIcon,
  rem,
  Flex,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  FaChevronDown,
  FaTools,
  FaPencilAlt,
  FaCamera,
  FaUsers,
  FaBriefcase,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import AuthStore from "../../store/AuthStore";
import classes from "./Header.module.css";

const serviceData = [
  {
    icon: FaTools,
    title: "Đội ngũ kỹ thuật",
    description: "Dịch vụ cung cấp các thiết bị hỗ trợ livestream",
    link: "/services/tech",
  },
  {
    icon: FaPencilAlt,
    title: "Đội ngũ sản xuất nội dung",
    description: "Dịch vụ hỗ trợ nội dung kịch bản cho livestream",
    link: "/services/content",
  },
  {
    icon: FaCamera,
    title: "Studio",
    description: "Dịch vụ hỗ trợ vị trí và thiết kế livestream theo yêu cầu",
    link: "/services/studio",
  },
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const credentials = AuthStore((state) => state.credentials);
  const navigate = useNavigate();

  const location = useLocation();

  const AuthButtons = () => {
    if (credentials.token) {
      return (
        <Group>
          <Text size="sm" c="dimmed">
            Xin chào,{" "}
            <Text size="sm" fw={500}>
              {credentials.full_name}
            </Text>
          </Text>

          <Badge>{credentials.role}</Badge>
          {!location.pathname.includes("dashboard") && (
            <Button component={Link} to="/dashboard" color="primary">
              Dashboard
            </Button>
          )}
        </Group>
      );
    }

    return (
      <Group>
        <Button
          component={Link}
          to="/auth/login"
          variant="outline"
          color="primary"
        >
          <FaSignInAlt style={{ marginRight: "0.5rem" }} />
          Đăng nhập
        </Button>
        <Button component={Link} to="/auth/register" color="secondary">
          <FaUserPlus style={{ marginRight: "0.5rem" }} />
          Đăng ký
        </Button>
      </Group>
    );
  };

  return (
    <Box>
      <Container size="xl">
        <header className={classes.header}>
          <Flex justify="space-between" align="center" w="100%">
            <Box component={Link} to="/" style={{ minWidth: "120px" }}>
              <Text size="xl" fw={700}>
                LiveHub
              </Text>
            </Box>

            <Flex justify="center" style={{ flex: 1 }} visibleFrom="sm">
              <Group h="100%" gap={20}>
                <Link to="/" className={classes.link}>
                  Trang chủ
                </Link>
                <Link to="/contact" className={classes.link}>
                  Liên hệ
                </Link>
              </Group>
            </Flex>

            <Group visibleFrom="sm" style={{ minWidth: "120px" }}>
              <AuthButtons />
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Flex>
        </header>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="LiveHub"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Divider my="sm" color="gray.1" />

        <Link to="/" className={classes.link} onClick={closeDrawer}>
          Trang chủ
        </Link>
        <Link to="/contact" className={classes.link} onClick={closeDrawer}>
          Liên hệ
        </Link>

        <Divider my="sm" color="gray.1" />

        <Group justify="center" grow pb="xl" px="md">
          <AuthButtons />
        </Group>
      </Drawer>
    </Box>
  );
}
