import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Text, 
  Title, 
  Grid, 
  Card, 
  Image, 
  Group,
  ThemeIcon,
  SimpleGrid,
  Center,
} from '@mantine/core';
import { 
  FaNetworkWired, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaDollarSign,
  FaTools,
  FaPencilAlt,
  FaCamera,
  FaBuilding
} from 'react-icons/fa';

const services = [
  {
    icon: FaTools,
    title: 'Đội ngũ kỹ thuật',
    description: 'Dịch vụ cung cấp các thiết bị hỗ trợ livestream',
    link: '/services/tech'
  },
  {
    icon: FaPencilAlt,
    title: 'Đội ngũ sản xuất nội dung',
    description: 'Dịch vụ hỗ trợ nội dung kịch bản cho livestream',
    link: '/services/content'
  },
  {
    icon: FaCamera,
    title: 'Studio',
    description: 'Dịch vụ hỗ trợ vị trí và thiết kế livestream theo yêu cầu',
    link: '/services/studio'
  }
];

const advantages = [
  {
    icon: FaNetworkWired,
    title: 'Mạng lưới rộng',
    description: 'Phủ sóng trên 63 tỉnh thành'
  },
  {
    icon: FaCheckCircle,
    title: 'Đúng dịch vụ',
    description: 'Cung cấp dịch vụ đúng với yêu cầu'
  },
  {
    icon: FaShieldAlt,
    title: 'An toàn & Bảo mật',
    description: 'Cam kết bảo vệ thông tin của các bên'
  },
  {
    icon: FaDollarSign,
    title: 'Giá cả cạnh tranh',
    description: 'Ưu tiên tiết kiệm chi phí'
  }
];

