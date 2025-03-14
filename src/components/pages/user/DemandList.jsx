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
  Paper,
  Loader,
  Divider,
  Box,
  Alert,
  Table,
  Menu,
  Stack,
  Pagination,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { 
  FaEllipsisV, 
  FaEye, 
  FaCheckCircle, 
  FaTimesCircle,
  FaInfoCircle, 
  FaCheck,
  FaCalendarAlt
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

const SERVICE_TYPES = {
  "technical": "Đội ngũ kỹ thuật",
  "content": "Đội ngũ sản xuất nội dung",
  "studio": "Studio",
};

const DemandList = () => {
  const { credentials } = AuthStore();
  const { 
    demands, 
    loading, 
    fetchDemands, 
    updateDemand: storeUpdateDemand,
    setSelectedDemand,
    selectedDemand,
    pagination,
    setFilter,
    error
  } = useDemandStore();
  
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
  const [acceptModalOpened, { open: openAcceptModal, close: closeAcceptModal }] = useDisclosure(false);
  const [rejectModalOpened, { open: openRejectModal, close: closeRejectModal }] = useDisclosure(false);
  const [completeModalOpened, { open: openCompleteModal, close: closeCompleteModal }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState("all");
  const [rejectReason, setRejectReason] = useState("");
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (activeTab === "all") {
      fetchDemands({ 
        page: activePage,
        type_demand_service: credentials?.user?.service_type,
      });
    } else {
      fetchDemands({ 
        demand_status: activeTab,
        page: activePage,
        type_demand_service: credentials?.user?.service_type,
      });
    }
  }, [activePage, activeTab, credentials?.user?.service_type]);

  const handleViewDemand = (demand) => {
    setSelectedDemand(demand);
    openViewModal();
  };

  const handleAcceptModal = (demand) => {
    setSelectedDemand(demand);
    openAcceptModal();
  };

  const handleRejectModal = (demand) => {
    setSelectedDemand(demand);
    setRejectReason("");
    openRejectModal();
  };

  const handleCompleteModal = (demand) => {
    setSelectedDemand(demand);
    openCompleteModal();
  };

  const handleAcceptDemand = async () => {
    try {
      await storeUpdateDemand(selectedDemand.id, { 
        demand_status: DEMAND_STATUS.ACCEPTED 
      });
      closeAcceptModal();
      notifications.show({
        title: "Thành công",
        message: "Bạn đã chấp nhận yêu cầu này",
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái. Vui lòng thử lại sau.",
        color: "red",
      });
    }
  };

  const handleRejectDemand = async () => {
    if (!rejectReason.trim()) {
      notifications.show({
        title: "Lỗi",
        message: "Vui lòng nhập lý do từ chối",
        color: "red",
      });
      return;
    }

    try {
      await storeUpdateDemand(selectedDemand.id, { 
        demand_status: DEMAND_STATUS.REJECTED,
        reject_reason: rejectReason
      });
      closeRejectModal();
      notifications.show({
        title: "Thành công",
        message: "Bạn đã từ chối yêu cầu này",
        color: "orange",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái. Vui lòng thử lại sau.",
        color: "red",
      });
    }
  };

  const handleCompleteDemand = async () => {
    try {
      await storeUpdateDemand(selectedDemand.id, { 
        demand_status: DEMAND_STATUS.COMPLETED 
      });
      closeCompleteModal();
      notifications.show({
        title: "Thành công",
        message: "Bạn đã đánh dấu yêu cầu này là hoàn thành",
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái. Vui lòng thử lại sau.",
        color: "red",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getServiceTypeLabel = (type) => {
    return SERVICE_TYPES[type] || type;
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <Container size="xl" py="xl">
      <Group position="apart" mb="lg">
        <Title order={2}>Quản lý yêu cầu dịch vụ</Title>
      </Group>

      <Tabs value={activeTab} onTabChange={setActiveTab} mb="lg">
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
            Không có yêu cầu nào
          </Text>
        </Paper>
      ) : (
        <>
          <Paper withBorder mb="lg">
            <Table striped>
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Loại dịch vụ</th>
                  <th>Thời gian yêu cầu</th>
                  <th>Trạng thái</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {demands.map((demand) => (
                  <tr key={demand.id}>
                    <td>
                      <Text weight={500}>{demand.user_name || "Người dùng"}</Text>
                      <Text size="xs" color="dimmed">{demand.user_email || "Email không có sẵn"}</Text>
                    </td>
                    <td>{getServiceTypeLabel(demand.type_demand_service)}</td>
                    <td>
                      <Group spacing={5}>
                        <FaCalendarAlt size={12} />
                        <Text size="sm">
                          {formatDate(demand.from_date)} - {formatDate(demand.to_date)}
                        </Text>
                      </Group>
                    </td>
                    <td>
                      <Badge color={DEMAND_STATUS_COLOR[demand.demand_status]}>
                        {DEMAND_STATUS_LABEL[demand.demand_status]}
                      </Badge>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon>
                            <FaEllipsisV size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item icon={<FaEye size={14} />} onClick={() => handleViewDemand(demand)}>
                            Xem chi tiết
                          </Menu.Item>
                          {demand.demand_status === DEMAND_STATUS.PENDING && (
                            <>
                              <Menu.Item 
                                color="green"
                                icon={<FaCheckCircle size={14} />} 
                                onClick={() => handleAcceptModal(demand)}
                              >
                                Chấp nhận
                              </Menu.Item>
                              <Menu.Item 
                                color="red"
                                icon={<FaTimesCircle size={14} />} 
                                onClick={() => handleRejectModal(demand)}
                              >
                                Từ chối
                              </Menu.Item>
                            </>
                          )}
                          {demand.demand_status === DEMAND_STATUS.ACCEPTED && (
                            <Menu.Item 
                              color="green"
                              icon={<FaCheck size={14} />} 
                              onClick={() => handleCompleteModal(demand)}
                            >
                              Đánh dấu hoàn thành
                            </Menu.Item>
                          )}
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Paper>

          {pagination.total_pages > 1 && (
            <Group position="center">
              <Pagination 
                total={pagination.total_pages} 
                value={activePage} 
                onChange={handlePageChange} 
              />
            </Group>
          )}
        </>
      )}

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
              <Badge size="lg" color={DEMAND_STATUS_COLOR[selectedDemand.demand_status]}>
                {DEMAND_STATUS_LABEL[selectedDemand.demand_status]}
              </Badge>
            </Group>

            <Divider mb="md" />

            <Text weight={700} mb="xs">Thông tin khách hàng</Text>
            <Text mb="xs">{selectedDemand.user_name || "Không có tên"}</Text>
            <Text mb="md">{selectedDemand.user_email || "Không có email"}</Text>

            <Text weight={700} mb="xs">Loại dịch vụ</Text>
            <Text mb="md">{getServiceTypeLabel(selectedDemand.type_demand_service)}</Text>

            <Text weight={700} mb="xs">Thời gian yêu cầu</Text>
            <Text mb="md">
              {formatDate(selectedDemand.from_date)} đến {formatDate(selectedDemand.to_date)}
            </Text>

            <Text weight={700} mb="xs">Mô tả yêu cầu</Text>
            <Text mb="md">{selectedDemand.demand_description}</Text>

            <Text weight={700} mb="xs">Kinh nghiệm trước đây</Text>
            <Text mb="md">{selectedDemand.previous_experience || "Không có"}</Text>

            <Text weight={700} mb="xs">Mong muốn</Text>
            <Text mb="md">{selectedDemand.expectation}</Text>

            <Text weight={700} mb="xs">Nền tảng mạng xã hội ưa thích</Text>
            <Group mb="md">
              {selectedDemand.preference_social_media && selectedDemand.preference_social_media.length > 0 ? (
                selectedDemand.preference_social_media.map((platform) => (
                  <Badge key={platform}>{platform}</Badge>
                ))
              ) : (
                <Text color="dimmed">Không có</Text>
              )}
            </Group>

            <Text weight={700} mb="xs">Hỗ trợ thêm kỹ thuật</Text>
            <Text mb="xl">
              {selectedDemand.is_support_preference ? "Có" : "Không"}
            </Text>

            {selectedDemand.demand_status === DEMAND_STATUS.REJECTED && selectedDemand.reject_reason && (
              <>
                <Text weight={700} mb="xs">Lý do từ chối</Text>
                <Alert color="red" mb="md">
                  {selectedDemand.reject_reason}
                </Alert>
              </>
            )}

            {selectedDemand.demand_status === DEMAND_STATUS.PENDING && (
              <Group position="right" mt="xl">
                <Button color="red" onClick={() => handleRejectModal(selectedDemand)}>
                  Từ chối
                </Button>
                <Button color="green" onClick={() => handleAcceptModal(selectedDemand)}>
                  Chấp nhận
                </Button>
              </Group>
            )}

            {selectedDemand.demand_status === DEMAND_STATUS.ACCEPTED && (
              <Group position="right" mt="xl">
                <Button color="green" onClick={() => handleCompleteModal(selectedDemand)}>
                  Đánh dấu hoàn thành
                </Button>
              </Group>
            )}
          </>
        )}
      </Modal>

      {/* Modal chấp nhận yêu cầu */}
      <Modal
        opened={acceptModalOpened}
        onClose={closeAcceptModal}
        title="Xác nhận chấp nhận yêu cầu"
        size="md"
      >
        <Text mb="xl">Bạn có chắc chắn muốn chấp nhận yêu cầu này không?</Text>
        <Alert color="blue" icon={<FaInfoCircle />} mb="xl">
          Sau khi chấp nhận, bạn sẽ cần liên hệ với khách hàng để thảo luận chi tiết về yêu cầu.
        </Alert>
        <Group position="right">
          <Button variant="outline" onClick={closeAcceptModal}>Hủy</Button>
          <Button color="green" onClick={handleAcceptDemand} loading={loading}>
            Chấp nhận
          </Button>
        </Group>
      </Modal>

      {/* Modal từ chối yêu cầu */}
      <Modal
        opened={rejectModalOpened}
        onClose={closeRejectModal}
        title="Xác nhận từ chối yêu cầu"
        size="md"
      >
        <Text mb="md">Vui lòng cung cấp lý do bạn từ chối yêu cầu này:</Text>
        <Textarea
          placeholder="Lý do từ chối..."
          minRows={3}
          mb="xl"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.currentTarget.value)}
          required
        />
        <Alert color="red" icon={<FaInfoCircle />} mb="xl">
          Hành động này không thể hoàn tác. Khách hàng sẽ được thông báo về việc từ chối yêu cầu của họ.
        </Alert>
        <Group position="right">
          <Button variant="outline" onClick={closeRejectModal}>Hủy</Button>
          <Button color="red" onClick={handleRejectDemand} loading={loading}>
            Từ chối
          </Button>
        </Group>
      </Modal>

      {/* Modal hoàn thành yêu cầu */}
      <Modal
        opened={completeModalOpened}
        onClose={closeCompleteModal}
        title="Đánh dấu yêu cầu hoàn thành"
        size="md"
      >
        <Text mb="xl">Bạn có chắc chắn rằng yêu cầu này đã được hoàn thành không?</Text>
        <Alert color="blue" icon={<FaInfoCircle />} mb="xl">
          Sau khi đánh dấu hoàn thành, yêu cầu sẽ được chuyển sang trạng thái kết thúc.
        </Alert>
        <Group position="right">
          <Button variant="outline" onClick={closeCompleteModal}>Hủy</Button>
          <Button color="green" onClick={handleCompleteDemand} loading={loading}>
            Xác nhận hoàn thành
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default DemandList; 