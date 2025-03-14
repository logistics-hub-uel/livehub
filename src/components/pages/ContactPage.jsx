import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Paper,
  Stack,
  Box,
  Divider,
  Badge,
  SimpleGrid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';

const ContactPage = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Tên phải có ít nhất 2 ký tự' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ'),
      phone: (value) => (/^[0-9\s+-.()]{9,15}$/.test(value) ? null : 'Số điện thoại không hợp lệ'),
      message: (value) => (value.length < 10 ? 'Tin nhắn phải có ít nhất 10 ký tự' : null),
    },
  });

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    // Xử lý gửi form ở đây
    alert('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    form.reset();
  };

  return (
    <>
      <Container size="xl" py="xl">
        {/* Header */}
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.primary[6],
            color: 'white',
            padding: theme.spacing.xl * 2,
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.xl * 2,
          })}
        >
          <Title order={1} ta="center" mb="lg">Liên Hệ Với Chúng Tôi</Title>
          <Text ta="center" size="lg">
            Chúng tôi rất mong nhận được phản hồi từ bạn. Hãy liên hệ với chúng tôi để được hỗ trợ tốt nhất.
          </Text>
        </Box>

        <Grid gutter="xl">
          {/* Thông tin liên hệ */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Paper shadow="md" radius="md" p="xl" withBorder>
              <Title order={2} mb="md">Thông Tin Liên Hệ</Title>
              <Divider mb="lg" />
              
              <Stack spacing="lg">
                <Group noWrap align="flex-start">
                  <Box bg="primary.6" p={8} style={{ borderRadius: '50%', color: 'white' }}>
                    <FaMapMarkerAlt size={20} />
                  </Box>
                  <div>
                    <Text fw={700} mb={5}>Địa chỉ văn phòng</Text>
                    <Text>123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</Text>
                  </div>
                </Group>

                <Group noWrap align="flex-start">
                  <Box bg="primary.6" p={8} style={{ borderRadius: '50%', color: 'white' }}>
                    <FaPhone size={20} />
                  </Box>
                  <div>
                    <Text fw={700} mb={5}>Điện thoại</Text>
                    <Text>Hotline: 1900 1234</Text>
                    <Text>Kinh doanh: 028 1234 5678</Text>
                  </div>
                </Group>

                <Group noWrap align="flex-start">
                  <Box bg="primary.6" p={8} style={{ borderRadius: '50%', color: 'white' }}>
                    <FaEnvelope size={20} />
                  </Box>
                  <div>
                    <Text fw={700} mb={5}>Email</Text>
                    <Text>contact@livehub.vn</Text>
                    <Text>support@livehub.vn</Text>
                  </div>
                </Group>

                <Group noWrap align="flex-start">
                  <Box bg="primary.6" p={8} style={{ borderRadius: '50%', color: 'white' }}>
                    <FaClock size={20} />
                  </Box>
                  <div>
                    <Text fw={700} mb={5}>Giờ làm việc</Text>
                    <Text>Thứ 2 - Thứ 6: 8:00 - 17:30</Text>
                    <Text>Thứ 7 - Chủ nhật: 8:00 - 12:00</Text>
                  </div>
                </Group>
              </Stack>

              <Divider my="lg" />
              <Text fw={700} mb="md">Kết nối với chúng tôi</Text>
              <Group spacing="md">
                <Button variant="outline" radius="xl" color="blue" px="xs">
                  <FaFacebook size={20} />
                </Button>
                <Button variant="outline" radius="xl" color="blue" px="xs">
                  <FaTwitter size={20} />
                </Button>
                <Button variant="outline" radius="xl" color="grape" px="xs">
                  <FaInstagram size={20} />
                </Button>
                <Button variant="outline" radius="xl" color="red" px="xs">
                  <FaYoutube size={20} />
                </Button>
                <Button variant="outline" radius="xl" color="blue" px="xs">
                  <FaLinkedin size={20} />
                </Button>
              </Group>
            </Paper>
          </Grid.Col>

          {/* Form liên hệ */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper shadow="md" radius="md" p="xl" withBorder>
              <Title order={2} mb="md">Gửi Tin Nhắn Cho Chúng Tôi</Title>
              <Divider mb="lg" />
              
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
                  <TextInput
                    label="Họ và tên"
                    placeholder="Nhập họ và tên của bạn"
                    required
                    {...form.getInputProps('name')}
                  />
                  <TextInput
                    label="Email"
                    placeholder="example@email.com"
                    required
                    {...form.getInputProps('email')}
                  />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
                  <TextInput
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại của bạn"
                    required
                    {...form.getInputProps('phone')}
                  />
                  <TextInput
                    label="Tiêu đề"
                    placeholder="Tiêu đề tin nhắn"
                    {...form.getInputProps('subject')}
                  />
                </SimpleGrid>

                <Textarea
                  label="Nội dung tin nhắn"
                  placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
                  minRows={5}
                  required
                  mb="md"
                  {...form.getInputProps('message')}
                />

                <Group position="right">
                  <Button type="submit" color="primary" size="md">
                    Gửi tin nhắn
                  </Button>
                </Group>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Bản đồ */}
        <Box mt="xl">
          <Title order={3} mb="lg" ta="center">Vị Trí Của Chúng Tôi</Title>
          <Paper shadow="md" radius="md" withBorder p="md">
            <div style={{ width: '100%', height: '400px', position: 'relative' }}>
              <Text ta="center" fz="sm" color="dimmed" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                Bản đồ Google Maps sẽ được hiển thị tại đây
              </Text>
              <img 
                src="/placeholder-600x400.png" 
                alt="Map placeholder" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />
            </div>
          </Paper>
        </Box>

        {/* Câu hỏi thường gặp */}
        <Box mt="xl">
          <Title order={3} mb="lg" ta="center">Câu Hỏi Thường Gặp</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <Paper shadow="sm" radius="md" p="md" withBorder>
              <Badge color="primary" mb="sm">Câu hỏi</Badge>
              <Text fw={700} mb="xs">LiveHub cung cấp những dịch vụ gì?</Text>
              <Text size="sm">
                LiveHub cung cấp các dịch vụ kỹ thuật, studio và sản xuất nội dung cho các buổi livestream. 
                Chúng tôi hỗ trợ từ khâu lên ý tưởng đến thực hiện.
              </Text>
            </Paper>
            <Paper shadow="sm" radius="md" p="md" withBorder>
              <Badge color="primary" mb="sm">Câu hỏi</Badge>
              <Text fw={700} mb="xs">Làm thế nào để đăng ký sử dụng dịch vụ?</Text>
              <Text size="sm">
                Bạn có thể đăng ký tài khoản trên trang web của chúng tôi và gửi yêu cầu dịch vụ. 
                Đội ngũ của chúng tôi sẽ liên hệ để tư vấn chi tiết.
              </Text>
            </Paper>
            <Paper shadow="sm" radius="md" p="md" withBorder>
              <Badge color="primary" mb="sm">Câu hỏi</Badge>
              <Text fw={700} mb="xs">Chi phí dịch vụ như thế nào?</Text>
              <Text size="sm">
                Chi phí dịch vụ sẽ tùy thuộc vào quy mô và yêu cầu cụ thể của buổi livestream. 
                Liên hệ với chúng tôi để được báo giá chi tiết nhất.
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
};

export default ContactPage; 