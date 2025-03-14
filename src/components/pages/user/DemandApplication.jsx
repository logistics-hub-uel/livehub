import {
  createDemandApplication,
  getDemandApplications,
} from "../../../services/DemandApplicationService";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Progress,
  Tabs,
  Text,
  TextInput,
  Modal,
  Stack,
  Select,
  Textarea,
} from "@mantine/core";
import GenericTable from "../../ui/GenericTable";
import React, { useEffect } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { getDemands } from "../../../services/DemandService";
import dayjs from "dayjs";
import { FiLink, FiPackage, FiUpload } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import {
  formatViDate,
  getRemainingDays,
  isExpired,
} from "../../../utils/DateUtils";
import { useForm } from "@mantine/form";
import { createApplication } from "../../../services/ApplicationService";
import AuthStore from "../../../store/AuthStore";

const DemandApplication = () => {
  const {
    credentials: { user_id },
  } = AuthStore((state) => state);
  const [demands, setDemands] = React.useState([]);
  const [selectedDemand, setSelectedDemand] = React.useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [viewApplication, setViewApplication] = React.useState(null);
  const [viewOpened, { open: openView, close: closeView }] =
    useDisclosure(false);

  useEffect(() => {
    getDemands().then((data) => {
      setDemands(data.data);
    });
  }, []);

  const handleApply = (demand) => {
    setSelectedDemand(demand);
    open();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "yellow",
      accepted: "green",
      rejected: "red",
      completed: "blue",
    };
    return colors[status] || "gray";
  };

  const statusLabels = {
    pending: "Đang chờ",
    accepted: "Đã chấp nhận",
    rejected: "Từ chối",
    completed: "Hoàn thành",
  };

  const form = useForm({
    initialValues: {
      payment_method: "",
      promotion_event: "",
      note: "",
      supplier_id: "", // This might come from user context or props
    },
  });

  const handleSubmit = async (values) => {
    try {
      await createDemandApplication({
        demand_id: selectedDemand.id,
        ...values,
      });
      close();
      // Optional: Show success notification
    } catch (error) {
      // Handle error
    }
  };

  const [applications, setApplications] = React.useState([]);

  const fetchApplications = () => {
    getDemandApplications().then((data) => {
      setApplications(data.data);
    });
  };

  useEffect(() => {
    fetchApplications();
  });

  const applicationStatusLabels = {
    pending: "Đang chờ xét duyệt",
    accepted: "Đã chấp nhận",
    rejected: "Đã từ chối",
    completed: "Hoàn thành",
  };

  const paymentMethodLabels = {
    bank: "Chuyển khoản ngân hàng",
    cash: "Tiền mặt",
    ewallet: "Ví điện tử",
  };

  const handleViewApplication = (application) => {
    setViewApplication(application);
    openView();
  };

  const hasApplied = (demandId) => {
    return applications.some(
      (app) => app.demand_id === demandId && app.supplier_id === user_id
    );
  };

  return (
    <>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" leftSection={<FiLink size={12} />}>
            Các yêu cầu hiện tại
          </Tabs.Tab>
          <Tabs.Tab
            onClick={() => {
              fetchApplications();
            }}
            value="messages"
            leftSection={<FiPackage size={12} />}
          >
            Yêu cầu đã ứng tuyển
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <div className="p-4">
            <TextInput
              name="search"
              label="Tìm kiếm"
              placeholder="Tìm theo tên dịch vụ"
              mb="md"
            />

            <div className="flex w-full gap-4 flex-wrap">
              {(demands || []).map((demand) => {
                const remainingDays = getRemainingDays(demand.to_date);
                const alreadyApplied = hasApplied(demand.id);

                return (
                  <Card
                    key={demand.id}
                    withBorder
                    padding="lg"
                    radius="md"
                    className="w-80"
                  >
                    <Group justify="space-between">
                      <Badge color={getStatusColor(demand.demand_status)}>
                        {statusLabels[demand.demand_status]}
                      </Badge>
                      <Badge color={remainingDays < 0 ? "red" : "blue"}>
                        {remainingDays < 0
                          ? "Đã hết hạn"
                          : `${remainingDays} ngày còn lại`}
                      </Badge>
                    </Group>

                    <Text fz="lg" fw={500} mt="md">
                      {demand.type_demand_service.toUpperCase()}
                    </Text>

                    <Text fz="sm" c="dimmed" mt={5}>
                      {demand.demand_description}
                    </Text>

                    <Stack mt="md" spacing="xs">
                      <Text size="sm">
                        Từ: {formatViDate(demand.from_date)}
                      </Text>
                      <Text size="sm">Đến: {formatViDate(demand.to_date)}</Text>
                    </Stack>

                    <Group justify="flex-end" mt="md">
                      <Button
                        variant="light"
                        onClick={() => handleApply(demand)}
                        disabled={isExpired(demand.to_date) || alreadyApplied}
                      >
                        {alreadyApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                      </Button>
                    </Group>
                  </Card>
                );
              })}
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <div className="p-4">
            <GenericTable
              headers={[
                {
                  key: "supplier",
                  label: "Thông tin người ứng tuyển",
                  render: (value) => (
                    <Group>
                      <div>
                        <Text fw={500}>{value.full_name}</Text>
                        <Text size="sm" c="dimmed">
                          {value.email}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {value.phone_number}
                        </Text>
                      </div>
                    </Group>
                  ),
                },
                {
                  key: "payment_method",
                  label: "Phương thức thanh toán",
                  render: (value) => paymentMethodLabels[value] || value,
                },
                {
                  key: "application_status",
                  label: "Trạng thái",
                  render: (value) => (
                    <Badge color={getStatusColor(value)}>
                      {applicationStatusLabels[value]}
                    </Badge>
                  ),
                },
                {
                  key: "created_at",
                  label: "Ngày ứng tuyển",
                  render: (value) => formatViDate(value),
                },
              ]}
              data={applications.filter((app) => app.supplier_id === user_id)}
              onView={handleViewApplication}
              hideDelete={true}
              hideEdit={true}
            />
          </div>
        </Tabs.Panel>
      </Tabs>

      <Modal
        opened={opened}
        onClose={close}
        title="Xác nhận ứng tuyển"
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Select
              label="Phương thức thanh toán"
              placeholder="Chọn phương thức thanh toán"
              data={[
                { value: "bank", label: "Chuyển khoản ngân hàng" },
                { value: "cash", label: "Tiền mặt" },
                { value: "ewallet", label: "Ví điện tử" },
              ]}
              required
              {...form.getInputProps("payment_method")}
            />

            <TextInput
              label="Mã khuyến mãi"
              placeholder="Nhập mã khuyến mãi (nếu có)"
              {...form.getInputProps("promotion_event")}
            />

            <Textarea
              label="Ghi chú"
              placeholder="Thêm ghi chú cho đơn ứng tuyển"
              {...form.getInputProps("note")}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={close} type="button">
                Hủy
              </Button>
              <Button type="submit">Xác nhận</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal
        opened={viewOpened}
        onClose={closeView}
        title="Chi tiết đơn ứng tuyển"
        size="lg"
      >
        {viewApplication && (
          <Stack>
            <Group>
              <Text fw={500}>Người ứng tuyển:</Text>
              <Text>{viewApplication.supplier.full_name}</Text>
            </Group>
            <Group>
              <Text fw={500}>Email:</Text>
              <Text>{viewApplication.supplier.email}</Text>
            </Group>
            <Group>
              <Text fw={500}>Số điện thoại:</Text>
              <Text>{viewApplication.supplier.phone_number}</Text>
            </Group>
            <Group>
              <Text fw={500}>Phương thức thanh toán:</Text>
              <Text>{paymentMethodLabels[viewApplication.payment_method]}</Text>
            </Group>
            {viewApplication.promotion_event && (
              <Group>
                <Text fw={500}>Mã khuyến mãi:</Text>
                <Text>{viewApplication.promotion_event}</Text>
              </Group>
            )}
            {viewApplication.note && (
              <Stack spacing={4}>
                <Text fw={500}>Ghi chú:</Text>
                <Text>{viewApplication.note}</Text>
              </Stack>
            )}
            <Group>
              <Text fw={500}>Trạng thái:</Text>
              <Badge color={getStatusColor(viewApplication.application_status)}>
                {applicationStatusLabels[viewApplication.application_status]}
              </Badge>
            </Group>
            <Group>
              <Text fw={500}>Ngày ứng tuyển:</Text>
              <Text>{formatViDate(viewApplication.created_at)}</Text>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
};

export default DemandApplication;
