import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  Grid,
  Badge,
  ActionIcon,
  Tabs,
  Modal,
  Textarea,
  Select,
  Checkbox,
  MultiSelect,
  Paper,
  Loader,
  Divider,
  Box,
  Alert,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaInfoCircle,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import useDemandStore from "../../../store/DemandStore";
import AuthStore from "../../../store/AuthStore";

const DEMAND_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  COMPLETED: "completed",
};

const DEMAND_STATUS_COLOR = {
  [DEMAND_STATUS.PENDING]: "yellow",
  [DEMAND_STATUS.ACCEPTED]: "blue",
  [DEMAND_STATUS.REJECTED]: "red",
  [DEMAND_STATUS.COMPLETED]: "green",
};

const DEMAND_STATUS_LABEL = {
  [DEMAND_STATUS.PENDING]: "Đang chờ",
  [DEMAND_STATUS.ACCEPTED]: "Đã chấp nhận",
  [DEMAND_STATUS.REJECTED]: "Từ chối",
  [DEMAND_STATUS.COMPLETED]: "Hoàn thành",
};

const SERVICE_TYPES = [
  { value: "technical", label: "Đội ngũ kỹ thuật" },
  { value: "content", label: "Đội ngũ sản xuất nội dung" },
  { value: "studio", label: "Studio" },
];

const SOCIAL_MEDIA_OPTIONS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter" },
];

