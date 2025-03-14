import React from 'react';
import {
  Container,
  Text,
  Title,
  Grid,
  Image,
  Timeline,
  Paper,
  Group,
  Box,
  ThemeIcon,
  List,
  Divider,
  Badge,
  SimpleGrid,
  Card,
  Avatar,
  Button,
} from '@mantine/core';
import {
  FaCheck,
  FaBullseye,
  FaUsers,
  FaCertificate,
  FaLightbulb,
  FaHandshake,
  FaChartLine,
  FaSmile,
} from 'react-icons/fa';

const AboutPage = () => {
  const statistics = [
    { value: '200+', label: 'Khách hàng hài lòng' },
    { value: '500+', label: 'Sự kiện đã tổ chức' },
    { value: '30+', label: 'Chuyên gia tư vấn' },
    { value: '5', label: 'Năm kinh nghiệm' },
  ];

  const teamMembers = [
    {
      name: 'Nguyễn Văn A',
      position: 'Giám đốc điều hành',
      avatar: '/placeholder-150x150.png',
      bio: 'Hơn 10 năm kinh nghiệm trong lĩnh vực truyền thông và livestream',
    },
    {
      name: 'Trần Thị B',
      position: 'Giám đốc công nghệ',
      avatar: '/placeholder-150x150.png',
      bio: 'Chuyên gia về giải pháp kỹ thuật cho các sự kiện trực tuyến quy mô lớn',
    },
    {
      name: 'Lê Văn C',
      position: 'Giám đốc sáng tạo',
      avatar: '/placeholder-150x150.png',
      bio: 'Nhiều năm kinh nghiệm sản xuất nội dung cho các thương hiệu lớn',
    },
    {
      name: 'Phạm Thị D',
      position: 'Giám đốc kinh doanh',
      avatar: '/placeholder-150x150.png',
      bio: 'Chuyên gia phát triển kinh doanh và xây dựng mối quan hệ đối tác',
    },
  ];

  const values = [
    {
      title: 'Chất lượng',
      description: 'Cam kết mang đến dịch vụ chất lượng cao nhất cho khách hàng',
      icon: FaCertificate,
      color: 'green',
    },
    {
      title: 'Sáng tạo',
      description: 'Không ngừng đổi mới và tìm kiếm giải pháp sáng tạo',
      icon: FaLightbulb,
      color: 'yellow',
    },
    {
      title: 'Hợp tác',
      description: 'Xây dựng mối quan hệ đối tác bền vững và cùng có lợi',
      icon: FaHandshake,
      color: 'blue',
    },
    {
      title: 'Phát triển',
      description: 'Luôn hướng đến sự phát triển bền vững và lâu dài',
      icon: FaChartLine,
      color: 'grape',
    },
    {
      title: 'Khách hàng',
      description: 'Đặt khách hàng làm trung tâm của mọi quyết định',
      icon: FaSmile,
      color: 'orange',
    },
  ];

  return (
    <>
      <Container size="xl" py="xl">
        {/* Hero Section */}
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.primary[6],
            color: 'white',
            padding: theme.spacing.xl * 2,
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.xl * 2,
          })}
        >
          <Grid>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title order={1} mb="md">Giới thiệu về LiveHub</Title>
              <Text size="lg" mb="lg">
                LiveHub là nền tảng kết nối trực tuyến hàng đầu trong lĩnh vực livestream tại thị trường Việt Nam. 
                Chúng tôi cung cấp giải pháp kết nối hiệu quả giữa khách hàng có nhu cầu và nhà cung cấp dịch vụ hỗ trợ livestream.
              </Text>
              <Button variant="white" color="primary">
                Tìm hiểu thêm về dịch vụ
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src="/placeholder-600x400.png"
                alt="About LiveHub"
                radius="md"
                style={{ maxWidth: '100%' }}
              />
            </Grid.Col>
          </Grid>
        </Box>

        {/* Sứ mệnh và Tầm nhìn */}
        <Grid mb="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="sm" radius="md" p="xl" h="100%" withBorder>
              <Group mb="md">
                <ThemeIcon size={40} radius="md" color="primary">
                  <FaBullseye size={20} />
                </ThemeIcon>
                <Title order={2}>Sứ mệnh</Title>
              </Group>
              <Text>
                Xây dựng một nền tảng kết nối thông minh, hiệu quả và góp phần tối ưu thời gian và chi phí cho khách hàng có nhu cầu.
                Chúng tôi cam kết tạo ra một môi trường làm việc chuyên nghiệp, nơi các nhà cung cấp dịch vụ có thể phát triển và thành công.
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="sm" radius="md" p="xl" h="100%" withBorder>
              <Group mb="md">
                <ThemeIcon size={40} radius="md" color="primary">
                  <FaUsers size={20} />
                </ThemeIcon>
                <Title order={2}>Tầm nhìn</Title>
              </Group>
              <Text>
                Trở thành nền tảng kết nối hàng đầu trong lĩnh vực livestream tại Việt Nam và Đông Nam Á. 
                Chúng tôi hướng tới việc xây dựng một hệ sinh thái toàn diện cho ngành công nghiệp livestream, 
                đáp ứng mọi nhu cầu của thị trường và đối tác.
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Statistics */}
        <Paper shadow="sm" radius="md" p="xl" mb="xl" withBorder>
          <Title order={2} ta="center" mb="xl">Những con số ấn tượng</Title>
          <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
            {statistics.map((stat, index) => (
              <Box key={index} ta="center">
                <Text size="xl" fw={700} color="primary">
                  {stat.value}
                </Text>
                <Text size="sm" color="dimmed">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Paper>

        {/* Giá trị cốt lõi */}
        <Box mb="xl">
          <Title order={2} ta="center" mb="xl">Giá trị cốt lõi</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {values.map((value, index) => (
              <Paper key={index} shadow="sm" radius="md" p="md" withBorder>
                <Group mb="sm">
                  <ThemeIcon size={40} radius="md" color={value.color}>
                    <value.icon size={20} />
                  </ThemeIcon>
                  <Text fw={700} size="lg">{value.title}</Text>
                </Group>
                <Text size="sm">{value.description}</Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>

        {/* Đội ngũ lãnh đạo */}
        <Box mb="xl">
          <Title order={2} ta="center" mb="xl">Đội ngũ lãnh đạo</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {teamMembers.map((member, index) => (
              <Card key={index} shadow="sm" radius="md" padding="lg" withBorder>
                <Card.Section style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
                  <Avatar src={member.avatar} size={120} radius={120} />
                </Card.Section>
                <Text ta="center" fw={700} size="lg" mt="md">{member.name}</Text>
                <Text ta="center" size="sm" color="dimmed" mb="md">{member.position}</Text>
                <Divider my="sm" />
                <Text size="sm" ta="center">{member.bio}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Lịch sử phát triển */}
        <Title order={2} ta="center" mb="xl">Lịch sử phát triển</Title>
        <Grid mb="xl">
          <Grid.Col span={{ base: 12, md: 6 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              src="/placeholder-600x400.png"
              alt="Company History"
              radius="md"
              style={{ maxWidth: '100%' }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Timeline active={4} bulletSize={24} lineWidth={2}>
              <Timeline.Item title="2019" bullet={<Badge color="primary">2019</Badge>}>
                <Text color="dimmed" size="sm">Thành lập công ty với đội ngũ nhân sự ban đầu 5 người</Text>
              </Timeline.Item>

              <Timeline.Item title="2020" bullet={<Badge color="primary">2020</Badge>}>
                <Text color="dimmed" size="sm">Ra mắt nền tảng LiveHub phiên bản đầu tiên, kết nối 50 đối tác</Text>
              </Timeline.Item>

              <Timeline.Item title="2021" bullet={<Badge color="primary">2021</Badge>}>
                <Text color="dimmed" size="sm">Mở rộng đội ngũ lên 20 nhân sự, phát triển thêm các dịch vụ mới</Text>
              </Timeline.Item>

              <Timeline.Item title="2022" bullet={<Badge color="primary">2022</Badge>}>
                <Text color="dimmed" size="sm">Gọi vốn thành công vòng Series A, mở rộng thị trường ra toàn quốc</Text>
              </Timeline.Item>

              <Timeline.Item title="2023" bullet={<Badge color="primary">2023</Badge>}>
                <Text color="dimmed" size="sm">Trở thành nền tảng kết nối hàng đầu với hơn 200 đối tác và 500 dự án thành công</Text>
              </Timeline.Item>
            </Timeline>
          </Grid.Col>
        </Grid>

        {/* Lợi thế cạnh tranh */}
        <Paper shadow="sm" radius="md" p="xl" mb="xl" withBorder>
          <Title order={2} ta="center" mb="xl">Lợi thế cạnh tranh</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <List
                spacing="md"
                size="lg"
                center
                icon={
                  <ThemeIcon color="primary" size={24} radius="xl">
                    <FaCheck size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>Đội ngũ chuyên gia giàu kinh nghiệm</List.Item>
                <List.Item>Công nghệ hiện đại, dễ dàng sử dụng</List.Item>
                <List.Item>Mạng lưới đối tác rộng khắp</List.Item>
                <List.Item>Giải pháp tùy chỉnh theo nhu cầu khách hàng</List.Item>
              </List>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <List
                spacing="md"
                size="lg"
                center
                icon={
                  <ThemeIcon color="primary" size={24} radius="xl">
                    <FaCheck size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>Hỗ trợ 24/7, phản hồi nhanh chóng</List.Item>
                <List.Item>Bảo mật thông tin tuyệt đối</List.Item>
                <List.Item>Quy trình làm việc chuyên nghiệp</List.Item>
                <List.Item>Cam kết chất lượng dịch vụ cao nhất</List.Item>
              </List>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* CTA */}
        <Paper 
          shadow="sm" 
          radius="md" 
          p="xl" 
          withBorder 
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
            textAlign: 'center',
          })}
        >
          <Title order={2} mb="md">Bạn muốn biết thêm về LiveHub?</Title>
          <Text size="lg" mb="xl">
            Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn và hỗ trợ tốt nhất
          </Text>
          <Group position="center">
            <Button size="lg" color="primary">
              Liên hệ ngay
            </Button>
            <Button size="lg" variant="outline" color="primary">
              Xem dịch vụ
            </Button>
          </Group>
        </Paper>
      </Container>
    </>
  );
};

export default AboutPage; 