import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Text, Group, Button, TextInput, Textarea, Box, Stack } from '@mantine/core';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box component="footer" style={{ backgroundColor: 'var(--mantine-color-primary-6)', color: 'white', padding: '3rem 0' }}>
      <Container size="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack spacing="md">
              <Text fz="xl" fw={700}>Thông tin LiveHub</Text>
              
              <Stack spacing="xs">
                <Group gap="xs" align="flex-start" noWrap>
                  <Box pt={4}><FaMapMarkerAlt size="1rem" /></Box>
                  <Text>Địa chỉ: 123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</Text>
                </Group>
              </Stack>
              
              <Text fw={600}>Số điện thoại</Text>
              <Stack spacing="xs">
                <Group gap="xs" noWrap>
                  <FaPhone size="1rem" />
                  <Text>Hotline: 1900 1234</Text>
                </Group>
                <Group gap="xs" noWrap>
                  <FaPhone size="1rem" />
                  <Text>Kinh doanh: 028 1234 5678</Text>
                </Group>
                <Group gap="xs" noWrap>
                  <FaEnvelope size="1rem" />
                  <Text>Email: contact@livehub.vn</Text>
                </Group>
              </Stack>
              
              <Text fw={600}>Giờ làm việc</Text>
              <Stack spacing="xs">
                <Group gap="xs" noWrap>
                  <FaClock size="1rem" />
                  <Text>Thứ 2 - Thứ 6: 8:00 - 17:30</Text>
                </Group>
                <Group gap="xs" noWrap>
                  <FaClock size="1rem" />
                  <Text>Thứ 7 - Chủ nhật: 8:00 - 12:00</Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack spacing="md">
              <Text fz="xl" fw={700}>Dịch vụ</Text>
              
              <Stack spacing="sm">
                <Link to="/services/tech" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Đội ngũ kỹ thuật</Text>
                </Link>
                <Link to="/services/content" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Đội ngũ sản xuất nội dung</Text>
                </Link>
                <Link to="/services/studio" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Studio</Text>
                </Link>
              </Stack>
              
              <Text fz="xl" fw={700} mt="lg">Theo dõi chúng tôi</Text>
              <Group>
                <Button variant="subtle" color="white" p={0} style={{ fontSize: '1.5rem' }}>
                  <FaFacebook />
                </Button>
                <Button variant="subtle" color="white" p={0} style={{ fontSize: '1.5rem' }}>
                  <FaTwitter />
                </Button>
                <Button variant="subtle" color="white" p={0} style={{ fontSize: '1.5rem' }}>
                  <FaInstagram />
                </Button>
                <Button variant="subtle" color="white" p={0} style={{ fontSize: '1.5rem' }}>
                  <FaYoutube />
                </Button>
                <Button variant="subtle" color="white" p={0} style={{ fontSize: '1.5rem' }}>
                  <FaLinkedin />
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack spacing="md">
              <Text fz="xl" fw={700}>Liên kết nhanh</Text>
              
              <Stack spacing="sm">
                <Link to="/auth/register" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Đăng ký cung cấp dịch vụ</Text>
                </Link>
                <Link to="/auth/register" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Đăng ký tìm dịch vụ</Text>
                </Link>
                <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Về chúng tôi</Text>
                </Link>
                <Link to="/careers" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Tuyển dụng</Text>
                </Link>
                <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Liên hệ</Text>
                </Link>
                <Link to="/privacy" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Chính sách bảo mật</Text>
                </Link>
                <Link to="/terms" style={{ color: 'white', textDecoration: 'none' }}>
                  <Text>Điều khoản sử dụng</Text>
                </Link>
              </Stack>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Stack spacing="md">
              <Text fz="xl" fw={700}>Liên hệ với chúng tôi</Text>
              
              <form>
                <Stack spacing="sm">
                  <TextInput
                    placeholder="Họ và tên"
                    styles={{ input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' } }}
                  />
                  <TextInput
                    placeholder="Email"
                    styles={{ input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' } }}
                  />
                  <TextInput
                    placeholder="Số điện thoại"
                    styles={{ input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' } }}
                  />
                  <Textarea
                    placeholder="Nội dung"
                    minRows={3}
                    styles={{ input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none' } }}
                  />
                  <Button 
                    fullWidth
                    color="secondary"
                  >
                    Gửi tin nhắn
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Grid.Col>
        </Grid>

        <Box mt="2xl" pt="md" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Text ta="center">© {new Date().getFullYear()} LiveHub. Tất cả các quyền được bảo lưu.</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