const partners = [
  { id: 1, logo: '/placeholder-150x150.png', name: 'Đối tác 1' },
  { id: 2, logo: '/placeholder-150x150.png', name: 'Đối tác 2' },
  { id: 3, logo: '/placeholder-150x150.png', name: 'Đối tác 3' },
  { id: 4, logo: '/placeholder-150x150.png', name: 'Đối tác 4' },
];

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box style={{ backgroundColor: 'var(--mantine-color-background-1)', paddingTop: 80, paddingBottom: 80 }}>
        <Container size="xl">
          <Grid gutter={50}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box pt={50}>
                <Text color="primary.6" fw={700} mb="xs">LOGO</Text>
                <Title order={1} size="3rem" mb="md">
                  LiveHub - Giải pháp livestream toàn diện cho thương hiệu của bạn
                </Title>
                <Text size="xl" mb="xl">
                  Kết nối khách hàng với các nhà cung cấp dịch vụ hỗ trợ thiết bị livestream hàng đầu.
                </Text>
                <Group>
                  <Button 
                    component={Link} 
                    to="/auth/register" 
                    size="lg"
                    color="secondary"
                  >
                    Đăng ký ngay
                  </Button>
                  <Button 
                    component={Link} 
                    to="/services" 
                    size="lg" 
                    variant="outline"
                    color="primary"
                  >
                    Xem dịch vụ
                  </Button>
                </Group>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image src="/placeholder-600x400.png" alt="LiveHub Platform" radius="md" />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box py={80}>
        <Container size="xl">
          <Title order={2} ta="center" mb="xs">Một số dịch vụ nổi bật</Title>
          <Text ta="center" mb="xl" mx="auto" maw={600}>
            Chúng tôi cung cấp các dịch vụ chất lượng cao, đáp ứng nhu cầu đa dạng của các thương hiệu khi livestream
          </Text>

          <Grid>
            {services.map((service, index) => (
              <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <ThemeIcon 
                    size={60} 
                    radius="md" 
                    mb="md"
                    color="primary"
                  >
                    <service.icon size="1.8rem" />
                  </ThemeIcon>
                  <Text fw={700} size="xl" mb="sm">{service.title}</Text>
                  <Text size="md" c="dimmed" mb="lg">{service.description}</Text>
                  <Button 
                    variant="light" 
                    component={Link}
                    to={service.link}
                    color="primary.3"
                  >
                    Xem chi tiết
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Advantages Section */}
      <Box py={80} style={{ backgroundColor: 'var(--mantine-color-background-1)' }}>
        <Container size="xl">
          <Title order={2} ta="center" mb="xs">Tại sao chọn chúng tôi?</Title>
          <Text ta="center" mb="xl" size="lg" fw={700} color="primary.6">
            ƯU ĐIỂM VƯỢT TRỘI
          </Text>
          <Text ta="center" mb="xl" mx="auto" maw={700}>
            Chúng tôi cam kết mang đến những dịch vụ chất lượng cao với nhiều ưu điểm vượt trội
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
            {advantages.map((advantage, index) => (
              <Card key={index} shadow="none" padding="lg" radius="md" style={{ backgroundColor: 'transparent' }}>
                <Center mb="md">
                  <ThemeIcon 
                    size={60} 
                    radius="xl" 
                    color="primary"
                  >
                    <advantage.icon size="1.8rem" />
                  </ThemeIcon>
                </Center>
                <Text ta="center" fw={700} size="lg" mb="sm">{advantage.title}</Text>
                <Text ta="center" c="dimmed">{advantage.description}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={80} style={{ backgroundColor: 'var(--mantine-color-primary-6)', color: 'white' }}>
        <Container size="xl">
          <Title order={2} ta="center" mb="md" color="white">
            Bắt đầu tối ưu hóa chi phí livestream của bạn
          </Title>
          <Text ta="center" mb="xl" mx="auto" maw={700} size="lg">
            Đăng ký ngay hôm nay để có thể trải nghiệm những tiện ích mà LiveHub mang lại
          </Text>

          <Group justify="center" gap="md">
            <Button 
              component={Link} 
              to="/auth/register?role=supplier" 
              size="lg"
              color="secondary"
            >
              Đăng ký cung cấp dịch vụ
            </Button>
            <Button 
              component={Link} 
              to="/auth/register?role=customer" 
              size="lg" 
              variant="outline"
              styles={{ root: { borderColor: 'white', color: 'white' } }}
            >
              Đăng ký tìm dịch vụ
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Partners Section */}
      <Box py={80}>
        <Container size="xl">
          <Title order={2} ta="center" mb="xs">Đối tác của chúng tôi</Title>
          <Text ta="center" mb="xl" mx="auto" maw={600}>
            Dịch vụ được tin dùng bởi nhiều doanh nghiệp lớn nhỏ
          </Text>

          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            {partners.map((partner) => (
              <Card key={partner.id} shadow="none" padding="lg" radius="md" style={{ backgroundColor: 'transparent' }}>
                <Center>
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={120} 
                    height={120} 
                    fit="contain"
                  />
                </Center>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* About Section */}
      <Box py={80} style={{ backgroundColor: 'var(--mantine-color-background-1)' }}>
        <Container size="xl">
          <Grid gutter={50}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Title order={2} mb="md">Giới thiệu về LiveHub</Title>
              <Text mb="lg">
                LiveHub là nền tảng kết nối trực tuyến hàng đầu trong lĩnh vực livestream tại thị trường Việt Nam. 
                Chúng tôi cung cấp giải pháp kết nối hiệu quả giữa khách hàng có nhu cầu và nhà cung cấp dịch vụ hỗ trợ livestream.
              </Text>

              <Title order={3} size="h4" mb="md">Sứ mệnh của chúng tôi</Title>
              <Text mb="lg">
                Xây dựng một nền tảng kết nối thông minh, hiệu quả và góp phần tối ưu thời gian và chi phí cho khách hàng có nhu cầu.
              </Text>

              <Title order={3} size="h4" mb="md">Giá trị cốt lõi</Title>
              <Grid>
                <Grid.Col span={4}>
                  <Box ta="center">
                    <ThemeIcon 
                      size={50} 
                      radius="md" 
                      mb="sm"
                      color="primary"
                    >
                      <FaCheckCircle size="1.5rem" />
                    </ThemeIcon>
                    <Text fw={600}>Trách nhiệm</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Box ta="center">
                    <ThemeIcon 
                      size={50} 
                      radius="md" 
                      mb="sm"
                      color="primary"
                    >
                      <FaShieldAlt size="1.5rem" />
                    </ThemeIcon>
                    <Text fw={600}>An toàn - Chất lượng</Text>
                  </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Box ta="center">
                    <ThemeIcon 
                      size={50} 
                      radius="md" 
                      mb="sm"
                      color="primary"
                    >
                      <FaBuilding size="1.5rem" />
                    </ThemeIcon>
                    <Text fw={600}>Đổi mới - Sáng tạo</Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image src="/placeholder-600x400.png" alt="About LiveHub" radius="md" />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage; 