const UserDemand = () => {
  const { credentials } = AuthStore();
  const {
    demands,
    loading,
    fetchDemands,
    createDemand: storCreateDemand,
    updateDemand: storeUpdateDemand,
    deleteDemand: storeDeleteDemand,
    setSelectedDemand,
    selectedDemand,
    error,
  } = useDemandStore();

  useEffect(() => {
    (async () => {
      await fetchDemands({
        account_id: credentials?.user_id,
      });
    })();
  }, []);

  const [
    createModalOpened,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState("all");

  const createForm = useForm({
    initialValues: {
      from_date: new Date(),
      to_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      demand_description: "",
      previous_experience: "",
      expectation: "",
      preference_social_media: [],
      is_support_preference: false,
      type_demand_service: "technical",
      account_id: credentials?.user?.id || "",
    },
    validate: {
      demand_description: (value) =>
        value.trim().length < 10
          ? "Mô tả yêu cầu phải có ít nhất 10 ký tự"
          : null,
      expectation: (value) =>
        value.trim().length < 10
          ? "Mong muốn của bạn phải có ít nhất 10 ký tự"
          : null,
      to_date: (value, values) =>
        value < values.from_date ? "Ngày kết thúc phải sau ngày bắt đầu" : null,
    },
  });

  const editForm = useForm({
    initialValues: {
      from_date: new Date(),
      to_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      demand_description: "",
      previous_experience: "",
      expectation: "",
      preference_social_media: [],
      is_support_preference: false,
      type_demand_service: "technical",
    },
    validate: {
      demand_description: (value) =>
        value.trim().length < 10
          ? "Mô tả yêu cầu phải có ít nhất 10 ký tự"
          : null,
      expectation: (value) =>
        value.trim().length < 10
          ? "Mong muốn của bạn phải có ít nhất 10 ký tự"
          : null,
      to_date: (value, values) =>
        value < values.from_date ? "Ngày kết thúc phải sau ngày bắt đầu" : null,
    },
  });

  useEffect(() => {
    if (credentials?.user?.id) {
      fetchDemands({ account_id: credentials.user.id }).catch((error) => {
        console.error("Lỗi khi tải danh sách yêu cầu:", error);
        if (error.response?.status === 403) {
          notifications.show({
            title: "Lỗi xác thực",
            message:
              "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.",
            color: "red",
          });
        }
      });
    }
  }, [credentials?.user?.id]);

  const filterDemandsByTab = () => {
    if (activeTab === "all") return demands;

    return demands.filter((demand) => demand.demand_status === activeTab);
  };

  const handleCreateDemand = async (values) => {
    try {
      await storCreateDemand(values);
      closeCreateModal();
      createForm.reset();
      notifications.show({
        title: "Thành công",
        message: "Đã tạo yêu cầu mới",
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi tạo yêu cầu:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể tạo yêu cầu. Vui lòng thử lại sau.",
        color: "red",
      });
    }
  };

  const handleUpdateDemand = async (values) => {
    try {
      await storeUpdateDemand(selectedDemand.id, values);
      closeEditModal();
      notifications.show({
        title: "Thành công",
        message: "Đã cập nhật yêu cầu",
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu cầu:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật yêu cầu. Vui lòng thử lại sau.",
        color: "red",
      });
    }
  };

  const handleDeleteDemand = async () => {
    try {
      await storeDeleteDemand(selectedDemand.id);
      closeDeleteModal();
      notifications.show({
        title: "Thành công",
        message: "Đã xóa yêu cầu",
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi xóa yêu cầu:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể xóa yêu cầu. Vui lòng thử lại sau.",
        color: "red",
      });
    }
  };

  const handleViewDemand = (demand) => {
    setSelectedDemand(demand);
    openViewModal();
  };

  const handleEditDemand = (demand) => {
    setSelectedDemand(demand);
    const formattedDemand = {
      ...demand,
      from_date: new Date(demand.from_date),
      to_date: new Date(demand.to_date),
    };
    editForm.setValues(formattedDemand);
    openEditModal();
  };

  const handleDeleteModal = (demand) => {
    setSelectedDemand(demand);
    openDeleteModal();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const getServiceTypeLabel = (type) => {
    const serviceType = SERVICE_TYPES.find((t) => t.value === type);
    return serviceType ? serviceType.label : type;
  };

  return (
    <Container size="xl" py="xl">
      <Group position="apart" mb="lg">
        <Title order={2}>Yêu cầu dịch vụ livestream</Title>
        <Button leftSection={<FaPlus size={16} />} onClick={openCreateModal}>
          Tạo yêu cầu mới
        </Button>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
        <Tabs.List>
          <Tabs.Tab value="all">Tất cả</Tabs.Tab>
          <Tabs.Tab value={DEMAND_STATUS.PENDING}>Đang chờ</Tabs.Tab>
          <Tabs.Tab value={DEMAND_STATUS.ACCEPTED}>Đã chấp nhận</Tabs.Tab>
          <Tabs.Tab value={DEMAND_STATUS.REJECTED}>Từ chối</Tabs.Tab>
          <Tabs.Tab value={DEMAND_STATUS.COMPLETED}>Hoàn thành</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {loading ? (
        <Box py="xl" style={{ textAlign: "center" }}>
          <Loader size="md" />
        </Box>
      ) : demands.length === 0 ? (
        <Paper p="xl" withBorder>
          <Text align="center" color="dimmed" mb="md">
            Bạn chưa có yêu cầu nào
          </Text>
          <Group position="center">
            <Button onClick={openCreateModal}>Tạo yêu cầu đầu tiên</Button>
          </Group>
        </Paper>
      ) : (
        <Grid>
          {filterDemandsByTab().map((demand) => (
            <Grid.Col key={demand.id} span={12} md={6} lg={4}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mb="xs">
                  <Text weight={500}>
                    {getServiceTypeLabel(demand.type_demand_service)}
                  </Text>
                  <Badge color={DEMAND_STATUS_COLOR[demand.demand_status]}>
                    {DEMAND_STATUS_LABEL[demand.demand_status]}
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed" lineClamp={3} mb="md">
                  {demand.demand_description}
                </Text>

                <Group spacing="xs" mb="md">
                  <FaCalendarAlt size={14} />
                  <Text size="sm">
                    {formatDate(demand.from_date)} -{" "}
                    {formatDate(demand.to_date)}
                  </Text>
                </Group>

                <Group position="right" spacing="xs">
                  <ActionIcon
                    color="blue"
                    onClick={() => handleViewDemand(demand)}
                    variant="light"
                    size="lg"
                  >
                    <FaEye size={16} />
                  </ActionIcon>
                  {demand.demand_status === DEMAND_STATUS.PENDING && (
                    <>
                      <ActionIcon
                        color="green"
                        onClick={() => handleEditDemand(demand)}
                        variant="light"
                        size="lg"
                      >
                        <FaEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDeleteModal(demand)}
                        variant="light"
                        size="lg"
                      >
                        <FaTrash size={16} />
                      </ActionIcon>
                    </>
                  )}
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Modal tạo yêu cầu mới */}
      <Modal
        opened={createModalOpened}
        onClose={closeCreateModal}
        title="Tạo yêu cầu mới"
        size="lg"
      >
        <form onSubmit={createForm.onSubmit(handleCreateDemand)}>
          <Select
            label="Loại dịch vụ"
            placeholder="Chọn loại dịch vụ"
            data={SERVICE_TYPES}
            required
            mb="md"
            {...createForm.getInputProps("type_demand_service")}
          />

          <Grid>
            <Grid.Col span={6}>
              <DateInput
                label="Ngày bắt đầu"
                placeholder="Chọn ngày bắt đầu"
                required
                mb="md"
                {...createForm.getInputProps("from_date")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DateInput
                label="Ngày kết thúc"
                placeholder="Chọn ngày kết thúc"
                required
                mb="md"
                {...createForm.getInputProps("to_date")}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Mô tả yêu cầu"
            placeholder="Mô tả chi tiết về yêu cầu của bạn"
            required
            minRows={3}
            mb="md"
            {...createForm.getInputProps("demand_description")}
          />

          <Textarea
            label="Kinh nghiệm trước đây"
            placeholder="Kinh nghiệm trước đây của bạn với dịch vụ livestream (nếu có)"
            minRows={2}
            mb="md"
            {...createForm.getInputProps("previous_experience")}
          />

          <Textarea
            label="Mong muốn"
            placeholder="Kết quả bạn mong đợi từ dịch vụ này"
            required
            minRows={3}
            mb="md"
            {...createForm.getInputProps("expectation")}
          />

          <MultiSelect
            label="Nền tảng mạng xã hội ưa thích"
            placeholder="Chọn các nền tảng mạng xã hội bạn muốn sử dụng"
            data={SOCIAL_MEDIA_OPTIONS}
            mb="md"
            {...createForm.getInputProps("preference_social_media")}
          />

          <Checkbox
            label="Tôi cần hỗ trợ thêm về các ưu tiên kỹ thuật"
            mb="xl"
            {...createForm.getInputProps("is_support_preference", {
              type: "checkbox",
            })}
          />

          <Group position="right">
            <Button variant="outline" onClick={closeCreateModal}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              Tạo yêu cầu
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Modal chỉnh sửa yêu cầu */}
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title="Chỉnh sửa yêu cầu"
        size="lg"
      >
        {selectedDemand && (
          <form onSubmit={editForm.onSubmit(handleUpdateDemand)}>
            <Select
              label="Loại dịch vụ"
              placeholder="Chọn loại dịch vụ"
              data={SERVICE_TYPES}
              required
              mb="md"
              {...editForm.getInputProps("type_demand_service")}
            />

            <Grid>
              <Grid.Col span={6}>
                <DateInput
                  label="Ngày bắt đầu"
                  placeholder="Chọn ngày bắt đầu"
                  required
                  mb="md"
                  {...editForm.getInputProps("from_date")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateInput
                  label="Ngày kết thúc"
                  placeholder="Chọn ngày kết thúc"
                  required
                  mb="md"
                  {...editForm.getInputProps("to_date")}
                />
              </Grid.Col>
            </Grid>

            <Textarea
              label="Mô tả yêu cầu"
              placeholder="Mô tả chi tiết về yêu cầu của bạn"
              required
              minRows={3}
              mb="md"
              {...editForm.getInputProps("demand_description")}
            />

            <Textarea
              label="Kinh nghiệm trước đây"
              placeholder="Kinh nghiệm trước đây của bạn với dịch vụ livestream (nếu có)"
              minRows={2}
              mb="md"
              {...editForm.getInputProps("previous_experience")}
            />

            <Textarea
              label="Mong muốn"
              placeholder="Kết quả bạn mong đợi từ dịch vụ này"
              required
              minRows={3}
              mb="md"
              {...editForm.getInputProps("expectation")}
            />

            <MultiSelect
              label="Nền tảng mạng xã hội ưa thích"
              placeholder="Chọn các nền tảng mạng xã hội bạn muốn sử dụng"
              data={SOCIAL_MEDIA_OPTIONS}
              mb="md"
              {...editForm.getInputProps("preference_social_media")}
            />

            <Checkbox
              label="Tôi cần hỗ trợ thêm về các ưu tiên kỹ thuật"
              mb="xl"
              {...editForm.getInputProps("is_support_preference", {
                type: "checkbox",
              })}
            />

            <Group position="right">
              <Button variant="outline" onClick={closeEditModal}>
                Hủy
              </Button>
              <Button type="submit" loading={loading}>
                Cập nhật
              </Button>
            </Group>
          </form>
        )}
      </Modal>

      {/* Modal xem chi tiết yêu cầu */}
      <Modal
        opened={viewModalOpened}
        onClose={closeViewModal}
        title="Chi tiết yêu cầu"
        size="lg"
      >
        {selectedDemand && (
          <>
            <Group position="apart" mb="md">
              <Text weight={700}>Trạng thái</Text>
              <Badge
                size="lg"
                color={DEMAND_STATUS_COLOR[selectedDemand.demand_status]}
              >
                {DEMAND_STATUS_LABEL[selectedDemand.demand_status]}
              </Badge>
            </Group>

            <Divider mb="md" />

            <Text weight={700} mb="xs">
              Loại dịch vụ
            </Text>
            <Text mb="md">
              {getServiceTypeLabel(selectedDemand.type_demand_service)}
            </Text>

            <Text weight={700} mb="xs">
              Thời gian yêu cầu
            </Text>
            <Text mb="md">
              {formatDate(selectedDemand.from_date)} đến{" "}
              {formatDate(selectedDemand.to_date)}
            </Text>

            <Text weight={700} mb="xs">
              Mô tả yêu cầu
            </Text>
            <Text mb="md">{selectedDemand.demand_description}</Text>

            <Text weight={700} mb="xs">
              Kinh nghiệm trước đây
            </Text>
            <Text mb="md">
              {selectedDemand.previous_experience || "Không có"}
            </Text>

            <Text weight={700} mb="xs">
              Mong muốn
            </Text>
            <Text mb="md">{selectedDemand.expectation}</Text>

            <Text weight={700} mb="xs">
              Nền tảng mạng xã hội ưa thích
            </Text>
            <Group mb="md">
              {selectedDemand.preference_social_media &&
              selectedDemand.preference_social_media.length > 0 ? (
                selectedDemand.preference_social_media.map((platform) => (
                  <Badge key={platform}>{platform}</Badge>
                ))
              ) : (
                <Text color="dimmed">Không có</Text>
              )}
            </Group>

            <Text weight={700} mb="xs">
              Hỗ trợ thêm kỹ thuật
            </Text>
            <Text mb="xl">
              {selectedDemand.is_support_preference ? "Có" : "Không"}
            </Text>

            {selectedDemand.demand_status === DEMAND_STATUS.REJECTED && (
              <Alert
                color="red"
                title="Yêu cầu đã bị từ chối"
                icon={<FaInfoCircle />}
                mb="md"
              >
                Vui lòng liên hệ chúng tôi để biết thêm chi tiết về lý do từ
                chối.
              </Alert>
            )}

            {selectedDemand.demand_status === DEMAND_STATUS.ACCEPTED && (
              <Alert
                color="blue"
                title="Yêu cầu đã được chấp nhận"
                icon={<FaInfoCircle />}
                mb="md"
              >
                Nhà cung cấp dịch vụ sẽ liên hệ với bạn sớm.
              </Alert>
            )}

            {selectedDemand.demand_status === DEMAND_STATUS.COMPLETED && (
              <Alert
                color="green"
                title="Yêu cầu đã hoàn thành"
                icon={<FaCheck />}
                mb="md"
              >
                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
              </Alert>
            )}
          </>
        )}
      </Modal>

      {/* Modal xóa yêu cầu */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Xác nhận xóa"
        size="sm"
      >
        <Text mb="xl">Bạn có chắc chắn muốn xóa yêu cầu này không?</Text>
        <Group position="right">
          <Button variant="outline" onClick={closeDeleteModal}>
            Hủy
          </Button>
          <Button color="red" onClick={handleDeleteDemand} loading={loading}>
            Xóa
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default UserDemand;
