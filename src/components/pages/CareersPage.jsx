import React from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Box, 
  Card, 
  Group, 
  Button, 
  TextInput, 
  FileInput, 
  Divider,
  SimpleGrid,
} from '@mantine/core';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaGraduationCap, 
  FaCode, 
  FaHeadset, 
  FaUpload 
} from 'react-icons/fa';

const jobListings = [
  {
    id: 1,
    title: 'Chuyên viên Kinh Doanh',
    location: 'Tp. HCM',
    type: 'Toàn thời gian',
    description: 'Tìm kiếm và phát triển khách hàng mới, duy trì mối quan hệ với khách hàng hiện tại.',
    requirements: [
      'Tốt nghiệp Đại học Chuyên ngành Kinh tế, Quản trị Kinh doanh',
      'Có kiến thức tốt và sử dụng thành thạo các nền tảng mạng xã hội như Tiktok, Facebook, Instagram, Thread…',
      'Kỹ năng giao tiếp và đàm phán tốt.'
    ],
    icon: FaHeadset
  },
  {
    id: 2,
    title: 'Kỹ sư lập trình Web LiveHub',
    location: 'Toàn quốc',
    type: 'Toàn thời gian',
    description: 'Phát triển và duy trì giao diện người dùng tại trang web chính LiveHub',
    requirements: [
      'Tốt nghiệp ngành Công nghệ thông tin, Kỹ thuật máy tính hoặc Khoa học máy tính.',
      'Có kinh nghiệm lập trình và quản lý web tối thiểu 1 năm.',
      'Vững kiến thức chuyên ngành và có khả năng xử lí tình huống tốt.'
    ],
    icon: FaCode
  },
  {
    id: 3,
    title: 'Chuyên viên Hỗ trợ Khách hàng',
    location: 'TP. HCM',
    type: 'Ca theo giờ',
    description: 'Hỗ trợ và giải đáp thắc mắc của khách hàng qua điện thoại hoặc email.',
    requirements: [
      'Tốt nghiệp cao đẳng trở lên',
      'Kỹ năng giao tiếp tốt',
      'Kỹ năng giải quyết vấn đề tốt.'
    ],
    icon: FaHeadset
  }
];

const CareersPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box py={80} style={{ backgroundColor: 'var(--mantine-color-primary-6)', color: 'white' }}>
        <Container size="xl">
          <Title order={1} ta="center" mb="md" color="white">Cơ hội nghề nghiệp tại LiveHub</Title>
          <Text ta="center" size="xl" maw={800} mx="auto">
            Chúng tôi luôn tìm kiếm những người tài năng để cùng xây dựng nền tảng Hỗ trợ Livestream hàng đầu Việt Nam. 
            Hãy tham gia cùng chúng tôi để phát triển sự nghiệp của bạn.
          </Text>
        </Container>
      </Box>

      {/* Job Listings */}
      <Box py={80}>
        <Container size="xl">
          <Title order={2} mb="xl">Vị trí đang tuyển dụng</Title>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {jobListings.map((job) => (
              <Card key={job.id} shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mb="md">
                  <Title order={3} size="h4">{job.title}</Title>
                  <job.icon size="1.5rem" color="var(--mantine-color-primary-6)" />
                </Group>

                <Group mb="xs">
                  <FaMapMarkerAlt size="0.9rem" />
                  <Text size="sm">{job.location}</Text>
                  <FaClock size="0.9rem" />
                  <Text size="sm">{job.type}</Text>
                </Group>

                <Text mb="md">{job.description}</Text>

                <Text fw={600} mb="xs">Yêu cầu:</Text>
                <Box mb="xl">
                  {job.requirements.map((requirement, index) => (
                    <Text key={index} size="sm" mb="xs">• {requirement}</Text>
                  ))}
                </Box>

                <Button 
                  fullWidth
                  color="primary"
                >
                  Ứng tuyển ngay
                </Button>
              </Card>
            ))}
          </SimpleGrid>

          <Box mt={60}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">Không tìm thấy vị trí nào phù hợp?</Title>
              <Text mb="xl">
                Gửi CV của bạn cho chúng tôi. Chúng tôi luôn chào đón những ứng cử viên tài năng và sẽ liên hệ khi có vị trí phù hợp.
              </Text>

              <form>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb="md">
                  <TextInput
                    label="Họ và tên"
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                  <TextInput
                    label="Email"
                    placeholder="example@gmail.com"
                    required
                    type="email"
                  />
                  <TextInput
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại của bạn"
                    required
                  />
                  <TextInput
                    label="Vị trí mong muốn"
                    placeholder="Nhập vị trí bạn mong muốn ứng tuyển"
                    required
                  />
                </SimpleGrid>

                <FileInput
                  label="Tải lên CV của bạn"
                  placeholder="Chọn file CV"
                  required
                  accept="application/pdf"
                  leftSection={<FaUpload size="1rem" />}
                  mb="xl"
                />

                <Button 
                  type="submit" 
                  fullWidth
                  color="secondary"
                >
                  Gửi CV của bạn
                </Button>
              </form>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Why Join Us */}
      <Box py={80} style={{ backgroundColor: 'var(--mantine-color-background-1)' }}>
        <Container size="xl">
          <Title order={2} ta="center" mb="xl">Tại sao nên gia nhập LiveHub?</Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <FaGraduationCap size="2rem" color="var(--mantine-color-primary-6)" />
              <Title order={3} size="h4" mt="md" mb="sm">Cơ hội học hỏi</Title>
              <Text>
                Làm việc với đội ngũ chuyên nghiệp và tham gia vào các dự án sáng tạo giúp bạn không ngừng phát triển kỹ năng.
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <FaCode size="2rem" color="var(--mantine-color-primary-6)" />
              <Title order={3} size="h4" mt="md" mb="sm">Môi trường năng động</Title>
              <Text>
                Văn hóa làm việc cởi mở, khuyến khích đổi mới và sáng tạo trong một ngành công nghiệp đang phát triển nhanh chóng.
              </Text>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <FaHeadset size="2rem" color="var(--mantine-color-primary-6)" />
              <Title order={3} size="h4" mt="md" mb="sm">Phát triển sự nghiệp</Title>
              <Text>
                Cơ hội thăng tiến rõ ràng cùng với các chương trình đào tạo và phát triển chuyên môn liên tục.
              </Text>
            </Card>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default CareersPage; 