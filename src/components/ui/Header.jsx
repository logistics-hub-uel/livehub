import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  FaChevronDown, 
  FaTools, 
  FaPencilAlt, 
  FaCamera, 
  FaUsers, 
  FaBriefcase, 
  FaInfoCircle, 
  FaSignInAlt, 
  FaUserPlus 
} from 'react-icons/fa';
import AuthStore from '../../store/AuthStore';
import classes from "./Header.module.css";

const serviceData = [
  {
    icon: FaTools,
    title: 'Đội ngũ kỹ thuật',
    description: 'Dịch vụ cung cấp các thiết bị hỗ trợ livestream',
    link: '/services/tech',
  },
  {
    icon: FaPencilAlt,
    title: 'Đội ngũ sản xuất nội dung',
    description: 'Dịch vụ hỗ trợ nội dung kịch bản cho livestream',
    link: '/services/content',
  },
  {
    icon: FaCamera,
    title: 'Studio',
    description: 'Dịch vụ hỗ trợ vị trí và thiết kế livestream theo yêu cầu',
    link: '/services/studio',
  },
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const credentials = AuthStore((state) => state.credentials);
  const navigate = useNavigate();

  const ServiceMenu = () => (
    <Menu trigger="hover" position="bottom-start" withinPortal offset={0}>
      <Menu.Target>
        <UnstyledButton className={classes.link}>
          <Group gap={7}>
            <Text>Dịch vụ</Text>
            <FaChevronDown size="0.8rem" />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {serviceData.map((service) => (
          <Menu.Item
            key={service.title}
            leftSection={
              <ThemeIcon size={rem(40)} radius="md" color="primary">
                <service.icon size="1.2rem" />
              </ThemeIcon>
            }
            component={Link}
            to={service.link}
          >
            <Box>
              <Text fw={500}>{service.title}</Text>
              <Text size="xs" c="dimmed">{service.description}</Text>
            </Box>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );

  const AuthButtons = () => {
    if (credentials.token) {
      return (
        <Group>
          <Button
            component={Link}
            to="/dashboard"
            color="primary"
          >
            Dashboard
          </Button>
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
          <FaSignInAlt style={{ marginRight: '0.5rem' }} />
          Đăng nhập
        </Button>
        <Button
          component={Link}
          to="/auth/register"
          color="secondary"
        >
          <FaUserPlus style={{ marginRight: '0.5rem' }} />
          Đăng ký
        </Button>
      </Group>
    );
  };

  const AboutMenu = () => (
    <HoverCard width={280} position="bottom" radius="md" shadow="md" withinPortal>
      <HoverCard.Target>
        <UnstyledButton className={classes.link}>
          <Group gap={7}>
            <Text>Về chúng tôi</Text>
            <FaChevronDown size="0.8rem" />
          </Group>
        </UnstyledButton>
      </HoverCard.Target>

      <HoverCard.Dropdown>
        <SimpleGrid cols={1} spacing={5}>
          <UnstyledButton 
            className={classes.subLink} 
            component={Link} 
            to="/about"
          >
            <Group wrap="nowrap" align="flex-start">
              <ThemeIcon size={34} radius="md" color="primary.3">
                <FaInfoCircle size="1.2rem" />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={500}>
                  Giới thiệu
                </Text>
                <Text size="xs" c="dimmed">
                  Tìm hiểu về LiveHub và sứ mệnh của chúng tôi
                </Text>
              </div>
            </Group>
          </UnstyledButton>

          <UnstyledButton 
            className={classes.subLink} 
            component={Link} 
            to="/careers"
          >
            <Group wrap="nowrap" align="flex-start">
              <ThemeIcon size={34} radius="md" color="primary.3">
                <FaBriefcase size="1.2rem" />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={500}>
                  Tuyển dụng
                </Text>
                <Text size="xs" c="dimmed">
                  Xem các vị trí đang tuyển dụng tại LiveHub
                </Text>
              </div>
            </Group>
          </UnstyledButton>

          <UnstyledButton 
            className={classes.subLink} 
            component={Link} 
            to="/partners"
          >
            <Group wrap="nowrap" align="flex-start">
              <ThemeIcon size={34} radius="md" color="primary.3">
                <FaUsers size="1.2rem" />
              </ThemeIcon>
              <div>
                <Text size="sm" fw={500}>
                  Đối tác
                </Text>
                <Text size="xs" c="dimmed">
                  Các đối tác của chúng tôi
                </Text>
              </div>
            </Group>
          </UnstyledButton>
        </SimpleGrid>
      </HoverCard.Dropdown>
    </HoverCard>
  );

  return (
    <Box>
      <Container size="xl">
        <header className={classes.header}>
          <Flex justify="space-between" align="center" w="100%">
            <Box component={Link} to="/" style={{ minWidth: '120px' }}>
              <Text size="xl" fw={700}>LiveHub</Text>
            </Box>

            <Flex justify="center" style={{ flex: 1 }} visibleFrom="sm">
              <Group h="100%" gap={20}>
                <Link to="/" className={classes.link}>
                  Trang chủ
                </Link>
                <ServiceMenu />
                <AboutMenu />
                <Link to="/contact" className={classes.link}>
                  Liên hệ
                </Link>
              </Group>
            </Flex>

            <Group visibleFrom="sm" style={{ minWidth: '120px' }}>
              <AuthButtons />
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
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
        <UnstyledButton className={classes.link} onClick={toggleDrawer}>
          <Group gap={7}>
            <Text>Dịch vụ</Text>
            <FaChevronDown size="0.8rem" />
          </Group>
        </UnstyledButton>
        {serviceData.map((service) => (
          <Link key={service.title} to={service.link} className={classes.linkMobile} onClick={closeDrawer}>
            - {service.title}
          </Link>
        ))}
        <UnstyledButton className={classes.link} onClick={toggleDrawer}>
          <Group gap={7}>
            <Text>Về chúng tôi</Text>
            <FaChevronDown size="0.8rem" />
          </Group>
        </UnstyledButton>
        <Link to="/about" className={classes.linkMobile} onClick={closeDrawer}>
          - Giới thiệu
        </Link>
        <Link to="/careers" className={classes.linkMobile} onClick={closeDrawer}>
          - Tuyển dụng
        </Link>
        <Link to="/partners" className={classes.linkMobile} onClick={closeDrawer}>
          - Đối tác
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
