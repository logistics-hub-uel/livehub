import React, { useEffect, useState } from "react";
import {
  getDemandApplications,
  updateDemandApplication,
} from "../../../services/DemandApplicationService";
import {
  getDemands,
  updateDemand,
  deleteDemand,
} from "../../../services/DemandService";
import GenericTable from "../../ui/GenericTable";
import {
  Modal,
  Stack,
  Table,
  Group,
  Text,
  Badge,
  Select,
  Button,
  TextInput,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

const AdminManageDemand = () => {
  const [demands, setDemands] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [demandToDelete, setDemandToDelete] = useState(null);

  const fetchDemands = async () => {
    try {
      const response = await getDemands();
      setDemands(response.data);
    } catch (error) {
      console.error("Error fetching demands:", error);
    }
  };

  useEffect(() => {
    fetchDemands();
  }, []);

  const headers = [
    { key: "id", label: "ID" },
    { key: "demand_description", label: "Description" },
    { key: "type_demand_service", label: "Service Type" },
    { key: "demand_status", label: "Status" },
    {
      key: "from_date",
      label: "From Date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "to_date",
      label: "To Date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      key: "is_support_preference",
      label: "Support Preference",
      render: (value) => (value ? "Yes" : "No"),
    },
  ];

  const statusColors = {
    pending: "yellow",
    accepted: "green",
    rejected: "red",
    completed: "blue",
  };

  const applicationStatusLabels = {
    pending: "Đang chờ xét duyệt",
    accepted: "Đã chấp nhận",
    rejected: "Đã từ chối",
    completed: "Hoàn thành",
  };

  const handleView = async (demand) => {
    let response = await getDemandApplications({
      demand_id: demand.id,
    });
    let newSelectedDemand = { ...demand, applications: response.data };
    setSelectedDemand(newSelectedDemand);

    setDetailModalOpen(true);
  };

  const form = useForm({
    initialValues: {
      type_demand_service: "",
      demand_description: "",
      previous_experience: "",
      expectation: "",
      from_date: "",
      to_date: "",
      preference_social_media: [],
      is_support_preference: false,
    },
  });

  const handleEdit = (id) => {
    const demand = demands.find((d) => d.id === id);
    form.setValues({
      ...demand,
      from_date: new Date(demand.from_date),
      to_date: new Date(demand.to_date),
    });
    setSelectedDemand(demand);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const demand = demands.find((d) => d.id === id);
    setDemandToDelete(demand);
    setDeleteModalOpen(true);
  };

  const handleSubmitEdit = async (values) => {
    try {
      await updateDemand(selectedDemand.id, values);
      notifications.show({
        title: "Thành công",
        message: "Đã cập nhật yêu cầu",
        color: "green",
      });
      setEditModalOpen(false);
      fetchDemands();
    } catch (error) {
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật yêu cầu",
        color: "red",
      });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDemand(demandToDelete.id);
      notifications.show({
        title: "Thành công",
        message: "Đã xóa yêu cầu",
        color: "green",
      });
      setDeleteModalOpen(false);
      fetchDemands();
    } catch (error) {
      notifications.show({
        title: "Lỗi",
        message: "Không thể xóa yêu cầu",
        color: "red",
      });
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
    try {
      // TODO: Implement update application status API call
      await updateDemandApplication(applicationId, {
        application_status: newStatus,
      });
      selectedDemand.applications = selectedDemand.applications.map((app) =>
        app.id === applicationId
          ? { ...app, application_status: newStatus }
          : app
      );
      setSelectedDemand({ ...selectedDemand });
      notifications.show({
        title: "Thành công",
        message: "Đã cập nhật trạng thái đơn ứng tuyển",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Lỗi",
        message: "Không thể cập nhật trạng thái đơn ứng tuyển",
        color: "red",
      });
    }
  };

  return (
    <div>
      <h1>Manage Demands</h1>
      <GenericTable
        headers={headers}
        data={demands}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Chỉnh sửa yêu cầu"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmitEdit)}>
          <Stack>
            <TextInput
              label="Loại dịch vụ"
              {...form.getInputProps("type_demand_service")}
              required
            />
            <Textarea
              label="Mô tả"
              {...form.getInputProps("demand_description")}
              required
            />
            <Textarea
              label="Kinh nghiệm yêu cầu"
              {...form.getInputProps("previous_experience")}
            />
            <Textarea label="Kỳ vọng" {...form.getInputProps("expectation")} />
            <DatePickerInput
              label="Ngày bắt đầu"
              {...form.getInputProps("from_date")}
              required
            />
            <DatePickerInput
              label="Ngày kết thúc"
              {...form.getInputProps("to_date")}
              required
            />
            <MultiSelect
              label="Mạng xã hội"
              data={[
                { value: "facebook", label: "Facebook" },
                { value: "instagram", label: "Instagram" },
                { value: "tiktok", label: "TikTok" },
                { value: "youtube", label: "YouTube" },
              ]}
              {...form.getInputProps("preference_social_media")}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setEditModalOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">Lưu thay đổi</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Xác nhận xóa"
        size="sm"
      >
        <Stack>
          <Text>Bạn có chắc chắn muốn xóa yêu cầu này?</Text>
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setDeleteModalOpen(false)}>
              Hủy
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Xóa
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="Chi tiết yêu cầu"
        size="xl"
      >
        {selectedDemand && (
          <Stack>
            <Group>
              <Text fw={500}>Loại dịch vụ:</Text>
              <Text>{selectedDemand.type_demand_service}</Text>
            </Group>
            <Group>
              <Text fw={500}>Mô tả:</Text>
              <Text>{selectedDemand.demand_description}</Text>
            </Group>
            <Group>
              <Text fw={500}>Kinh nghiệm yêu cầu:</Text>
              <Text>{selectedDemand.previous_experience}</Text>
            </Group>
            <Group>
              <Text fw={500}>Kỳ vọng:</Text>
              <Text>{selectedDemand.expectation}</Text>
            </Group>

            <Text fw={500} mt="md">
              Danh sách ứng tuyển:
            </Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Người ứng tuyển</Table.Th>
                  <Table.Th>PT Thanh toán</Table.Th>
                  <Table.Th>Ghi chú</Table.Th>
                  <Table.Th>Trạng thái</Table.Th>
                  <Table.Th>Ngày ứng tuyển</Table.Th>
                  <Table.Th>Hành động</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedDemand.applications?.map((app) => (
                  <Table.Tr key={app.id}>
                    <Table.Td>
                      <div>
                        <Text size="sm" fw={500}>
                          {app.supplier.full_name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {app.supplier.email}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>{app.payment_method}</Table.Td>
                    <Table.Td>{app.note}</Table.Td>
                    <Table.Td>
                      <Badge color={statusColors[app.application_status]}>
                        {applicationStatusLabels[app.application_status]}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {new Date(app.created_at).toLocaleDateString("vi-VN")}
                    </Table.Td>
                    <Table.Td>
                      <Select
                        size="xs"
                        value={app.application_status}
                        onChange={(value) =>
                          handleUpdateApplicationStatus(app.id, value)
                        }
                        data={[
                          { value: "pending", label: "Đang chờ xét duyệt" },
                          { value: "accepted", label: "Chấp nhận" },
                          { value: "rejected", label: "Từ chối" },
                          { value: "completed", label: "Hoàn thành" },
                        ]}
                      />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default AdminManageDemand;
