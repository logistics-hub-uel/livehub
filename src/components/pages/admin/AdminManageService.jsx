import React, { useEffect, useState } from "react";
import {
  GetServices,
  UpdateService,
  DeleteService,
  GetServiceDetail,
  UpdateServiceRentalStatus,
} from "../../../services/ServiceService";
import GenericTable from "../../ui/GenericTable";
import {
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Group,
  Switch,
  MultiSelect,
  Text,
  Badge,
  Select,
  Table,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

const TABLE_HEADERS = [
  { key: "name", label: "Tên Dịch Vụ" },
  { key: "description", label: "Mô Tả" },
  {
    key: "price",
    label: "Giá (VND)",
    render: (value) => value?.toLocaleString(),
  },
  { key: "category", label: "Danh Mục" },
  {
    key: "is_support_preference",
    label: "Hỗ Trợ Tùy Chọn",
    render: (value) => (value ? "Có" : "Không"),
  },
];

const AdminManageService = () => {
  const [services, setServices] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [serviceDetail, setServiceDetail] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await GetServices();
      setServices(response.data.data);
    } catch (error) {
      notifications.show({
        title: "Lỗi",
        message: "Không thể tải danh sách dịch vụ",
        color: "red",
      });
    }
  };

  const handleUpdate = async (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    setSelectedService(service);
    setUpdateModalOpen(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      try {
        await DeleteService(serviceId);
        notifications.show({
          title: "Thành công",
          message: "Đã xóa dịch vụ",
          color: "green",
        });
        fetchServices();
      } catch (error) {
        notifications.show({
          title: "Lỗi",
          message: "Không thể xóa dịch vụ",
          color: "red",
        });
      }
    }
  };

  const handleView = async (obj) => {
    try {
      const response = await GetServiceDetail(obj.id);
      setServiceDetail(response.data.data);
      setDetailModalOpen(true);
    } catch (error) {
      notifications.show({
        title: "Lỗi",
        message: "Không thể tải chi tiết dịch vụ",
        color: "red",
      });
    }
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      await UpdateService(selectedService.id, selectedService);
      notifications.show({
        title: "Thành công",
        message: "Đã cập nhật dịch vụ",
        color: "green",
      });
      setUpdateModalOpen(false);
      fetchServices();
    } catch (error) {
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật dịch vụ",
        color: "red",
      });
    }
  };

  const getRentalStatusColor = (status) => {
    const colors = {
      pending: "yellow",
      accepted: "green",
      rejected: "red",
    };
    return colors[status] || "gray";
  };

  const handleUpdateRentalStatus = async (rentalId, newStatus) => {
    try {
      // TODO: Implement update rental status API call
      await UpdateServiceRentalStatus(rentalId, newStatus);
      notifications.show({
        title: "Thành công",
        message: "Đã cập nhật trạng thái thuê dịch vụ",
        color: "green",
      });
      // Refresh service details
      const response = await GetServiceDetail(serviceDetail.id);
      setServiceDetail(response.data.data);
    } catch (error) {
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái thuê dịch vụ",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Quản Lý Dịch Vụ</h1>
      <GenericTable
        headers={TABLE_HEADERS}
        data={services}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        onView={handleView}
      />

      <Modal
        opened={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        title="Cập Nhật Dịch Vụ"
        size="2xl"
      >
        <form onSubmit={handleSubmitUpdate}>
          <Stack>
            <TextInput
              label="Tên Dịch Vụ"
              value={selectedService?.name || ""}
              onChange={(e) =>
                setSelectedService({ ...selectedService, name: e.target.value })
              }
              required
            />
            <Textarea
              label="Mô Tả"
              value={selectedService?.description || ""}
              onChange={(e) =>
                setSelectedService({
                  ...selectedService,
                  description: e.target.value,
                })
              }
              required
            />
            <NumberInput
              label="Giá"
              value={selectedService?.price || 0}
              onChange={(value) =>
                setSelectedService({ ...selectedService, price: value })
              }
              required
            />
            <TextInput
              label="Danh Mục"
              value={selectedService?.category || ""}
              onChange={(e) =>
                setSelectedService({
                  ...selectedService,
                  category: e.target.value,
                })
              }
            />
            <Switch
              label="Hỗ Trợ Tùy Chọn"
              checked={selectedService?.is_support_preference || false}
              onChange={(e) =>
                setSelectedService({
                  ...selectedService,
                  is_support_preference: e.currentTarget.checked,
                })
              }
            />
            <Group justify="flex-end">
              <Button type="submit" color="blue">
                Cập Nhật
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="Chi Tiết Dịch Vụ"
        size="2xl"
      >
        {serviceDetail && (
          <Stack>
            <Group>
              <Text fw={500}>Tên Dịch Vụ:</Text>
              <Text>{serviceDetail.name}</Text>
            </Group>
            <Group>
              <Text fw={500}>Mô Tả:</Text>
              <Text>{serviceDetail.description}</Text>
            </Group>
            <Group>
              <Text fw={500}>Giá:</Text>
              <Text>{serviceDetail.price?.toLocaleString()} VND</Text>
            </Group>
            <Group>
              <Text fw={500}>Danh Mục:</Text>
              <Text>{serviceDetail.category || "Chưa phân loại"}</Text>
            </Group>
            <Group>
              <Text fw={500}>Hỗ Trợ Tùy Chọn:</Text>
              <Text>
                {serviceDetail.is_support_preference ? "Có" : "Không"}
              </Text>
            </Group>
            {serviceDetail.images_urls?.length > 0 && (
              <Stack>
                <Text fw={500}>Hình Ảnh:</Text>
                <Group>
                  {serviceDetail.images_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Service ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  ))}
                </Group>
              </Stack>
            )}
            {serviceDetail.preference_social_media?.length > 0 && (
              <Stack>
                <Text fw={500}>Mạng Xã Hội Được Hỗ Trợ:</Text>
                <Group>
                  {serviceDetail.preference_social_media.map(
                    (social, index) => (
                      <Text key={index}>{social}</Text>
                    )
                  )}
                </Group>
              </Stack>
            )}
            {serviceDetail.rentals?.length > 0 && (
              <Stack>
                <Text fw={500}>Danh Sách Thuê Dịch Vụ:</Text>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>ID người mua</Table.Th>
                      <Table.Th>Ngày Bắt Đầu</Table.Th>
                      <Table.Th>Ngày Kết Thúc</Table.Th>
                      <Table.Th>Mô Tả Yêu Cầu</Table.Th>
                      <Table.Th>Kỳ Vọng</Table.Th>
                      <Table.Th>Trạng Thái</Table.Th>
                      <Table.Th>Hành Động</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {serviceDetail.rentals.map((rental) => (
                      <Table.Tr key={rental.id}>
                        <Table.Td>{rental.buyer_id}</Table.Td>
                        <Table.Td>
                          {new Date(rental.from_date).toLocaleDateString(
                            "vi-VN"
                          )}
                        </Table.Td>
                        <Table.Td>
                          {new Date(rental.to_date).toLocaleDateString("vi-VN")}
                        </Table.Td>
                        <Table.Td>{rental.demand_description}</Table.Td>
                        <Table.Td>{rental.expectation}</Table.Td>
                        <Table.Td>
                          <Badge color={getRentalStatusColor(rental.status)}>
                            {rental.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Select
                            size="xs"
                            value={rental.status}
                            onChange={(value) =>
                              handleUpdateRentalStatus(rental.id, value)
                            }
                            data={[
                              { value: "pending", label: "Chờ Duyệt" },
                              { value: "accepted", label: "Đã Duyệt" },
                              { value: "rejected", label: "Từ Chối" },
                            ]}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Stack>
            )}
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default AdminManageService;
